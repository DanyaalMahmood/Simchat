import { Outlet, Link } from "react-router-dom";
import menu from '../images/menu.png';

function Navbar() {
  return (
    <>
      <div className="bg-[#395B64] h-[10vh] flex justify-between px-4 items-center">
        <img src={menu} alt="menu" className="h-[6vh]"/>
        <h1 className="text-4xl font-bold text-[#A5C9CA]">Simchat</h1>
      </div>
      <Outlet />
    </>
  )
}

export default Navbar;