import { createSlice } from '@reduxjs/toolkit'

export const logSlice = createSlice({
  name: 'log',
  initialState: {
    name: "Not Logged In"
  },
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.number = action.payload.number;
    },
  }
})

// Action creators are generated for each case reducer function
export const { login } = logSlice.actions

export default logSlice.reducer