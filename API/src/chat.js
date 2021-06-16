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
        socket.on('chat-rooms', async () => {
            try {
                // Fetch message box list
                const chatList = await getChatList(socket.decoded._id);

                socket.emit('get-chat-list', { error: null, chatList });
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

                socket.join([messageBox.id, socket.decoded._id]);

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

                socket.emit('loading', messageBox.messages);

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

                const chat = await Chat.findOne({ requester: socket.decoded._id, recipient });

                // if chat not exists, create new if user firstly chat.
                const message = {
                    text,
                    user: socket.decoded._id,
                    createdAt: Date.now(),
                    status: [{ user: socket.decoded._id, isAsRead: true }, { user: recipient }]
                };

                if (!chat) {

                    const messageBox = await MessageBox.create({
                        messages: [message]
                    });

                    await Promise.all([
                        Chat.create({
                            requester: socket.decoded._id, recipient,
                            messageBox: messageBox._id
                        }),
                        Chat.create({
                            requester: recipient, recipient: socket.decoded._id,
                            messageBox: messageBox._id
                        })
                    ]);

                    socket.join([messageBox.id, socket.decoded._id]);

                    socket.emit('message', message);

                    io.to(messageBox.id).emit('message', message);
                }
                else {

                    io.to(chat.messageBox.toString()).emit('message', message);

                    const messageBox = await MessageBox.findById(chat.messageBox);

                    messageBox.messages.unshift(message);

                    await messageBox.updateLastTime();
                }

                io.to(socket.decoded._id).to(recipient).emit('reload-messages');

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
