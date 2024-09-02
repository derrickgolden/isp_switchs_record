
import { createSlice } from '@reduxjs/toolkit';
import { Shop } from "./activeISP";

const initialState: Shop[] | [] = []

const ispListDetailsSlice = createSlice({
  name: 'shopListDetails',
  initialState,
  reducers: {
    setISPlistDetails: (state, action) => {      
      return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setISPlistDetails } = ispListDetailsSlice.actions;

export default ispListDetailsSlice.reducer;
