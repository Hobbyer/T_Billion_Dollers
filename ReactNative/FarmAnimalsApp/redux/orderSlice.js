import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_API } from "../apis/testcrud";

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async(_,thunkAPI)=>{
    try{
      const response = await GET_API('/orders')
      return response;
    }catch{
      return thunkAPI.rejectWithValue(err.message ||"Fetch error")
    }
  }
)

const orderSlice =  createSlice({
  name : 'orders',
  initialState :{
    list:[],
    loading:false,
    error: null
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchOrders.pending,state=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOrders.fulfilled,(state,action)=>{
      state.loading =false;
      state.list = action.payload;
    })
    .addCase(fetchOrders.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  }
})

export default orderSlice