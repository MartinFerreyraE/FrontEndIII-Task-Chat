import React, {useCallback, useState, useEffect} from "react";

const ChatFooter = ({ socket }) => {

    const [message, setMessage] = useState([]);
    const [typing, setTyping]   = useState('');
    const user = localStorage.getItem("userName"); 
    const user_object_parse = JSON.parse(user);

const handleKeyUp = (e) => {
    socket.emit('typing', {typing: false, id: user_object_parse.id});
};

const handleKeyDown = (e) => {
    socket.emit('typing', {typing: true, id: user_object_parse.id});
};

useEffect(() => {
    socket.on("typing", (data) => setTyping(data));
  }, [socket]);

const onChange = (e) => {
    let inputText = e.target.value;
    setMessage(inputText);
};

const handleSendMessage = useCallback((e) => {
    e.preventDefault();
        if (message.trim()) {
            socket.emit('message', {
                message: message,
                userName: user_object_parse.userName,
                id: user_object_parse.id,
                socketID: socket.id
            });
            setMessage('');
        }
    }, [message, socket]);

    return (
        <div>
            <form onSubmit={handleSendMessage}>
                <input 
                type="text"
                placeholder="Write a message"
                value={message}
                // onChange={(e) => setMessage(e.target.value)}
                onChange={onChange}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                />
                <button>SEND</button>
            </form>
        </div>
    );
};

export default ChatFooter;