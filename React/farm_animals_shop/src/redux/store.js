import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './memberSlice.js';

export default configureStore({
  reducer: {
    member: memberReducer,
  },
});