import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMoveUp } from "react-icons/md";
import { useState, Dispatch, useRef } from "react";
import { PortTypes } from "../../../../redux/groupList";
import { AnyAction } from "@reduxjs/toolkit";
import { customCardStyle } from "./details";
import UpdatePortModal from "../../sharedComponents/UpdatePortModal";
import RelocateClientForm from "../../sharedComponents/RelocateClientModal";
import { Modal } from "bootstrap";

interface PortCardProps {
  id: number;
  port: PortTypes;
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  dispatch: Dispatch<AnyAction>;
}

// trueHost@123456!
const PortCard: React.FC<PortCardProps> = ({id, port, refs, dispatch }) => {
  const relocateModalRef = useRef<HTMLDivElement | null>(null);

  const { description, port_id, port_number, status, client_details } = port;
  const { house_no, phone, username, client_id } = client_details;

  const [currentPortId, setCurrentPortId] = useState(port_id);

  const handleRelocateClick = (port_id: number) =>{
    setCurrentPortId(port_id);
    // if (relocateModalRef.current) {
    //   const relocateModal = new Modal(relocateModalRef.current);
    //   relocateModal.show();
    // }
  }
  // console.log(currentPortId);

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
        className={`bg-white d-flex justify-content-between align-items-center card-footer rounded-bottom `}
      >
        <button disabled={client_id? false: true} data-bs-toggle="modal"
          data-bs-target={`#modalRelocate${port_id}`}
          className="btn py-0 border-0 text-poppins-regular text-danger-emphasis"
            onClick={() => handleRelocateClick(port_id)}>
            Relocate <MdOutlineMoveUp />
        </button>
        <span data-bs-toggle="modal"
          data-bs-target={`#modal${port_id}`}
          className="btn py-0 text-info d-flex align-items-center gap-2" 
            onClick={() => {setCurrentPortId(port_id);}} >
              Edit <FaRegEdit />
        </span>
      </div>

      <UpdatePortModal 
        port={port}
        id={id}
        dispatch={dispatch}
        currentPortId = {currentPortId} 
        setCurrentPortId = {setCurrentPortId}
      />  
      <RelocateClientForm 
        port={port}
        id={id}
        dispatch={dispatch}
        currentPortId = {currentPortId} 
        setCurrentPortId = {setCurrentPortId}
        relocateModalRef={relocateModalRef}
      />  
    </div>
  );
};

export default PortCard;
