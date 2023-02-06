import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";


import io from 'socket.io-client';
const socket = io("http://localhost:4000");


export default function Messages() {
  const bottomRef = useRef(null);
  const friend = useSelector(state => state.friendlist.current);
  const user = useSelector(state => state.log.number);
  const userid = useSelector(state => state.log.id);
  console.log('userid', userid);


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

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chat]);


  return (
    <div className="h-[90vh] flex flex-col">
      <div className="bg-[#A5C9CA] h-[84vh] w-full flex flex-col overflow-y-auto">
        {chat.map((message, index) => {
          return (
            <div key={index} className={`bg-[#395B64] w-fit break-words max-w-[80%] mx-2 my-1 p-2 rounded-lg text-[#A5C9CA] font-semibold text-base self-${message.sentby == userid ? "end": "start"}`}>
              {message.message}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>
      <div className="h-[6vh] w-full flex">
        <form className="bg-green-300 flex w-full h-full" onSubmit={handleSubmit}>
          <input className="w-3/4 bg-[#E7F6F2] px-2 focus:outline-0" type="text" value={newmessage} onChange={e => setNewmessage(e.target.value)}/>
          <input type="Submit" value="Send" className="bg-[#395B64] w-1/4 text-[#A5C9CA] text-2xl font-semibold"/>
        </form>
      </div>
    </div>
  )
}

