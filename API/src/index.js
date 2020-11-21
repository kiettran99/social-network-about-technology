const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const userRouter = require('./routers/api/user');
const authRouter = require('./routers/api/auth');
const postRouter = require('./routers/api/post');
const groupRouter = require('./routers/api/group');
const profileRouter = require('./routers/api/profile');
const socicalRouter = require('./routers/api/auth-facebook');
const socicalRouterGG = require('./routers/api/auth-google');
const notificationRouter = require('./routers/api/notification');
const friendRouter = require('./routers/api/friend');

const notFoundRouter = require('./routers/not-found/not-found');

const passport = require('passport');

// const errorHandler = require('./middleware/error-handler');
const PORT = process.env.PORT;

// @ts-ignore, Node can upload to firebase
global.XMLHttpRequest = require('xhr2');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//Global error handler
// app.use(errorHandler);

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
// app.use('/api/following', followingRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/groups', groupRouter);
app.use('/api/profile', profileRouter);
app.use('/api/friends', friendRouter);
app.use(socicalRouter);
app.use(socicalRouterGG);
//The 404 Route (ALWAYS Keep this as the last route)
app.use('*', notFoundRouter);

//Start nodejs server
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

process.on('uncaughtException', function (err) {
  console.error(err.stack); // either logs on console or send to other server via api call.
  process.exit(1)
})
