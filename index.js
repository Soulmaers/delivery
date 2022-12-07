const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const { Server } = require('socket.io');
const { PORT, MONGO_URL } = require('./config');
const logger = require('./middleware/logger')
const error = require('./middleware/error')


const authRouter = require('./routes/authRouter')
const advertisementRouter = require('./routes/advertisementRouter');

const initChat = require('./chat/chat-socket.js');
const initAuth = require('./auth/init.js');


const app = express();
const server = http.Server(app);
const io = new Server(server, (err) => {
    if (err) {
        console.log(err);
    }
});

async function start(PORT, MONGO_URL) {
    try {
        mongoose.connect(MONGO_URL)
        await server.listen(PORT, () => {
            console.log('MongoDB подключена')
            console.log(`Сервер запущен на порту:${PORT}`)

        })

    } catch (e) {
        console.log('Ошибка')
    }
}



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: false }))
app.use(logger);
app.use(error);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initAuth(passport);
//основные роуты
app.use('/api', authRouter);
app.use('/api/advertisements/', advertisementRouter);

initChat(io);

start(PORT, MONGO_URL);






