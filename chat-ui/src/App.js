import {BrowserRouter, Routes, Route} from "react-router-dom";
import socketIO from 'socket.io-client';
import ChatComponent from "./components/ChatComponent";
import Home from "./components/Home";

import './App.css';

const socket = socketIO.connect('http://localhost:8080');

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element= {<Home socket={socket} />} />
        <Route path="/chat" element= {<ChatComponent socket={socket} />} />
      </Routes>
    </div>
    </BrowserRouter>
  );  
}

export default App;
