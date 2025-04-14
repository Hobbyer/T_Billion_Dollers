import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './memberSlice';
import  useReducer  from './userSlice';

const store =  configureStore({
  reducer: {
    member: memberReducer,
    user: useReducer,
  },
});

export default store;