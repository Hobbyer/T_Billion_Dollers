import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './memberSlice';

export default configureStore({
  reducer: {
    member: memberReducer,
  },
});