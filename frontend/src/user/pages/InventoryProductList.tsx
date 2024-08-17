
import { useState } from "react";

import ProductDetails from "../components/inventory/ProductDetails";
import ProductList from "../components/inventory/ProductList";
import PagesHeader from "../components/sharedComponents/PagesHeader";
import { Product } from "../components/inventory/types";
import AddProductForm from "../components/inventory/AddProductForm";
import Swal from "sweetalert2";
import PortDetails from "../components/inventory/productGroup/PortDetails";
import { ExtractedPortDetailsProps } from "./types";
import { useDispatch } from "react-redux";

const InventoryProductList = () =>{
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
                <ProductList
                    onHandleActionDetails = {handleActionDetails} 
                    onHandleUpdateStock = {handleUpdateStock}
                />}
            {showDetails === "portdetails" && 
                <PortDetails
                    portDetails={portDetails}
                    setShowDetails ={setShowDetails}
                    dispatch = {dispatch}
                />
            }
            {showDetails === "addproduct" && 
                <AddProductForm
                    setShowDetails = {setShowDetails}
                 />}
        </div>
    )
}

export default InventoryProductList;