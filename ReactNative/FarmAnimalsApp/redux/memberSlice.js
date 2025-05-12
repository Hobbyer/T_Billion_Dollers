import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GET_API } from '../apis/testcrud'

export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async(_,thunkAPI)=>{
    try{
      const response = await GET_API('/admin/members') //member 리스트 가져오기
      console.log(response);
      return response
    }catch(err) {
      return thunkAPI.rejectWithValue(err.message || 'Fetch error')
    }
  } 
)

export const fetchMemberDetail = createAsyncThunk(
  'members/fetchMemberDetail',
  async(userId,thunkAPI)=>{
    try{
      const response = await GET_API(`/admin/members/${userId}`)
      return response
    } catch {
      return thunkAPI.rejectWithValue(err.message || 'Fetch error')
    }
  }
 
)

const memberSlice = createSlice({
  name: 'members',
  initialState:{
    list : [], // 회원목록
    detail : null, // 상세 정보
    loading : false, // 로딩상태
    error : null // 에러 상태
  },
  reducers:{},
  extraReducers:(builder)=>{
    // 회원 목록 데이터 요청 시작 
    builder.addCase(fetchMembers.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    // 회원 목록 데이터 요청 성공
    .addCase(fetchMembers.fulfilled,(state,action)=>{
      state.loading = false;
      state.list = action.payload;
    })
    // 회원 목록 데이터 요청 실패
    .addCase(fetchMembers.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })

    builder.addCase(fetchMemberDetail.pending,state=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchMemberDetail.fulfilled,(state,action)=>{
      state.loading =  false;
      state.detail =  action.payload;
    })
    .addCase(fetchMemberDetail.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  }
})

export default memberSlice;