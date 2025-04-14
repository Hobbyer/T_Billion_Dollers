import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import memberReducer from './memberSlice';
import  useReducer  from './userSlice';
=======
import memberReducer from './memberSlice.js';
>>>>>>> 966a316e4faee04939a3d6bd56b5c947c150e39a

const store =  configureStore({
  reducer: {
    member: memberReducer,
    user: useReducer,
  },
});

export default store;