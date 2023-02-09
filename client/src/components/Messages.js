import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { connect } from "../slices/logSlice";

import io from 'socket.io-client';

let socket;

export default function Messages() {
  const dispatch = useDispatch();
  const socketconnect = useSelector(state => state.log.socketconnect);
  const bottomRef = useRef(null);
  const friend = useSelector(state => state.friendlist.current);
  const user = useSelector(state => state.log.number);
  const userid = useSelector(state => state.log.id);
  console.log('userid', userid);
  
  if(socketconnect === false) {
      socket = io({
      withCredentials: true,
    });
    dispatch(connect({socketconnect: true}))
  };

  const [chat, setChat] = useState([]);
  const [newmessage, setNewmessage] = useState('');

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      console.log(data);
    });

    socket.on('update_chat', async (data) => {
      await setChat(data);
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
    <div className="h-[90vh] relative flex flex-cols justify-center">
      <div className="-z-10 relative top-5 h-fit p-2 w-[80vw] bg-[#8d7486] border-4 border-[#E7F6F2] items-center flex justify-center text-lg break-words font-semibold text-[#E7F6F2] rounded-lg">Error</div>
      <div className="absolute top-0 left-0 z-0 bg-[#A5C9CA] h-[84vh] w-full flex flex-col overflow-y-auto">
        {chat.map((message, index) => {
          return (
            <div key={index} className={`bg-[#395B64] w-fit break-words max-w-[80%] mx-2 my-1 p-2 rounded-lg text-[#A5C9CA] font-semibold text-base ${(message.sentby === userid) ? 'self-end' : 'self-start'}`}>
              {message.message}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>
      <div className="absolute bottom-0 left-0 z-0 h-[6vh] w-full flex">
        <form className="bg-green-300 flex w-full h-full" onSubmit={handleSubmit}>
          <input className="w-3/4 bg-[#E7F6F2] px-2 focus:outline-0" type="text" value={newmessage} onChange={e => setNewmessage(e.target.value)}/>
          <input type="Submit" value="Send" className="bg-[#395B64] w-1/4 text-[#A5C9CA] text-2xl font-semibold"/>
        </form>
      </div>
    </div>
  )
}

