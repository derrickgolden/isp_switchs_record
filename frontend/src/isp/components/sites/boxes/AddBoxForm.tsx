import React, { useEffect, useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../../../controllers/getSessionStorage";
import Swal from "sweetalert2";
import { addBoxApi } from "./apiCalls/postApiCalls";
import { getSiteDetailsApi } from "./apiCalls/getApiCalls";
import { SiteListProps } from "./types";
import { setCallApi } from "../../../../redux/callApi";
import { useDispatch } from "react-redux";

interface AddGroupFormProps{
    setShowDetails: (showDetails: string) => void;
}
const AddGroupForm: React.FC<AddGroupFormProps> = ({ setShowDetails}) =>{
    const dispatch = useDispatch();
    
    const [isLoading, setIsLoading] = useState(false);
    const [siteList, setSiteList] = useState<SiteListProps[]>([]);
    const [groupDetails, setGroupDetails] = useState({
        site_id: '0', building_name: "", description: ""
    });
    const [selectRows, setSelectRows] = useState(3);

    const userShop = getSessionStorage();
    const { localShop } = userShop;
    // console.log(localShop);
    useEffect(() =>{
        if(localShop?.shop_name){
            const {shop_id} = localShop;
            setGroupDetails((obj) =>({...obj, shop_id}));

            const data = JSON.stringify({shop_id});
            getSiteDetailsApi(data).then((res) =>{
                if(res.success){
                    setSiteList(res.details);
                }
            })
        }else{
            Swal.fire({
                title: "Select Shop",
                text: "Select the company you want to add the box to first.",
                icon: "warning"
            });
        }
    }, []);

    const handleFormInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const name = e.target.name;
        const value = e.target.value;  
        setGroupDetails((obj) =>({...obj, [name]: value}))
    }

    const handleAddGroupSubmit: React.FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault()
        if(groupDetails.site_id !== '0'){
            setIsLoading(true);
            const data = JSON.stringify(groupDetails);

            addBoxApi(data).then((res) =>{
                if(res.success){
                    setShowDetails("list");
                    dispatch(setCallApi(true));
                }
            }).finally(()=>{
                setIsLoading(false);
            }) 
        }else{
            Swal.fire("Select box location");
        }
    }

    return(
        <div className="px-5">
            <h3>Add New box for <span className="text-warning">{localShop?.shop_name}</span></h3>
            <form onSubmit={handleAddGroupSubmit}
            className="col-sm-10"> 
                <div className="d-flex flex-wrap justify-content-between align-items-center ">
                    <label htmlFor="form-select">Site Location</label>
                    <select className="form-select mb-3 col-sm-5" aria-label="Default select example"
                    defaultValue={groupDetails.site_id} onChange={handleFormInput} name="site_id" required>
                        <option value={0}>Select box location</option>
                        {siteList.map((site, i) =>(
                            <option key={i} value={site.site_id} >
                                {site.site_location}
                            </option>
                        ))}   
                    </select>
                    <div className="form-group mb-3 col-sm-5">
                        <label htmlFor="exampleFormControlInput1 p-4">Building Name</label>
                        <input onChange={handleFormInput} value={groupDetails.building_name}
                        type="text" className="form-control" id="building_name" name="building_name"
                         placeholder="Redsky" required/>
                    </div>
                </div>  
                
                <div className="form-group mb-3 ">
                    <label htmlFor="exampleFormControlTextarea1 p-4">Description</label>
                    <textarea onChange={handleFormInput} value={groupDetails.description}
                    className="form-control" id="exampleFormControlTextarea1" required name="description"
                        aria-required rows={selectRows} ></textarea>
                </div>
                <div className="bg-white d-flex align-items-center justify-content-between " >
                    <button type="submit" disabled ={isLoading} 
                    className="btn btn-outline-danger d-flex gap-2 align-items-center">
                    <span>Submit</span>
                    <span>
                        <BeatLoader 
                            color="#dc3545"
                            loading={isLoading}
                            cssOverride={{
                                display: "flex",
                                margin: "0 auto"
                            }}
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

export default AddGroupForm;