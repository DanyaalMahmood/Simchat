import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { login } from '../slices/logSlice';

export default function Signup() {
  const [z, setz] = useState('-z-10');
  const [errormessage, setErrormessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === '' || email === '' || number === '' || password === '') {
      setz('z-10');
      setErrormessage('Please complete the form!');
      return;
    }


    const user = { name, email, number, password };

    try {
      const response = await axios.post('http://localhost:4000/signup', user, {
        withCredentials: true,
      });


      if(response.data.error) {
        setz('z-10');
        setErrormessage(response.data.error);
        return;
      }
      dispatch(login(response.data));
      nav('/friends');
    } catch (err) {
      setz('z-10');
      setErrormessage(err.message);
    }
  };

  return (
    <div className="bg-[#A5C9CA] flex justify-center items-center h-[90vh] relative">
      <div className={`${z} absolute top-5 h-fit p-2 w-[80vw] bg-[#8d7486] border-4 border-[#E7F6F2] items-center flex justify-center text-lg break-words font-semibold text-[#E7F6F2] rounded-lg`}>
        {errormessage}
      </div>
      <form onSubmit={handleSubmit} className='relative z-0text-[#395B64] text-xl font-bold'>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          className='focus:outline-0 py-1 px-2 mb-2'
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          className='focus:outline-0 py-1 px-2 mb-2'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="number">Number:</label>
        <br />
        <input
          className='focus:outline-0 py-1 px-2 mb-2'
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
          className='focus:outline-0 py-1 px-2 mb-2'
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
