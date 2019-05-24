// outsource
import React from 'react';
import {connect} from "react-redux";
import {
    Table,
    DropdownToggle,
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    Button,
    Badge, ButtonGroup
} from 'reactstrap';
import Fa from '../../components/fa-icon';
import 'bootstrap/dist/css/bootstrap.min.css';

// local dependencies
import AlertError from '../../components/alert-error';
import TYPE from "./types";
import MODAL_ACTION_TYPE from "../../components/modal/types";

export default connect(
    state => ({
        ...state.teachers
    }),
    dispatch => ({
        clear: () => dispatch({ type: TYPE.CLEAR }),
        // initialize: () => dispatch({ type: TYPE.INITIALIZE }),
        getList: () => dispatch({ type: TYPE.GET_DATA.REQUEST}),
        updateTeacher: (teacher) => dispatch({type: TYPE.UPDATE.REQUEST, payload: teacher}),
        createTeacher: (teacher) => dispatch({type: TYPE.CREATE.REQUEST, payload: teacher}),
        deleteTeacher: (teacher) => dispatch({type: TYPE.DELETE.REQUEST, payload: teacher}),
        showModal: (modalProps, modalType) => dispatch({type: MODAL_ACTION_TYPE.SHOW_MODAL, payload: {modalType, modalProps}}),
        hideModal: () => dispatch({type: MODAL_ACTION_TYPE.HIDE_MODAL})
    })
)(class Teachers extends React.Component {

    state = {
        dropdowns: [],
    };

    componentWillMount() {
        this.props.getList();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let dropdownStates = {};
        for(let teacher of nextProps.teachers) {
            dropdownStates[teacher.id] = false;
        }
        this.setState({...this.state, dropdowns: dropdownStates});
    }

    toggleDropdown = (id) => {
        const {dropdowns} = this.state;
        dropdowns[id] = !dropdowns[id];
        this.setState({...this.state, dropdowns })
    };

    closeModal = () => {
        this.props.hideModal();
    };

    openUpdateModal = (teacher) => {
        let {firstName, lastName, qualification, email} = teacher;
        this.props.showModal({
            open: true,
            title: 'Update Teacher',
            closeModal: this.closeModal,
            updateData: (values) => {
                let qualificationName = values.qualificationName || qualification.name;
                this.props.updateTeacher({...teacher, ...values, qualificationName});
                this.closeModal();
            },
            centered: true,
            size: 'md',
            initialValues: {firstName, lastName, qualificationName: qualification.name, email}
        }, 'updateTeacher')
    };

    openCreateModal = () => {
        this.props.showModal({
            open: true,
            title: 'Create New Teacher',
            closeModal: this.closeModal,
            updateData: (values) => {
                this.props.createTeacher({...values});
                this.closeModal();
            },
            centered: true,
            size: 'md',
            initialValues: {firstName: '', lastName: '', qualificationName: '', email: ''}
        }, 'updateTeacher')
    };

    openDeleteModal = (teacher) => {
        let {firstName, lastName, qualification} = teacher;
        this.props.showModal({
            open: true,
            title: 'Teacher Deletion',
            message: `Are you sure you want to delete ${firstName + ' ' + lastName}?`,
            closeModal: this.closeModal,
            confirmAction: () => {
                let qualificationName = qualification.name;
                this.props.deleteTeacher({...teacher, qualificationName});
                this.closeModal();
            },
            centered: true,
            size: 'md'
        }, 'confirm')
    };

    openFireModal = (teacher) => {
        let {firstName, lastName, qualification} = teacher;
        this.props.showModal({
            open: true,
            title: 'Teacher Firing',
            message: `Are you sure you want to fire ${firstName + ' ' + lastName}?`,
            closeModal: this.closeModal,
            confirmAction: () => {
                let qualificationName = qualification.name;
                this.props.updateTeacher({...teacher, fired: true, qualificationName});
                this.closeModal();
            },
            centered: true,
            size: 'md'
        }, 'confirm')
    };

    render() {
        const {errorMessage, teachers, clear} = this.props;
        const {dropdowns} = this.state;
        return (
            <div className='container-fluid pt-3' id='teachersPage'>
                <div className="row">
                    <div className="col">
                        <div className="panel d-flex flex-row-reverse">
                            <ButtonGroup>
                                <Button color="success" onClick={this.openCreateModal}>
                                    <Fa tag="span" icon='user-plus'/>
                                    <span className='option-title'>Add</span>
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Table className="teachers" bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Qualification</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                teachers.map((teacher, i) => {
                                    const {id, email, fullName, qualification, qualificationExpired, fired} = teacher;
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{id}</th>
                                            <td className='position-relative'>
                                                {fullName}
                                            {
                                                fired?
                                                    <Badge color="danger" pill>Fired</Badge>
                                                :
                                                    null
                                            }
                                            </td>
                                            <td>{email}</td>
                                            <td className='position-relative'>
                                                {qualification.name}
                                            {
                                                qualificationExpired?
                                                    <Badge color="danger" pill>Expired</Badge>
                                                    :
                                                    null
                                            }
                                            </td>
                                            <th className='options'>
                                                <ButtonDropdown direction="left" isOpen={dropdowns[id]} toggle={(e)=>this.toggleDropdown(id)}>
                                                    <DropdownToggle caret color="info">
                                                        <Fa tag="span" icon='user-cog'/>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={()=>this.openUpdateModal(teacher)} toggle={false}>
                                                            <Fa tag="span" icon='user-edit'/>
                                                            <span className='option-title'>Update</span>
                                                        </DropdownItem>
                                                        <DropdownItem divider/>
                                                        <DropdownItem onClick={()=>this.openDeleteModal(teacher)} toggle={false}>
                                                            <Fa tag="span" icon='user-slash'/>
                                                            <span className='option-title'>Delete</span>
                                                        </DropdownItem>
                                                        <DropdownItem divider/>
                                                        <DropdownItem onClick={()=>this.openFireModal(teacher)} toggle={false}>
                                                            <Fa tag="span" icon='user-minus'/>
                                                            <span className='option-title'>Fire</span>
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </ButtonDropdown>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <AlertError active title={'Error:'} message={errorMessage} onChange={clear}/>
            </div>
        )
    }
});

// Teachers
