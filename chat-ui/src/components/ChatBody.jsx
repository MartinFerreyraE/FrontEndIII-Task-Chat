import React from 'react'
import { useNavigate } from 'react-router-dom'

function ChatBody( { messages }) {

        const navigate = useNavigate();

  const leaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload();
  };

  return (
    <>
    <header>
        <p>Socket IO chat</p>
        <button onClick={leaveChat}>Leave Chat</button>
    </header>
        <div>
            {messages.map((message) => (
                <>
                    <p>{messages.userName}</p>
                    <p>{messages.message}</p>
                </>
            ))}
        </div>
    </>
  );
};

export default ChatBody