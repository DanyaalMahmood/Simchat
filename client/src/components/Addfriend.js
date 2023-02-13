import api from './Api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Addfriend() {
  const [number, setNumber] = useState('');
  const [z, setz] = useState('-z-10');
  const [errormessage, setErrormessage] = useState('');
  const nav = useNavigate();
  const user = useSelector(state => state.log.number);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(number === '') {
      setErrormessage('Please enter a number!');
      setz('z-10');
      return;
    }
    
    try {

      const body = { user, friend: number };
      const res = await api.post('/friends', body, {
        withCredentials: true
      })
      if(res.data.error) {
        setErrormessage(res.data.error);
        setz('z-10');
        return;
      }
      

      setNumber('');
      nav('/friends');
    } catch (err) {
      setErrormessage(err.message);
      setz('z-10');
    }
  }

  return (
    <div className='flex bg-[#A5C9CA] items-center justify-center relative' style={{height: window.innerHeight*0.9}}>
      <div className={`${z} absolute top-5 h-fit p-2 w-[80vw] bg-[#8d7486] border-4 border-[#E7F6F2] items-center flex justify-center text-lg break-words font-semibold text-[#E7F6F2] rounded-lg`}>
        {errormessage}
      </div>

      <form onSubmit={handleSubmit} className='w-[70vw] h-[8vh] text-[#395B64] w-[70vw] text-xl font-bold'>

        <input
          className='focus:outline-0 w-full px-2 mb-2 py-1 px-2'
          type="number"
          id="number"
          name="number"
          placeholder='Enter number...'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <input
          className='bg-[#395B64] py-2 w-full text-[#A5C9CA] text-xl font-semibold focus:outline-0 mt-2'
          type="submit"
          value="Add Friend"
        />
        <br />
      </form>
    </div>
  );
}
