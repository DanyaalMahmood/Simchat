import { createSlice } from '@reduxjs/toolkit'

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [], 
    current: null
  },
  reducers: {
    updates: (state, action) => {
      state.friends = action.payload.friends;
    },
    setCurrent: (state, action) => {
      state.current = action.payload.current;
    }
  }
})

// Action creators are generated for each case reducer function
export const { updates, setCurrent } = friendsSlice.actions

export default friendsSlice.reducer