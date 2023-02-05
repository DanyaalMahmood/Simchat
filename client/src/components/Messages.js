import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import io from 'socket.io-client';
const socket = io("http://localhost:4000");


export default function Messages() {
  const friend = useSelector(state => state.friendlist.current);
  const user = useSelector(state => state.log.number);

  const [chat, setChat] = useState([]);
  const [newmessage, setNewmessage] = useState('');

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      console.log(data);
    });

    socket.on('update_chat', (data) => {
      setChat(data);
      console.log('new chat', data);
    });

    return () => {
      socket.off('recieve_message');
      socket.off('update_chat');
    }

  }, [])

  useEffect(() => {
    socket.emit("get_messages", {from: user, to: friend});
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("send_message", {
      from: user,
      to: friend,
      message: newmessage});
    
    setNewmessage('');
  }

  return (
    <div className="bg-red-300 h-[100vh] flex flex-col justify-center items-center">
      <div className="bg-blue-200 w-[40vw] h-[30vh] flex flex-col overflow-auto justify-end">
        {chat.map((message) => {
          return (
            <div>{message.sentby} : {message.message}</div>
          )
        })}
      </div>
      <div className="bg-blue-300 w-[40vw]">
        <form className="bg-green-300 flex" onSubmit={handleSubmit}>
          <input className="w-3/4" type="text" value={newmessage} onChange={e => setNewmessage(e.target.value)}/>
          <input type="submit"/>
        </form>
      </div>
    </div>
  )
}

