
import { useState } from "react";
import PagesHeader from "../components/sharedComponents/PagesHeader";
import GroupList from "../components/inventory/productGroup/GroupList";
import GroupProductDetails from "../components/inventory/productGroup/GroupProductDetails";
import AddGroupForm from "../components/inventory/productGroup/AddGroupForm";
import { BoxDetailsProps, SwitchProps } from "../../redux/groupList";
import SiteInforForm from "../components/inventory/productGroup/SiteInforForm";
import AddSwitchForm from "../components/inventory/productGroup/AddSwitchForm";
import PortDetails from "../components/inventory/productGroup/PortDetails";

const InventoryProductGroup = () =>{
    const [showDetails, setShowDetails] = useState("list");
    const [productDetails, setProductDetails] = useState<BoxDetailsProps>();

    const handleActionDetails = (row: BoxDetailsProps) =>{
        setProductDetails(row);
        setShowDetails("details");
    };
    const onHandlePortDetails = (row: SwitchProps) =>{
        setShowDetails("portdetails")
    }
  
    return(
        <div className='body2 bg-white pb-5' style={{paddingTop: "2rem"}}>
            <PagesHeader 
                setShowDetails ={setShowDetails}
                btnInfo = {{text: "Box", navigate: "addgroup", details: "group"}}
            />
            {showDetails === "list" && 
                <GroupList 
                    onHandleActionDetails = {handleActionDetails}
                    onHandlePortDetails={onHandlePortDetails}
                />
            }
            {showDetails === "details" && productDetails &&
                <GroupProductDetails 
                    productDetails = {productDetails}
                    onHandleActionDetails = {handleActionDetails}
                    setShowDetails={setShowDetails}
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
                    setShowDetails ={setShowDetails}
                />
            }
        </div>
    )
}

export default InventoryProductGroup;