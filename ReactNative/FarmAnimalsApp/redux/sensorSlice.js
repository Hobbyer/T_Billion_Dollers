import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_API } from '../apis/testcrud';

export const fetchSensorData = createAsyncThunk(
  'sensor/fetchSensorData',
  async (_, thunkAPI) => {
    try {
      const [tempRes, humRes] = await Promise.all([
        GET_API('/admin/temp'),
        GET_API('/admin/humidity'),
      ]);

      const sortedTemp = tempRes.sort(
        (a, b) => new Date(b.timeLine) - new Date(a.timeLine)
      );
      const sortedHum = humRes.sort(
        (a, b) => new Date(b.timeLine) - new Date(a.timeLine)
      );

      return {
        temperature: sortedTemp[0] || null,
        humidity: sortedHum[0] || null,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Fetch error');
    }
  }
);

const sensorSlice = createSlice({
  name: 'sensor',
  initialState: {
    temperature: null, // 온도 데이터 저장
    humidity: null, // 습도 데이터 저장
    loading: false, // 데이터를 불러오는 중인지 여부 
    error: null, // 에러 발생시 메세지 저장
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // 요청 시작할때 
      .addCase(fetchSensorData.pending, (state) => {
        state.loading = true; // 로딩중 표시
        state.error = null; // 이전 에러 초기화
      })
      // 요청 성공했을 때
      .addCase(fetchSensorData.fulfilled, (state, action) => {
        state.loading = false; // 로딩 종료
        state.temperature = action.payload.temperature; // 온도 데이터 저장
        state.humidity = action.payload.humidity; // 습도 데이터 저장
      })
      // 요청 실패 했을 때 
      .addCase(fetchSensorData.rejected, (state, action) => {
        state.loading = false; // 로딩 중단
        state.error = action.payload; // 에러 메세지 저장
      });
  },
});

export default sensorSlice;
