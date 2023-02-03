import { configureStore } from '@reduxjs/toolkit'
import logReducer from './slices/logSlice'
import friendsReducer from './slices/friendsSlice'

export default configureStore({
  reducer: {
    log: logReducer,
    friendlist: friendsReducer
  }
})