
import { useEffect, useState } from "react";
import PagesHeader from "../components/sharedComponents/PagesHeader";
import GroupList from "../components/inventory/productGroup/GroupList";
import AddGroupForm from "../components/inventory/productGroup/AddGroupForm";
import { SwitchProps, setGroupList } from "../../redux/groupList";
import SiteInforForm from "../components/inventory/productGroup/SiteInforForm";
import AddSwitchForm from "../components/inventory/productGroup/AddSwitchForm";
import PortDetails from "../components/inventory/productGroup/PortDetails";
import { useDispatch, useSelector } from "react-redux";
import { getBoxDetailsApi } from "../components/inventory/productGroup/apiCalls/getApiCalls";
import { RootState } from "../../redux/store";
import { getSwitchById } from "./calculations/getSwitchById";
import ChangePassword from "../components/auth/ChangePassword";

const InventoryProductGroup = () =>{
    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState("list");
    const [portDetails, setPortDetails] = useState<SwitchProps>();
    const activeShop = useSelector((state: RootState) => state.activeShop);
    const callApi = useSelector((state: RootState) => state.callApi);

    const onHandlePortDetails = (row: SwitchProps) =>{
        setShowDetails("portdetails");
        setPortDetails(row);
    };

    useEffect(() =>{
        const shop_id = activeShop.shop?.shop_id;

        if(shop_id){
            const data = JSON.stringify({shop_id});
            getBoxDetailsApi(data).then((res) =>{
                if(res.success){
                    dispatch(setGroupList(res.details))
                }
                if(showDetails === "portdetails" && portDetails?.switch_id){
                    const newPortDetails = getSwitchById({details: res.details, switchId: portDetails?.switch_id});
                    newPortDetails ? setPortDetails(newPortDetails) : null;
                    console.log(newPortDetails)
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

export default InventoryProductGroup;
