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
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="h-[12vh] w-[30vw] flex-col">

        <div className="bg-red-400 h-1/2 flex">
          <Link className="bg-red-300 w-full h-full flex items-center justify-center" to="signup">Signup</Link>
        </div>

        <div className="bg-blue-400 h-1/2 flex">
          <Link className="bg-blue-300 w-full h-full flex items-center justify-center" to="signin">Signin</Link>
        </div>

      </div>
    </div>
  );
}
