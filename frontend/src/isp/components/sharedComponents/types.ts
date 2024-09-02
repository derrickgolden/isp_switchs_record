import { Dispatch } from "react";
import { BoxDetailsProps, PortTypes, SwitchProps } from "../../../redux/groupList";
import { ExtractedPortDetailsProps } from "../../pages/types";
import { AnyAction } from "@reduxjs/toolkit";

export interface DataTableComponentProps{
    apidata: ExtractedPortDetailsProps[],
    search: string | number, 
    columns: ({
        name: string;
        selector: (row: ExtractedPortDetailsProps) => string;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        selector: (row: ExtractedPortDetailsProps) => number;
        sortable: boolean;
        cell?: undefined;
    } | {
        
    })[]
};

export interface DataTableProductGroupProps{
    apidata: BoxDetailsProps[],
    onHandlePortDetails: (row: SwitchProps) => void; 
    columns: ({
        name: string;
        selector: (row: BoxDetailsProps) => number;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        selector: (row: BoxDetailsProps) => string ;
        sortable: boolean;
        cell?: undefined;
    } | {
        name: string;
        cell: (row: BoxDetailsProps) => JSX.Element;
        selector?: undefined;
        sortable?: undefined;
    })[], 
    search: string | number
  }

export interface UpdatePortModalProps{
    port: PortTypes, 
    id: number, 
    setCurrentPortId: React.Dispatch<React.SetStateAction<number>>;
    dispatch: Dispatch<AnyAction>; 
    currentPortId: number; 
}