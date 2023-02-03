import { createSlice } from '@reduxjs/toolkit'

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: []
  },
  reducers: {
    updates: (state, action) => {
      state.friends = action.payload.friends;
    },
  }
})

// Action creators are generated for each case reducer function
export const { updates } = friendsSlice.actions

export default friendsSlice.reducer