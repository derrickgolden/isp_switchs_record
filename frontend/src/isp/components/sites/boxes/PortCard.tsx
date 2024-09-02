import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useState, useEffect, Dispatch, useRef } from "react";
import { PortTypes, Status } from "../../../../redux/groupList";
import { updatePortApi } from "./apiCalls/updateApiCalls";
import { setCallApi } from "../../../../redux/callApi";
import { AnyAction } from "@reduxjs/toolkit";
import { customCardStyle, options } from "./details";
import UpdatePortModal from "../../sharedComponents/UpdatePortModal";

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

  const [currentPortId, setCurrentPortId] = useState(port_id);

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

      <UpdatePortModal 
        port={port}
        id={id}
        dispatch={dispatch}
        currentPortId = {currentPortId} 
        setCurrentPortId = {setCurrentPortId}
      />  
    </div>
  );
};

export default PortCard;
