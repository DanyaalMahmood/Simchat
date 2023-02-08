import { Link, useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/logSlice';

export default function Landingpage() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const checkLogState = async () => {
    const res = await axios.get('http://localhost:4000/user', {
      withCredentials: true,
    });
    console.log(res, 'res')

    if(res.data.number) {

      await dispatch(login(res.data));
      nav('/friends')
    }
  }

  useEffect(() => {
    checkLogState();
  }, []);
  

  return (
    <div className="h-[90vh] w-[100vw] bg-[#A5C9CA] flex justify-center items-center">
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
