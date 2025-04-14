// Redux Toolkit에서 createSlice와 createAsyncThunk를 import
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// HTTP 요청을 위해 axios를 import
import axios from 'axios';

//  사용자 정보 비동기 요청 Thunk 함수 생성
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo', // 액션 타입
  async (_, thunkAPI) => {
    try {
      // 로컬 스토리지에서 accessToken 가져오기
      const token = localStorage.getItem('accessToken');
      // 서버에 사용자 정보 요청 (인증 토큰 포함)
      const response = await axios.get('/members/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // 요청 성공 시, 응답 데이터 반환
      return response.data;
    } catch (error) {
      // 요청 실패 시, 에러 데이터를 rejectWithValue로 반환
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 사용자 관련 상태를 관리하는 Redux Slice 생성
const userSlice = createSlice({
  name: 'user', // Slice 이름
  initialState: {
    userInfo: null,   // 사용자 정보
    loading: false,   // 로딩 상태
    error: null,      // 에러 정보
  },
  reducers: {
    // 로그아웃 액션: 사용자 정보 제거 및 토큰 삭제
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('accessToken');
    },
  },
  // 비동기 Thunk에 대한 상태 처리
  extraReducers: (builder) => {
    builder
      // fetchUserInfo 실행 중일 때
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true; // 로딩 시작
      })
      // fetchUserInfo 성공 시
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;       // 로딩 종료
        state.userInfo = action.payload; // 사용자 정보 저장
      })
      // fetchUserInfo 실패 시
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;       // 로딩 종료
        state.error = action.payload; // 에러 저장
      });
  },
});

// logout 액션을 export
export const { logout } = userSlice.actions;
// reducer를 export (스토어에 등록하기 위해)
export default userSlice.reducer;
