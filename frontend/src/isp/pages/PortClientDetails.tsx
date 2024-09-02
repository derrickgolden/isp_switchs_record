
import { useState } from "react";

import PagesHeader from "../components/sharedComponents/PagesHeader";
import Swal from "sweetalert2";
import { ExtractedPortDetailsProps } from "./types";
import { useDispatch } from "react-redux";
import PortList from "../components/sites/PortList";
import { Product } from "../components/sites/types";

const PortClientDetails = () =>{
    const dispatch = useDispatch();
    const [showDetails, setShowDetails] = useState("list")
    const [portDetails, setPortDetails] = useState<ExtractedPortDetailsProps>()

    const handleActionDetails = (row: ExtractedPortDetailsProps) =>{
        setPortDetails(row);
        setShowDetails("portdetails");
    }
   
    const handleUpdateStock = (row: Product) =>{       
        Swal.fire({
            title: `Do you want to update stock for ${row.product_name}?`,
            inputLabel: "New stock number(will be added to previous stock)",
            input: "number",
            showCancelButton: true,
            confirmButtonText: "Save",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
                }
        });
    }

    return(
        <div className='body2 bg-white pb-5'>
            <PagesHeader 
                setShowDetails ={setShowDetails}
                btnInfo ={{text: "Client", navigate: "addproduc", details: "product"}}
            />
            {showDetails === "list" && 
                <PortList
                    onHandleActionDetails = {handleActionDetails} 
                    onHandleUpdateStock = {handleUpdateStock}
                />}
            {/* {showDetails === "portdetails" && 
                <PortDetails
                    portDetails={portDetails}
                    setShowDetails ={setShowDetails}
                    dispatch = {dispatch}
                />
            } */}
        </div>
    )
}

export default PortClientDetails;