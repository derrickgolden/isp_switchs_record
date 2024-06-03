import { createSlice } from '@reduxjs/toolkit';

export interface SwitchProps {
  switch_id: number;
  switch_no: number;
  description: string;
  total_ports: number;
}

export interface BoxDetailsProps {
  shop_id: number;
  box_id: number;
  site_id: number;
  building_name: string;
  box_description: string;
  site_location: string;
  site_description: string;
  switches: SwitchProps[];
}

const initialState: BoxDetailsProps[] = [];

const groupListSlice = createSlice({
  name: 'groupList',
  initialState,
  reducers: {
    setGroupList: (state, action) => {
        return action.payload;
    }
  }  
});

// Action creators for signup details
export const { setGroupList } = groupListSlice.actions;

export default groupListSlice.reducer;
