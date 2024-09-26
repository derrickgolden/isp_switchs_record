import { useState, useEffect, useRef } from 'react'
import { Modal, Button } from "react-bootstrap";
import { BeatLoader } from 'react-spinners';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { ModalWrapperProps } from './ModalWrapper';

interface ManualModalWrapperProps extends ModalWrapperProps{
    openModal: {render: boolean, open: boolean};
};

const ManualModalWrapper: React.FC<ManualModalWrapperProps> = (props) =>{
    const { title, btnDetails, isLoading, submitHandle, openModal } = props
    // open modal in status
    const [add_data_modal_Show, set_update_data_modal_Show] = useState(false);

    // status model show and filter select value 
    useEffect(() => {
        set_update_data_modal_Show(openModal.open);
    }, [openModal]);

    const handleClose = () => {
        set_update_data_modal_Show(false);
    };

    return (
        <>
            {/* status update modal */}
            <Modal  show={add_data_modal_Show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <form onSubmit={submitHandle} action="#">
                    <Modal.Body >
                        <div className="modal-body main-content">
                            {props.children}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className='btn btn-sm' onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" disabled ={isLoading} 
                        className="btn btn-sm d-flex gap-2 h-100 align-items-center">
                            <span>{btnDetails.confirmText}</span>
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
                </form>
            </Modal>

        </>
    )
};

export default ManualModalWrapper;