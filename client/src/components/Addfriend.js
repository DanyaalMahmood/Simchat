import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Addfriend() {
  const [number, setNumber] = useState('');
  const nav = useNavigate();
  const user = useSelector(state => state.log.number);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const body = { user, friend: number };
      await axios.post('http://localhost:4000/friends', body, {
        withCredentials: true
      })
      setNumber('');
      nav('/friends');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='flex h-[100vh] bg-green-300 items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-red-300'>
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
        <input
          type="submit"
          value="Add Friend"
        />
        <br />
      </form>
    </div>
  );
}
