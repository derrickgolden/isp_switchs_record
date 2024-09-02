import { useState, useEffect, useRef } from 'react'
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';

import { setCallApi } from '../../../redux/callApi';
import { ExtractedPortDetailsProps } from '../../pages/types';
import { options } from './boxes/details';
import { Status } from '../../../redux/groupList';
import { BeatLoader } from 'react-spinners';
import { updatePortApi } from './boxes/apiCalls/updateApiCalls';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

interface Add_data_modal_Props {
    select_data: ExtractedPortDetailsProps;
    open_update_data_modal: {modal_open: boolean};
    dispatch: Dispatch<AnyAction>;
}

const Add_data_modal: React.FC<Add_data_modal_Props> = ({ select_data, open_update_data_modal, dispatch }) =>{
    // open modal in status
    const [add_data_modal_Show, set_update_data_modal_Show] = useState(false);

    const [currentPortId, setCurrentPortId] = useState(0);
    const { description, port_id, port_number, status, switch_no, building_name, client_details } = select_data;
    const { house_no, phone, username } = client_details;
    // console.log(port);
  
    const [selectedValue, setSelectedValue] = useState(status);
    const [newDescription, setNewDescription] = useState(description || "");
    const [clientDetails, setClientDetails] = useState({username, phone, house_no})
    const [isLoading, setIsLoading] = useState(false);

    // status model show and filter select value 
    useEffect(() => {
        set_update_data_modal_Show(open_update_data_modal.modal_open);
    }, [open_update_data_modal]);

    useEffect(() => {
        setSelectedValue(status);
        setCurrentPortId(port_id);
        setNewDescription(description || "");
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

    const handleClose = () => {
        set_update_data_modal_Show(false);
    };

    const saveNewStatus = () => {
        const data = JSON.stringify({
            status: selectedValue, port_id: currentPortId, description: newDescription, port_number, clientDetails
        });
        setIsLoading(true);
        updatePortApi(data).then((res) =>{
            if(res.success){
                handleClose()
                dispatch(setCallApi(true));
            }
        }).finally(()=>{
            setIsLoading(false);
        });
    };

    return (
        <>
            {/* status update modal */}
            <Modal  show={add_data_modal_Show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Port {port_number}, Switch {switch_no} ({building_name})</Modal.Title>
                </Modal.Header>
                <Modal.Body >
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
                        <label htmlFor={`Textarea1$`} className="form-label">
                        <h5 className="mb-0">Description: </h5>
                        </label>
                        <textarea onChange={handleDescription}
                        className="form-control" value={newDescription} id={`Textarea1$`} rows={3}></textarea>
                    </div>
                    <div className="my-3 col-12">
                        <h5 className="mb-0">Client details: </h5>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-sm' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled ={isLoading} className="btn btn-sm d-flex gap-2 h-100 align-items-center"
                     onClick={saveNewStatus}>
                        <span>Save Changes</span>
                            <span>
                                <BeatLoader 
                                    color="#fff"
                                    loading={isLoading}
                                    cssOverride={{ display: "flex", margin: "0 auto" }}
                                    size={16}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </span>
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Add_data_modal;