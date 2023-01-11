import React, {useCallback, useEffect, useState} from "react";

const ChatFooter = ({ socket }) => {

    const[message, setMessage] = useState('');

    useEffect(() => {
        socket.on("messageResponse", (data) =>
            console.log("this is the message from server", data)
    );
}, [message, socket]);

const handleSendMessage = useCallback(() => {
    if (message.trim()) {
        socket.emit('message', {
            message: message,
            userName: localStorage.getItem("userName"),
            id: `${socket.id}`,
            socketID: socket.id
        });
        setMessage('');
    }
}, [message, socket]);

    return (
        <div>
            <input 
            type="text"
            placeholder="Write a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>SEND</button>
        </div>
    );
};

export default ChatFooter;