import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect, Dispatch, useRef } from "react";
import { PortTypes, Status } from "../../../../redux/groupList";
import { updatePortApi } from "./apiCalls/updateApiCalls";
import { setCallApi } from "../../../../redux/callApi";
import { AnyAction } from "@reduxjs/toolkit";
import { customCardStyle, options } from "./details";
import ModalWrapper from "../../sharedComponents/ModalWrapper";

interface PortCardProps {
  id: number;
  port: PortTypes;
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  dispatch: Dispatch<AnyAction>;
}

// trueHost@123456!
const PortCard: React.FC<PortCardProps> = ({id, port, refs, dispatch }) => {
  const { description, port_id, port_number, status, client_details } = port;
  const { house_no, phone, username } = client_details;
  // console.log(port);

  const [selectedValue, setSelectedValue] = useState(status);
  const [currentPortId, setCurrentPortId] = useState(port_id);
  const [newDescription, setNewDescription] = useState(description);
  const [clientDetails, setClientDetails] = useState({username, phone, house_no})
  const [isLoading, setIsLoading] = useState(false);
  const btnClose = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setSelectedValue(status);
    setCurrentPortId(port_id);
    setNewDescription(description);
    setClientDetails({username, phone, house_no});
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
    updatePortApi(data).then((res) =>{
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

  return (
    <div
      ref={(el) => (refs.current[port_number] = el)}
      className={`${customCardStyle[status]?.border} shadow card card-spacer-x-1 bg-light mb-2 text-center 
      col-12 col-sm-5 col-lg-3 border border-2 rounded-4`}
      style={{ boxSizing: 'border-box', height: "content-fit" }}
    >
      <div className={`${customCardStyle[status]?.bg} ${customCardStyle[status]?.border} d-flex border rounded-top`}>
        <div className={` col-6 px-1 pt-2`}>
          <h3 className="card-text text-poppins-bold">
            Port {port_number} &nbsp; <br />
          </h3>
          <p className="text-start fw-bold">
            Status: <br />
            <span className={`${customCardStyle[status]?.text} text-capitalize text-truncate d-inline-block text-primary fw-semibold font-monospace`} 
            style={{ maxWidth: '100%' }}>{status}</span>
          </p>
          <p className=" text-poppins text-start capitalize"
          style={{
            maxHeight: '50px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,  // Adjust the number of lines based on your need
            WebkitBoxOrient: 'vertical'
          }}> {description || "No description" }</p>
        </div>
        <div className="col-6 pt-2 px-1">
          <p className="d-flex flex-wrap justify-content-between fw-semibold">
            Hse No: <span className="text-truncate fw-medium" style={{ maxWidth: '100%' }}>{house_no || "_ _ _"}</span>
          </p>
          <p className="d-flex flex-wrap justify-content-between fw-semibold">
            Username: <span className="text-truncate fw-medium" >{username || "_ _ _"}</span>
          </p>
          <p className="d-flex flex-wrap justify-content-between fw-semibold">
            Phone: <span className="text-truncate fw-medium" style={{ maxWidth: '100%' }}>{phone || "_ _ _"}</span>
          </p>
        </div>
      </div>
      <div
        onClick={() => {
          setCurrentPortId(port_id);
        }}
        data-bs-toggle="modal"
        data-bs-target={`#modal${port_id}`}
        className={`bg-white d-flex justify-content-around align-items-center card-footer rounded-bottom `}
        style={{ cursor: "pointer" }}
      >
        <Link to="#" className="text-poppins-regular">
          PortID: {port_id}
        </Link>
        <span className="text-info d-flex align-items-center gap-2">
          Edit <FaRegEdit />
        </span>
      </div>

      <ModalWrapper
        targetId={`modal${port_id}`}
        title = {`Port ${port_number}`}
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
    </div>
  );
};

export default PortCard;
