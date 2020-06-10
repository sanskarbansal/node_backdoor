require('dotenv').config();
const express = require('express');
const app = express();
const net = require('net');
const dbConnection = require('./config/mongooseConnection');
const bodyParser = require('body-parser');
const session = require('express-session');
require('./config/passportLocal');
const passport = require('passport');

app.set('view engine', 'ejs');
app.set('views', './view');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(
    {
        secret: process.env.SEC_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: (60 * 1000 * 60) },
        name: 'auth'
    }));
app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.json({extended: true}));
app.use('/', require('./routes/'));

const httpServer = app.listen(3000);
const io = require('socket.io')(httpServer);

var netSockets = [];
const server = net.createServer((netSocket) => {
    let id = null;
    netSocket.on('data', (data) => {
        data = JSON.parse(data.toString());
        if (data['sock_id']) {
            netSockets.push({ ...data, netSocket: netSocket });
            id = data['sock_id'];
        }
    });
    netSocket.on('end', () => {
        netSockets.filter(s => s.sock_id !== id);
    })
});
io.on('connect', (socket) => {
    let netSocket = null;
    socket.on('init', sockId => {
        for (let i = 0; i < netSockets.length; i++) {
            if (netSockets[i].sock_id === sockId) {
                netSocket = netSockets[i];
            }
        }
        if (netSocket) {
            netSocket.netSocket.on('data', (data) => {
                socket.emit('command_output', JSON.parse(data.toString()).output.toString());
            });
        }
    })
    socket.on('command', (command) => {
        if (netSocket) {
            netSocket.netSocket.write(command);
        } else {
            socket.emit('command_output', 'CLient is not online currently please try again later.');
        }
        if (command === 'exit') {
            netSocket = null;
        }
    });

});

server.listen(1337); 