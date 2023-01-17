const express = require('express');
const app = express();

const PORT = 8081;

const http = require('http').Server(app);
const cors = require('cors');

const socketCallback = require('socket.io');

const socketIO =  socketCallback(http, {
    cors: {
        origins: "http://localhost:3001",
    },
});

app.use(cors())

let users = [];

app.get("/api", (req, res) => {
    res.json({
        message: 'Hello World from API'
    });
});

socketIO.on('connection', (socket) => {
    console.log("socket start with socket ID", socket.id)

    socket.on("typing", data => {
        socketIO.emit("typingResponse", data);
      });

    // message handler
    socket.on('message', (data) => {
        console.log('this is a message from client', data);
        socketIO.emit('messageResponse', data);
    });

    // user handler
    socket.on("newUser", data => {
        users.push(data);
        socketIO.emit("newUserResponse", users);
    });

    // remove user
    socket.on("removeUser", (id) => {
        
        const index = users.findIndex(user => user.id === id);

        if (index !== -1) {
            return users.splice(index, 1)[0];
        }

        socketIO.emit('newUserResponse', users)
    })

    // recieve a message from the client
    socket.on('helloFromClient', (...args) => {
        console.log('client args', args);
        // send a message to the client
        // la idea es que con los subscription y emit se vea el Typing...
        // socketIO.emit('userTyping', {userName, });
        socketIO.emit('helloFromServer', args);
    });

    socket.on('disconnect', () =>
    {
        console.log('the user is been disconnected');
    });
});

http.listen(PORT, () => {
    console.log("SERVER IS RUNNING AT PORT ", PORT);
});