import { createSlice } from '@reduxjs/toolkit';

export type Status = "unconnected" | "active" | "inactive" | "faulty"

// status: Status;
export interface PortTypes {
  status: Status,
  port_id: number,
  description: string,
  port_number: number,
  client_details: {
    client_id: number;
    house_no: string;
    phone: string;
    username: string;
  }
}
export interface SwitchProps {
  switch_id: number;
  switch_no: number;
  description: string;
  total_ports: number;
  ports: PortTypes[];
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
