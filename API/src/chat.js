const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

const Chat = require('./models/chat');
const User = require('./models/user');
const MessageBox = require('./models/messagebox');
const { getChatList } = require('./utils/chat/chat');

const createServer = (server) => {
    // Configure Socket io
    const io = socketio(server, {
        cors: {
            origin: '*',
        }
    });

    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET,
                (err, decoded) => {
                    if (err) return socket.errorMessages = 'Authentication error';

                    socket.token = socket.handshake.query.token;
                    socket.decoded = decoded;

                    next();
                });
        }
    }).on('connection', (socket) => {
        socket.emit('notification', 'Welcome');

        // User is listeing massageBox
        socket.on('chat-rooms', async (limit) => {
            try {
                // Find user has joined rooms and if true then join
                if (socket.rooms) {

                    const rooms = Object.keys(socket.rooms).filter(item => item != socket.id);

                    if (!rooms.includes(socket.decoded._id))
                        socket.join(socket.decoded._id);
                }

                // Fetch message box list
                const [chatList, length] = await Promise.all([
                    getChatList(socket.decoded._id, limit),
                    Chat.countDocuments({ requester: socket.decoded._id })
                ]);

                socket.emit('get-chat-list', { error: null, chatList, length });
            }
            catch (e) {
                console.log(e);
                socket.emit('get-chat-list', { error: e, chatList: null });
            }
        });

        // User joined specific room.
        socket.on('get-user-profile', async (recipient, callback) => {
            try {
                if (!recipient) {
                    return callback('Recipient not found', null);
                }

                const user = await User.findById(recipient, {
                    fullname: 1,
                    email: 1,
                    avatar: 1,
                    gender: 1,
                    country: 1,
                    available: 1,
                    updatedAt: 1
                });

                callback(null, user)
            }
            catch (e) {
                callback(e, null);
            }
        })

        socket.on('join', async ({ recipient } = {}, callback) => {

            try {
                if (!recipient) {
                    return callback('Recipient not found');
                }

                const chat = await Chat.findOne({ requester: socket.decoded._id, recipient });

                // if chat not exists, create new if user firstly chat.
                if (!chat) {
                    return socket.emit('loading', []);
                }

                const messageBox = await MessageBox.findById(chat.messageBox, {
                    messageBox: {
                        $slice: [0, 5]
                    }
                });

                //socket.join([messageBox.id, socket.decoded._id]);

                socket.join(messageBox.id);

                // Update User to online and read all messages
                User.findByIdAndUpdate(socket.decoded._id, {
                    available: true
                }, {}, () => {
                    io.to(messageBox.id).emit('update-user-profile');

                    io.to(socket.decoded._id).to(recipient).emit('reload-messages');
                });

                MessageBox.findByIdAndUpdate(chat.messageBox, {
                    $set: {
                        'messages.$[].status.$[].isAsRead': true
                    }
                }).exec();

                socket.emit('loading', {
                    messages: messageBox.messages,
                    isBlock: chat.isBlock
                });

                callback();
            }
            catch (e) {
                callback(e);
            }
        });

        socket.on('sendMessage', async ({ text, recipient }, callback) => {
            try {
                if (!recipient) {
                    return callback('Recipient not found');
                }

                // 1. Store 2 userId
                const requester = socket.decoded._id;

                const [chatRequester, chatRecipient] = await Promise.all([
                    Chat.findOne({ requester, recipient }),
                    Chat.findOne({ requester: recipient, recipient: requester })
                ]);

                // 2. if chat not exists, create new if user firstly chat.
                const message = {
                    text,
                    user: requester,
                    createdAt: Date.now(),
                    status: [{ user: requester, isAsRead: true }, { user: recipient }]
                };

                if (!chatRequester) {

                    // Create twice messagebox and store
                    const [messageBoxRequester, messageBoxRecipient] = await Promise.all([
                        MessageBox.create({
                            messages: [message]
                        }),
                        MessageBox.create({
                            messages: [message]
                        })
                    ])

                    await Promise.all([
                        Chat.create({
                            requester: requester, recipient,
                            messageBox: messageBoxRequester._id
                        }),
                        Chat.create({
                            requester: recipient, recipient: requester,
                            messageBox: messageBoxRecipient._id
                        })
                    ]);

                    socket.join([messageBoxRequester.id, messageBoxRecipient.id, requester]);

                    socket.emit('message', message);

                    io.to(messageBoxRequester.id)
                        .to(messageBoxRecipient.id)
                        .emit('message', message);
                }
                else {
                    // 3. Both users has chated before and then add message.
                    io.to(chatRequester.messageBox.toString())
                        .to(chatRecipient.messageBox.toString())
                        .emit('message', message);

                    // User blocked before, and then retores.
                    if (chatRequester.isBlock) {
                        chatRequester.isBlock = false;
                        await chatRequester.save();
                    }

                    const [messageBoxRequester, messageBoxRecipient] = await Promise.all([
                        MessageBox.findById(chatRequester.messageBox),
                        MessageBox.findById(chatRecipient.messageBox)
                    ]);

                    messageBoxRequester.messages.unshift(message);
                    messageBoxRecipient.messages.unshift(message);

                    await Promise.all([
                        messageBoxRequester.updateLastTime(),
                        messageBoxRecipient.updateLastTime(),
                    ])
                }

                io.to(socket.decoded._id).to(recipient).emit('reload-messages');

                callback();
            }
            catch (e) {
                callback(e);
            }
        });

        socket.on('block', async ({ recipient }, callback) => {
            try {
                if (!recipient) {
                    return callback('Recipient not found');
                }

                const chat = await Chat.findOne({ requester: socket.decoded._id, recipient });

                chat.isBlock = true;

                await chat.save();

                io.to(socket.decoded._id).emit('reload-messages');

                callback();
            }
            catch (e) {
                callback(e);
            }
        });

        socket.on('remove-messages', async ({ recipient }, callback) => {
            try {
                if (!recipient) {
                    return callback('Recipient not found');
                }

                const chat = await Chat.findOne({ requester: socket.decoded._id, recipient })
                const messageBox = await MessageBox.findById(chat.messageBox);

                messageBox.messages = [];

                await messageBox.save();

                io.to(socket.decoded._id).emit('reload-messages');

                callback();
            }
            catch (e) {
                callback(e);
            }
        });

        socket.on('disconnect', () => {
            io.emit('notification', 'User has left room');

            // Update User to offline
            User.findByIdAndUpdate(socket.decoded._id, {
                available: false
            }).exec((error) => {
                if (error) {
                    return console.log(error);
                }

                io.emit('reload-messages');
            });
        });
    });
}

module.exports = createServer;
