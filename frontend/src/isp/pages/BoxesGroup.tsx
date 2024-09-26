
import { useEffect, useState } from "react";
import PagesHeader from "../components/sharedComponents/PagesHeader";
import GroupList from "../components/sites/boxes/BoxList";
import { SwitchProps, setGroupList } from "../../redux/groupList";
import SiteInforForm from "../components/sites/boxes/SiteInforForm";
import AddSwitchForm from "../components/sites/boxes/AddSwitchForm";
import PortDetails from "../components/sites/boxes/PortDetails";
import { getBoxDetailsApi } from "../components/sites/boxes/apiCalls/getApiCalls";
import AddGroupForm from "../components/sites/boxes/AddBoxForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getSwitchById } from "./calculations/getSwitchById";
import { useNavigate } from "react-router-dom";
import { getCurrentBox } from "../components/sharedComponents/mappingBoxes";

const BoxesGroup = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState("list");
    const [portDetails, setPortDetails] = useState<SwitchProps>();
    const activeShop = useSelector((state: RootState) => state.activeShop);
    const callApi = useSelector((state: RootState) => state.callApi);
    const groupList = useSelector((state: RootState) => state.groupList);
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const onHandlePortDetails = (row: SwitchProps) =>{
        setShowDetails("portdetails");
        setPortDetails(row);
        const currentBox = getCurrentBox(groupList, row.ports[0].port_id);
        currentBox.box? setExpandedRows([currentBox.box?.box_id]): null;
    };

    useEffect(() =>{
        const shop_id = activeShop.shop?.shop_id;

        if(shop_id){
            const data = JSON.stringify({shop_id});
            getBoxDetailsApi(data, navigate).then((res) =>{
                if(res.success){
                    dispatch(setGroupList(res.details))
                }
                if(showDetails === "portdetails" && portDetails?.switch_id){
                    const newPortDetails = getSwitchById({details: res.details, switchId: portDetails?.switch_id});
                    newPortDetails ? setPortDetails(newPortDetails) : null;
                }
            });  
        }
    }, [ activeShop, callApi]);
  
    return(
        <div className='body2 bg-white pb-5'>
            <PagesHeader 
                setShowDetails = {setShowDetails}
                btnInfo = {{text: "Box", navigate: "addgroup", details: "group"}}
            />

            {showDetails === "list" && 
                <GroupList 
                    onHandlePortDetails = {onHandlePortDetails}
                    expandedRows = {expandedRows}
                />
            }
            {showDetails === "addgroup" && 
                <AddGroupForm 
                    setShowDetails ={setShowDetails}
                />
            }
            {showDetails === "addsite" && 
                <SiteInforForm 
                    setShowDetails ={setShowDetails}
                />
            }
            {showDetails === "addswitch" && 
                <AddSwitchForm 
                    setShowDetails ={setShowDetails}
                />
            }
            {showDetails === "portdetails" && 
                <PortDetails
                    portDetails={portDetails}
                    setShowDetails ={setShowDetails}
                    dispatch = {dispatch}
                />
            }
        </div>
    )
};

export default BoxesGroup;
