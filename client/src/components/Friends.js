import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrent, updates } from '../slices/friendsSlice';


export default function Friends() {
  const nav = useNavigate();
  const friends = useSelector((state) => state.friendlist.friends);
  const dispatch = useDispatch();
  const usernumber = useSelector(state => state.log.number)

  useEffect(() => {
    const FetchFriends = async () => {
      const data = (await axios.get(`http://localhost:4000/friends/${usernumber}`)).data;
      await dispatch(updates({ friends: data }));
    };
    FetchFriends();
  }, []);

  const Addfriendhandler = () => {
    nav('/addfriend');
  };

  const openMessages = async (number) => {
    await dispatch(setCurrent({current: number}));
    nav('/messages');
  }

  return (
    <div className='bg-[#A5C9CA] h-[90vh] flex flex-col items-center justify-center'>
      <div className='bg-[#A5C9CA] h-[85vh] w-full px-2 flex flex-col'>
        {friends.map((friend) => {
          return (
            <div key={friend.number} onClick={() => {openMessages(friend.number)}} className='flex h-[8vh] items-center justify-around border-b-2 hover:cursor-pointer border-[#395B64]'>
              <h2 className='text-xl font-semibold text-[#395B64]'>{friend.name}</h2>
              <h2 className='text-xl font-semibold text-[#395B64]'>{friend.number}</h2>
            </div>
          )
        })}
      </div>
      <div className='bg-[#395B64] h-[6vh] w-full'>
        <button className='w-full h-full' onClick={Addfriendhandler}>
          <p className='text-2xl text-[#A5C9CA] font-bold tracking-widest'>
            Add Friends
          </p>
        </button>
      </div>
    </div>
  );
}
