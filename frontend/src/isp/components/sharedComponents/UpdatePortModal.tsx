import { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper"
import { updatePortApi } from "../sites/boxes/apiCalls/updateApiCalls";
import { BoxDetailsProps, Status } from "../../../redux/groupList";
import { setCallApi } from "../../../redux/callApi";
import { options } from "../sites/boxes/details";
import { UpdatePortModalProps } from "./types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getCurrentBox } from "./mappingBoxes";

const UpdatePortModal: React.FC<UpdatePortModalProps> = ({port, id, dispatch, currentPortId, setCurrentPortId}) =>{
// console.log(port)
    const { description, port_id, port_number, status, client_details } = port;
    const { house_no, phone, username } = client_details;
    const navigate = useNavigate();
  
    const [selectedValue, setSelectedValue] = useState(status);
    const [newDescription, setNewDescription] = useState(description || "");
    const [clientDetails, setClientDetails] = useState({username, phone, house_no});
    const [currentBox, setCurrentBox] = useState({switch_no: 0, building: ""})
    const [isLoading, setIsLoading] = useState(false);
    const btnClose = useRef<HTMLButtonElement>(null);
    const groupList = useSelector((state: RootState) => state.groupList);
  
    useEffect(() => {
      setSelectedValue(status);
      setCurrentPortId(port_id);
      setNewDescription(description || "");
      setClientDetails({username, phone, house_no});

      const selectedBox = getCurrentBox(groupList, port_id);
      setCurrentBox(selectedBox);
      // console.log(port)
    }, [status, port_id, description]);
    
  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Status; // Cast the value to the Status type
    setSelectedValue(value);
  };
  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(event.target.value);
  };
  const handleClientDetails = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const name = e.target.id
    const value = e.target.value
    setClientDetails((obj) => ({...obj, [name]: value}));
  }

    const saveNewStatus = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const data = JSON.stringify({
          status: selectedValue, port_id: currentPortId, description: newDescription, port_number, clientDetails
        });
        setIsLoading(true);
        updatePortApi(data, navigate).then((res) =>{
            if(res.success){
              if (btnClose.current) {
                btnClose.current.click();
              }
              dispatch(setCallApi(true));
            }
        }).finally(()=>{
          setIsLoading(false);
        });
      };

    return(
        <ModalWrapper
            targetId={`modal${port_id}`}
            title = {`Port ${port_number}, Switch ${currentBox.switch_no}(${currentBox.building})`}
            btnDetails={{
                confirmText: "Save Changes", 
                confirmColor: "btn-primary", 
                loaderColor: "#fff",
                closeRef: btnClose
            }}
            isLoading = {isLoading}
            submitHandle={saveNewStatus}
        >
            <div className="d-flex flex-wrap text-start">
            <h5 className="col-12 mb-0">Status: </h5>
            {options.map((option, index) => (
                <div className="form-check col-6" key={index}>
                <input
                    className="form-check-input"
                    type="radio"
                    id={`${option.id}${port_id}`}
                    name={`status${port_id}`}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={handleStatus}
                />
                <label className="form-check-label" htmlFor={`${option.id}${port_id}`}>
                    {option.label}
                </label>
                <br />
                </div>
            ))}
            <div className="my-3 col-12">
                <label htmlFor={`Textarea1${id}`} className="form-label">
                <h5 className="mb-0">Description: </h5>
                </label>
                <textarea onChange={handleDescription}
                className="form-control" value={newDescription} id={`Textarea1${id}`} rows={3}></textarea>
            </div>
            <div className="my-3 col-12">
                <label htmlFor={`Textarea1${id}`} className="form-label">
                <h5 className="mb-0">Client details: </h5>
                </label>
                <div className="d-flex flex-wrap gap-3 justify-content-between">
                <div className="col-12">
                    <div className="form-floating">
                    <input type="text" onChange={handleClientDetails}
                    className="form-control" id="username" placeholder="John" value={clientDetails.username}/>
                    <label htmlFor="username">Username</label>
                    </div>
                </div>
                <div className="col-5">
                    <div className="form-floating">
                    <input type="text" onChange={handleClientDetails}
                    className="form-control" id="house_no" placeholder="32B" value={clientDetails.house_no}/>
                    <label htmlFor="house_no">House No</label>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-floating">
                    <input type="number" onChange={handleClientDetails}
                    className="form-control" id="phone" placeholder="0714475702" value={clientDetails.phone}/>
                    <label htmlFor="phone">Phone</label>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </ModalWrapper>
    )
}

export default UpdatePortModal;