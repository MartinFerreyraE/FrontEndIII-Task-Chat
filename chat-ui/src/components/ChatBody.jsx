import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const ChatBody = ( { messages, socket }) => {

  const navigate = useNavigate();
  const[typing, setTyping] = useState('');
  const user = localStorage.getItem("userName"); 
  const user_object_parse = JSON.parse(user);

  useEffect(() => {

    socket.on('typingResponse', (data) => {
      setTyping(data);
    });

  }, [typing, socket])
  
  const leaveChat = () => {
    localStorage.removeItem('userName');
    socket.emit('removeUser', user_object_parse.id);
    navigate('/')
    window.location.reload();
  };

  return (
    <>
    <header className='chat-header'>
        <p>Socket IO chat</p>
        <button onClick={leaveChat}>Leave Chat</button>
    </header>
    {  typing.typing && <p> is typing...</p> } 
        <div>
            {messages.map((message) => (
                <>
                    <label key={message.socketId}>{message.userName}: </label>
                    <label>{message.message}</label><br></br>
                </>
            ))}

        </div>
    </>
  );
};

export default ChatBody