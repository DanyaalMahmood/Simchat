import { Link, useNavigate } from 'react-router-dom';
import api from './Api';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/logSlice';

export default function Landingpage() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const height = window.innerHeight;


  const checkLogState = async () => {
    const res = await api.get('/user', {
      withCredentials: true,
    });

    if(res.data.number) {

      await dispatch(login(res.data));
      nav('/friends')
    }
  }

  useEffect(() => {
    checkLogState();
  }, []);
  

  return (
    <div className={`w-[100vw] bg-[#A5C9CA] flex justify-center items-center`} style={{height: height*0.9 + 'px'}}>
      <div className="h-[12vh] w-[60vw] flex-col text-xl text-[#A5C9CA] font-semibold">

        <div className="h-1/2 flex mb-2">
          <Link className="bg-[#395B64] w-full h-full flex items-center justify-center" to="signup">Signup</Link>
        </div>

        <div className="h-1/2 flex mt-2">
          <Link className="bg-[#395B64] w-full h-full flex items-center justify-center" to="signin">Signin</Link>
        </div>

      </div>
    </div>
  );
}
