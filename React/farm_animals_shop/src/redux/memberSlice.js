import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userName: '',
  authority: 'guest',
  phoneNumber: '',
  email: '',
  address: '',
  loaded: false,
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMember: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.authority = action.payload.authority;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.loaded = true;
    },
    clearMember: (state) => {
      state.userId = '';
      state.userName = '';
      state.authority = 'guest';
      state.phoneNumber = '';
      state.email = '';
      state.address = '';
      state.loaded = true;
    },
  },
});

export const { setMember, clearMember } = memberSlice.actions;
export default memberSlice.reducer;