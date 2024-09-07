import { BoxDetailsProps } from "../../../redux/groupList";
import { MappedBoxDetails, RelocateDetailsProps } from "./types";

export const getCurrentBox = (groupList: BoxDetailsProps[], port_id: number) => {
    for (const box of groupList) {
        for (const swit of box.switches) {
            const port = swit.ports.find(port => port.port_id === port_id);
            if (port) {
                const { switch_id, switch_no } = swit
                return { switch_no, building: box.building_name, box, switch_id };
            }
        }
    }
    return { switch_no: 0, building: "", box: null, switch_id: 0 }; // Return null if no matching port_id is found
};

export const mapOnSelectedIds = (
    groupList: BoxDetailsProps[], 
    relocateDetails: RelocateDetailsProps, 
    setRelocateDetails: React.Dispatch<React.SetStateAction<{
        site_id: number;
        box_id: number;
        switch_no: number;
        switch_id: number;
        port_id: number;
        house_no: string;
        description: string;
        client_id: number;
        pre_port_id: number,
    }>>) =>{
    let mapBoxDetails: MappedBoxDetails = {site: [], box: [], switches: [], ports: []};

        groupList.forEach((box, i) =>{
            const { site_id, site_location, box_id, building_name } = box;
            if (!mapBoxDetails.site.some(site => site.site_id === site_id)) {
                mapBoxDetails.site.push({ site_id, site_location });
            }
            if(relocateDetails.site_id && box.site_id === Number(relocateDetails.site_id)){
                mapBoxDetails.box.push({ box_id, building_name });  
            }
            if(relocateDetails.box_id && box.box_id === Number(relocateDetails.box_id)){
                mapBoxDetails.switches =  box.switches; 
            }
            if(relocateDetails.switch_id ){
                const selectedSwitch = box.switches.find(swit => swit.switch_id === Number(relocateDetails.switch_id));
                if (selectedSwitch) {
                    mapBoxDetails.ports = selectedSwitch.ports;
                }
                setRelocateDetails((obj) => ({...obj, port_id: 0}));
            }
        });
    return mapBoxDetails;
}
