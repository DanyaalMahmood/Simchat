import { Outlet, Link } from "react-router-dom";
import menu from '../images/menu.png';
import { useSelector } from "react-redux";
import api from './Api';

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/logSlice";

function Navbar() {
  const user = useSelector(state => state.log);
  const [z, setZ ] = useState('-z-10');
  const nav = useNavigate();
  const dispatch = useDispatch();


  const handleSignout = async () => {
    await api.get('/signout',{
      withCredentials: true,
    });
    
    const user = { name: "Not Signed In", id: '', email: '', number: ''};
    dispatch(login(user));

    nav('/');
  }

  const onMenu = async () => {
    if(z == '-z-10') {
      setZ('z-10');
    } else {
      setZ('-z-10')
    }
  }

  return (
    <>
      <div className="bg-[#395B64] h-[10vh] flex justify-between px-4 items-center relative">
        <h1 className="relative text-4xl font-bold text-[#A5C9CA]">Simchat</h1>
        <img onClick={onMenu}  src={menu} alt="menu" className="h-[6vh]"/>
        <div className={`absolute ${z} w-full flex flex-col left-0 top-[10vh] bg-[#395B64] p-4 border-y-2 border-black text-2xl font-semibold text-[#A5C9CA]`}>
          <div className="flex justify-between">
            <div>
              {user.name}
            </div>
            <div>
              {user.number}
            </div>
          </div>
          
          <button className="bg-[#2C3333] mt-2 self-center h-[5vh] w-[95vw] hover:outline-0 appearance-none" onClick={handleSignout}>
            Sign Out
          </button>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar;