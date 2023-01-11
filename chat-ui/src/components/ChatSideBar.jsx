import React, {useEffect, useState} from 'react'

const ChatSideBar = ({ socket }) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
      
        socket.on("newUserResponse", (data) => setUsers(data));

    }, [socket])
    

  return (
    <div>
        <h1>Chat users sideBar</h1>
            <div>
                {users.map(user => (
                <p key={user.socketID}>{user.userName}</p>))}
            </div>
    </div>
  )
}

export default ChatSideBar