// outsource
import React from 'react'
import {ModalHeader, ModalFooter, ModalBody, Button, Input, Container, FormGroup} from "reactstrap";
import {Col, Row} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import InputS from "../../input";
import {instanceAPI} from "../../../services/api.service";

// local dependencies


const Select = ({label, input, meta, children, ...props}) => {
    let {dirty, valid, ...rest} = meta;
    return (
        <FormGroup>
            { !label ? '' : (<label htmlFor={input.name}> { label } </label>) }
            <Input type="select" name="select" {...input} {...props} valid={dirty&&valid}>
                {children}
            </Input>
        </FormGroup>
    )
};

class UpdateTeacher extends React.Component {

    state = {
        qualifications: []
    };

    componentDidMount() {
        instanceAPI({method: 'get', url: 'qualifications/'})
            .then((data) => {
                this.setState({...this.state, qualifications: data});
            })
            .catch(() => {});
    }

    render () {
        const { closeModal, title, handleSubmit, updateData, initialValues } = this.props;
        const { qualifications } = this.state;
        initialValues.qualificationName = initialValues.qualificationName || "TEACHER";
        return [
            <ModalHeader key='header' toggle={closeModal}>{title}</ModalHeader>,
            <ModalBody key='body'>
                <form autoComplete="off" name="teacherEditForm" onSubmit={handleSubmit(updateData)}>
                    <Container>
                        <Row>
                            <Col xs={12} md={12} className='mb-2'>
                                <Field
                                    name="firstName"
                                    component={InputS}
                                    placeholder="First name"
                                    disabled={false}
                                    label={ <strong className="required-asterisk"> First name </strong> }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} className='mb-2'>
                                <Field
                                    name="lastName"
                                    component={InputS}
                                    placeholder="Last name"
                                    disabled={false}
                                    label={ <strong className="required-asterisk"> Last name </strong> }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} className='mb-2'>
                                <Field
                                    name="email"
                                    component={InputS}
                                    placeholder="email"
                                    disabled={false}
                                    label={ <strong className="required-asterisk"> Email </strong> }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} className='mb-2'>
                                <Field
                                    component={Select}
                                    disabled={false}
                                    type='select'
                                    name='qualificationName'
                                    label={ <strong className="required-asterisk"> Qualification </strong> }
                                >
                                    {
                                        this.state.qualifications.map((qualification,i)=>{
                                            return (
                                                <option value={qualification.name} key={i}>{qualification.name}</option>
                                            )
                                        })
                                    }
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12} className='d-flex justify-content-between'>
                                <Button color='danger' onClick={closeModal}>Cancel</Button>
                                <Button type='submit' color='success'>Accept</Button>
                            </Col>
                        </Row>
                    </Container>
                </form>
            </ModalBody>
        ]
    }

}

export default reduxForm({
    form: 'teacherEditForm',
    enableReinitialize: true,
    validate: values => {
        const errors = {};
        // name
        if (!values.firstName) {
            errors.firstName = 'Name is required.';
        } else if (values.firstName.length < 3) {
            errors.firstName = 'Name must contain at least 3 symbols character.';
        }
        // last name
        if (!values.lastName) {
            errors.lastName = 'Last Name is required.';
        } else if (values.lastName.length < 3) {
            errors.lastName = 'Last Name must contain at least 3 symbols character.';
        }
        // email
        if (!values.email) {
            errors.email = 'Email is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address.';
        }
        console.log('VALUE', values.qualificationName);
        return errors;
    }
})(UpdateTeacher);
