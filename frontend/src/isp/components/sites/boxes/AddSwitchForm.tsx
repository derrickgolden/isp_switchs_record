import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Swal from "sweetalert2";
import { addSwitchApi } from "../boxes/apiCalls/postApiCalls";
import { setCallApi } from "../../../../redux/callApi";
import { useNavigate } from "react-router-dom";

interface AddProductFormProps{
    setShowDetails: (showDetails: string) => void
}

const AddSwitchForm: React.FC<AddProductFormProps> = ({ setShowDetails}) =>{
    const [isLoading, setIsLoading] = useState(false)
    const groupList = useSelector((state: RootState) => state.groupList)
    const activeShop = useSelector((state: RootState) => state.activeShop);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [switchDetails, setSwitchDetails] = useState({
        switch_no: '', total_ports: "", box_id: "", description: ""
    })
    // const [pricingDetails, setPricingDetails] = useState({price: '', package_cost: '', package_size: ''});
    const [selectRows, setSelectRows] = useState(3);   

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const name = e.target.name;
        const value = e.target.value;
  
        setSwitchDetails((obj) =>({...obj, [name]: value}))
    }

    const handleAddProductSubmit: React.FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault()

        const [group] = groupList.filter(group => 
            group.box_id === Number(switchDetails.box_id)
        )

        if(!group){
            Swal.fire({
                title: "Select the building where the box is located."
            })
        }else{
            const data = JSON.stringify(switchDetails);
            
            if( activeShop.shop ){
                setIsLoading(true);
                addSwitchApi(data, navigate).then((res) =>{
                    if(res.success){
                        setShowDetails("list");
                        dispatch(setCallApi(true));
                    }
                }).finally(()=>{
                    setIsLoading(false);
                })
            }
        }
    }

    return(
        <div className="px-3 px-md-5">
            <h3 className="text-warning">Add New switch information</h3>
            <form onSubmit={handleAddProductSubmit} encType="multipart/form-data"
            className="col-sm-10"> 
                <div className="d-flex flex-wrap justify-content-between align-items-center ">
                    <div className="form-group mb-3 col-10 col-sm-5">
                        <label htmlFor="exampleFormControlInput1">Switch Number</label>
                        <input onChange={handleFormInput} value={switchDetails.switch_no}
                        type="number" className="form-control" id="productname" name="switch_no"
                         placeholder="1" required/>
                    </div>
                    <div className="form-group mb-3 col-10 col-sm-5">
                        <label htmlFor="exampleFormControlInput1">Number of Ports</label>
                        <input onChange={handleFormInput} value={switchDetails.total_ports}
                        type="number" className="form-control" id="productid" placeholder="8"
                        name="total_ports" required/>
                    </div>
                    <div className="form-group mb-3 col-10 col-sm-5">
                        <label htmlFor="exampleFormControlSelect1">Box Building</label>
                        <select onChange={handleFormInput} value={switchDetails.box_id}
                        className="form-control" id="exampleFormControlSelect1" name="box_id" required >
                            <option>-select group-</option>
                            {groupList.map((box, i)=>(
                                <option key={i} value={box.box_id} >
                                    {box.building_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div> 

                {/* <PricingDetailsCard 
                    handlePricingInput={handlePricingInput} 
                    pricingDetails= {pricingDetails}
                /> */}

                <div className="form-group mb-3 ">
                    <label htmlFor="exampleFormControlTextarea1">Information(optional)</label>
                    <textarea onChange={handleFormInput} value={switchDetails.description}
                    className="form-control" id="exampleFormControlTextarea1" name="description"
                        aria-required rows={selectRows}></textarea>
                </div>
                
                <div className="bg-white d-flex align-items-center justify-content-between " >
                    <button type="submit" disabled ={isLoading} 
                    className="btn btn-outline-danger d-flex gap-2 h-100 align-items-center">
                        <span>Submit</span>
                        <span>
                            <BeatLoader 
                                color="#dc3545"
                                loading={isLoading}
                                cssOverride={{ display: "flex", margin: "0 auto" }}
                                size={16}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </span>
                    </button>
                    <button onClick={() => setShowDetails("list")}
                        type="button" className="btn btn-primary text-white">
                            Cancel
                    </button>
                </div> 
            </form>
        </div>
    )
}

export default AddSwitchForm;