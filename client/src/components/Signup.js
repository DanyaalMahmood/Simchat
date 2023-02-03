import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { login } from '../slices/logSlice';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { name, email, number, password };

    try {
      const response = await axios.post('http://localhost:4000/signup', user, {
        withCredentials: true,
      });

      dispatch(login(response.data));
      nav('/friends');
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <div className="bg-red-200 flex justify-center items-center h-[100vh]">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
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
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input className="bg-blue-200" type="submit" value="Submit" />
      </form>
    </div>
  );
}
