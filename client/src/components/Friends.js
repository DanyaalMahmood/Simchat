import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updates } from '../slices/friendsSlice';

export default function Friends() {
  const nav = useNavigate();
  const friends = useSelector((state) => state.friendlist.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchFriends = async () => {
      const data = (await axios.get('http://localhost:4000/friends/111')).data;
      await dispatch(updates({ friends: data }));
    };
    FetchFriends();
  }, []);

  const Addfriendhandler = () => {
    nav('/addfriend');
  };

  return (
    <div className='bg-blue-300 h-[100vh] flex flex-col items-center justify-center'>
      <div className='bg-red-300 h-[40vh] w-[30vw] flex flex-col'>
        {friends.map((friend) => {
          return (
            <div key={friend.number} className='flex justify-around my-1 border-2 border-black rounded-lg'>
              <h2 className=''>{friend.name}</h2>
              <h2 className=''>{friend.number}</h2>
            </div>
          )
        })}
      </div>
      <div className='bg-green-300 h-[5vh] w-[30vw]'>
        <button className='w-full h-full' onClick={Addfriendhandler}>Add Friends</button>
      </div>
    </div>
  );
}
