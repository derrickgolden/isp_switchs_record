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
    search: string | number,
    expandedRows: number[]
  }

export interface UpdatePortModalProps{
    port: PortTypes, 
    id: number, 
    setCurrentPortId: React.Dispatch<React.SetStateAction<number>>;
    dispatch: Dispatch<AnyAction>; 
    currentPortId: number; 
    relocateModalRef?: React.MutableRefObject<(HTMLDivElement | null)>
};
export interface RelocateClientProps{
    port: PortTypes, 
    dispatch: Dispatch<AnyAction>; 
    openModal: {render: boolean, open: boolean}
    setOpenRelocateModal: React.Dispatch<React.SetStateAction<{
        render: boolean;
        open: boolean;
    }>>;
};

export interface MappedBoxDetails{
    site: {site_id: number, site_location: string}[],
    box: { box_id: number, building_name: string }[], 
    switches: SwitchProps[], 
    ports: PortTypes[]
}

export interface RelocateDetailsProps {
    site_id: number;
    box_id: number;
    switch_no: number;
    switch_id: number;
    port_id: number;
    house_no: string;
    description: string;
}