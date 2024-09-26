import { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper"
import { relocateClientApi,  } from "../sites/boxes/apiCalls/updateApiCalls";
import { setCallApi } from "../../../redux/callApi";
import { MappedBoxDetails, RelocateClientProps } from "./types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getCurrentBox, mapOnSelectedIds } from "./mappingBoxes";
import ManualModalWrapper from "./ManualModalWrapper";

const RelocateClientForm: React.FC<RelocateClientProps> = ({port, dispatch, openModal, setOpenRelocateModal}) =>{
    const { description, port_id, port_number, status, client_details } = port;
    const { username, house_no, client_id } = client_details;
    // console.log(port)

    const navigate = useNavigate();
    const groupList = useSelector((state: RootState) => state.groupList);
  
    const [relocateDetails, setRelocateDetails] = useState({pre_port_id: port_id,
        site_id: 0, box_id: 0, switch_no: 0, switch_id: 0, port_id: 0, house_no: "", description: "", client_id
    })
    const [mappedBoxDetails, setMappedBoxDetails] = useState<MappedBoxDetails>({site: [], box: [], switches: [], ports: []});
    const [isLoading, setIsLoading] = useState(false);
    const btnClose = useRef<HTMLButtonElement>(null);
  
    useEffect(() => {
        const selectedBox = getCurrentBox(groupList, port_id);
        if(selectedBox.box){
            const { box, switch_no, switch_id } = selectedBox;
            const { site_id, box_id } = box;

            setRelocateDetails({site_id, box_id, switch_no, switch_id, port_id, 
                pre_port_id: port_id, house_no, description, client_id
            });
        }
    }, [status, port_id, description, port]);

    useEffect(() =>{
        const mapBoxDetails = mapOnSelectedIds(groupList, relocateDetails, setRelocateDetails);

        setMappedBoxDetails(mapBoxDetails);
    }, [relocateDetails.site_id, relocateDetails.box_id, relocateDetails.switch_id]);
    
    const handleRelocateDetails = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) =>{
        const name = e.target.id;
        const value = e.target.value;
        setRelocateDetails((obj) => ({...obj, [name]: value}));
    };

    const relocateClient = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const {port_id, house_no, description, client_id, pre_port_id} = relocateDetails;
        
        if(port_id) {
            const data = JSON.stringify({
               port_id, description, pre_port_id, clientDetails: {house_no, client_id, username}
            });
            setIsLoading(true);
            relocateClientApi(data, navigate).then((res) =>{
                if(res.success){
                  setOpenRelocateModal({render: true, open: false});
                  dispatch(setCallApi(true));
                }
            }).finally(()=>{
              setIsLoading(false);
            });
        }else{
            alert("Select port number");
        }
    };

    return(
        <ManualModalWrapper
            targetId={`modalRelocate${port_id}`}
            title = {`Port ${port_number}`}
            btnDetails={{
                confirmText: "Save Changes", 
                confirmColor: "btn-primary", 
                loaderColor: "#fff",
                closeRef: btnClose
            }}
            isLoading = {isLoading}
            submitHandle={relocateClient}
            openModal={openModal}
        >
            <div className="d-flex flex-wrap text-start">
            <h5 className="col-12 mb-0">Relocate: {username}</h5>
            <div className="d-flex flex-wrap col-12 justify-content-between mt-2">
                <div className="form-group mb-3 col-10 col-sm-5">
                    <label htmlFor="site_id">Site Location</label>
                    <select onChange={handleRelocateDetails} value={relocateDetails.site_id}
                        className="form-control" id="site_id" name="site_id" required >
                            <option>-select site-</option>
                            {mappedBoxDetails.site.map((site, i)=>(
                                <option key={i} value={site.site_id} >
                                    {site.site_location}
                                </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3 col-10 col-sm-5">
                    <label htmlFor="box_id">Box Building</label>
                    <select onChange={handleRelocateDetails} value={relocateDetails.box_id}
                        className="form-control" id="box_id" name="box_id" required >
                            <option>-select box-</option>
                            {mappedBoxDetails.box.map((box, i)=>(
                                <option key={i} value={box.box_id} >
                                    {box.building_name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-group mb-3 col-10 col-sm-5">
                    <label htmlFor="switch_id">Switch Number</label>
                    <select onChange={handleRelocateDetails} value={relocateDetails.switch_id}
                        className="form-control" id="switch_id" name="switch_id" required >
                            <option>-select switch-</option>
                            {mappedBoxDetails.switches.map((swit, i)=>(
                                <option key={i} value={swit.switch_id} >
                                    {swit.switch_no}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="form-group mb-3 col-10 col-sm-5">
                    <label htmlFor="port_id">Port Number</label>
                    <select onChange={handleRelocateDetails} value={relocateDetails.port_id}
                        className="form-control" id="port_id" name="port_id" required >
                            <option>-select port-</option>
                            {mappedBoxDetails.ports.map((port, i)=>(
                                <option key={i} value={port.port_id} >
                                    {port.port_number}
                                </option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="col-5">
                <div className="form-floating">
                    <input type="text" onChange={handleRelocateDetails}
                    className="form-control" id="house_no" name="house_no" placeholder="32B" value={relocateDetails.house_no}/>
                    <label htmlFor="house_no">House No</label>
                </div>
            </div>
            <div className="my-3 col-12">
                <label htmlFor="description" className="form-label">
                <h5 className="mb-0">Description: </h5>
                </label>
                <textarea onChange={handleRelocateDetails} name="description"
                className="form-control" value={relocateDetails.description} id="description" rows={3}></textarea>
            </div>
            
            </div>
        </ManualModalWrapper>
    )
}

export default RelocateClientForm;