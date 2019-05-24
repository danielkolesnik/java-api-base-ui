// outsource
import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';

// local dependencies
import { default as modalTypes, MODAL_TYPES } from './modals';

class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            this.setState({
                ...this.state,
                modalIsOpen: nextProps.modalProps.open
            })
        }
    }

    closeModal() {
        this.setState({...this.state, modalIsOpen: false});
    }

    render() {
        const {modalType, modalProps} = this.props;
        const {modalIsOpen} = this.state;

        if(!modalType) {
            return null;
        }
        const SpecifiedModal = MODAL_TYPES[modalType];
        let size = modalProps.size || 'lg';
        let centered = modalProps.centered || false;
        return (
            <Modal
                isOpen={modalIsOpen}
                toggle={this.closeModal}
                size = {size}
                centered = {centered}
            >
                <SpecifiedModal
                    closeModal={this.closeModal}
                    {...modalProps}
                />
            </Modal>
        )
    }
}

export default connect(
    state => ({
        ...state.modal
    }),
    null
)(ModalContainer)
