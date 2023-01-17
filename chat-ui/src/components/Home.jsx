import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');

    const handleSubmit = (e) => {
        // localStorage.clear();
        e.preventDefault()
        const user = { userName: userName, socketID: socket.id };
        localStorage.setItem('userName', JSON.stringify(user));
        socket.emit("newUser", user);
        navigate('/chat');
    };

    return (
    <form onSubmit={handleSubmit}>
        
        <h2>Sign in to Chat</h2>
        <label htmlFor="userName">UserName</label>
        <input 
        type="text" 
        name="userName" 
        id="userName" 
        value={userName} 
        onChange={(e) =>  setUserName(e.target.value)} 
        />

        <button>Sign In</button>
    </form>
    );
};

export default Home;