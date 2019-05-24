// outsource
import React from 'react'
import {ModalHeader, ModalFooter, ModalBody, Button} from "reactstrap";

const ConfirmModal = ({ closeModal, confirmAction, title, message }) => {
    return [
        <ModalHeader key='header' toggle={closeModal}>{title}</ModalHeader>,
        <ModalBody key='body'>
            <p>{message}</p>
        </ModalBody>,
        <ModalFooter key='footer' className='d-flex justify-content-between'>
            <Button color='danger' onClick={closeModal}>Cancel</Button>
            <Button color='success' onClick={confirmAction}>Continue</Button>
        </ModalFooter>
    ]
};

export default ConfirmModal
