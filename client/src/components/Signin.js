import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Api';


import { useDispatch } from 'react-redux';
import { login } from '../slices/logSlice';

export default function Signup() {
  const [z, setz] = useState('-z-10');
  const [errormessage, setErrormessage] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (number === '' || password === '') {
      setz('z-10');
      setErrormessage('Please complete the form!');
      return;
    }

    const user = { number, password };

    try {
      const response = await api.post('/signin', user, {
        withCredentials: true,
      });

      dispatch(login(response.data));
      nav('/friends');
    } catch (err) {
      if(err.response) {
        setz('z-10');
        setErrormessage(err.response.data.error);
      } else {
        setz('z-10');
        setErrormessage(err.message)
      }
    }
  };

  return (
    <div className="bg-[#A5C9CA] flex justify-center items-center h-[90vh] relative">
      <div className={`${z} absolute top-5 h-fit p-2 w-[80vw] bg-[#8d7486] border-4 border-[#E7F6F2] items-center flex justify-center text-lg break-words font-semibold text-[#E7F6F2] rounded-lg`}>
        {errormessage}
      </div>
      <form onSubmit={handleSubmit} className='relative text-[#395B64] w-[70vw] text-xl font-bold'>
        <label htmlFor="number">Number:</label>
        <br />
        <input
          className='focus:outline-0 py-1 px-2 mb-2 w-full'
          type="number"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          className='focus:outline-0 py-1 px-2 mb-2 w-full'
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input className="bg-[#395B64] text-[#A5C9CA] w-full mt-4 h-[5vh]" type="submit" value="Submit" />
      </form>
    </div>
  );
}
