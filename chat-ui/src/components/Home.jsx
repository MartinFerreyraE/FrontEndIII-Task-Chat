import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('userName', userName);
        socket.on("newUser", {userName, socketID: socket.id})
        navigate('/chat');
    };

    // useEffect(() => {
    //   socket.emit('helloFromClient', 'this is the message from client');

    //   socket.on('helloFromServer', (...args) =< {
    //     setMessage(args);
    //   });
    // }, [socket])

    return <form onSubmit={handleSubmit}>
        <h2>Sign in to Chat</h2>
        <label htmlFor="username">UserName</label>
        <input type="text" name="username" id="username" value={userName} onChange={e =>  setUserName(e.target.value)} />
        <button>Sign In</button>
    </form>;
};

export default Home;