
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import React, { Component, PureComponent } from 'react';
import { Panel, Row, Col, Button } from 'react-bootstrap';

// local dependencies
import { EDIT } from '../types';
import { historyPush } from '../../../store';
import Radio from '../../../components/radio';
import Input from '../../../components/input';
import { USERS } from '../../../constants/routes';
import Textarea from '../../../components/textarea';
import Alert from '../../../components/alert-error';
import Checkbox from '../../../components/checkbox';
import Preloader from '../../../components/preloader';
import HtmlEditor from '../../../components/html-editor';
import { SelectAsync } from '../../../components/select';
import { instanceAPI } from '../../../services/api.service';
import { PERMISSION, NEW_ID } from '../../../constants/spec';
import { AllowedBtn } from '../../../components/allowed-action';
import InputDateTime from '../../../components/input-date-time';


// configure
const GENDER = [
    { label: (<strong> <i className="fa fa-mars-stroke-v" aria-hidden="true"> </i> Male </strong>), value: 'MALE' },
    { label: (<strong> <i className="fa fa-venus" aria-hidden="true"> </i> Female </strong>), value: 'FEMALE' },
];

class UserEdit extends Component {
    componentWillUnmount () { this.props.clear(); }

    componentDidMount () { this.props.init(this.props.match.params.id); }

    isNew = () => this.props.match.params.id === NEW_ID;

    render () {
        const {
            handleSubmit, invalid, pristine,
            updateData, disabled, expectInit, errorMessage, clearError
        } = this.props;
        return (<Preloader type="MIN_HEIGHT" height={500} active={!expectInit}>
            <form autoComplete="off" name="userEditForm" onSubmit={ handleSubmit(updateData) }>
                <Row className="top-indent-6">
                    <Col xs={10} xsOffset={1}>
                        <FormButtons
                            invalid={invalid}
                            pristine={pristine}
                            disabled={disabled}
                            isNew={this.isNew()}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={8} xsOffset={2}>
                        <Alert active message={errorMessage} onChange={clearError} />
                    </Col>
                </Row>
                <Row> <Col xs={12} lg={10} lgOffset={1}> <Panel>
                    <Panel.Heading className="text-center"> User information </Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <Col xs={7}>
                                <Row className="offset-bottom-4">
                                    <Col xs={12}>
                                        <Field
                                            name="name"
                                            component={Input}
                                            placeholder="name"
                                            disabled={disabled}
                                            label={ <strong className="required-asterisk"> User name </strong> }
                                        />
                                    </Col>
                                </Row>
                                <Row className="offset-bottom-4">
                                    <Col xs={12}>
                                        <Field
                                            name="email"
                                            component={Input}
                                            placeholder="email"
                                            disabled={disabled}
                                            label={ <strong className="required-asterisk"> Email </strong> }
                                        />
                                    </Col>
                                </Row>
                                <Row className="offset-bottom-4">
                                    <Col xs={12}>
                                        <Field
                                            name="phone"
                                            component={Input}
                                            placeholder="phone"
                                            disabled={disabled}
                                            label={<strong> Phone number </strong>}
                                        />
                                    </Col>
                                </Row>
                                <Row className="offset-bottom-4">
                                    <Col xs={8}>
                                        <Field
                                            name="birthday"
                                            disabled={disabled}
                                            timeFormat={false}
                                            dateFormat="DD/MM/YYYY"
                                            component={InputDateTime}
                                            label={<strong> Date </strong>}
                                        />
                                    </Col>
                                </Row>
                                <Row className="offset-bottom-4">
                                    <Col xs={6}>
                                        <Field
                                            valueKey="id"
                                            labelKey="name"
                                            name="country"
                                            disabled={disabled}
                                            component={SelectAsync}
                                            placeholder="Select country"
                                            label={<strong> Country </strong>}
                                            getList={(name, done) => {
                                                instanceAPI({
                                                    data: { name },
                                                    method: 'post',
                                                    params: { size: 5, page: 0 },
                                                    url: 'countries/simple/filter/',
                                                }).then(({ content }) => done(content)).catch(() => done([]));
                                            }}/>
                                    </Col>
                                    <Col xs={6}>
                                        <Field
                                            valueKey="id"
                                            labelKey="name"
                                            name="city"
                                            disabled={disabled}
                                            component={SelectAsync}
                                            placeholder="Select city"
                                            label={<strong> City </strong>}
                                            getList={(name, done) => {
                                                instanceAPI({
                                                    data: { name },
                                                    method: 'post',
                                                    params: { size: 5, page: 0 },
                                                    url: 'cities/simple/filter/',
                                                }).then(({ content }) => done(content)).catch(() => done([]));
                                            }}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={5}>
                                <Row>
                                    <Col xs={12} className="offset-bottom-4">
                                        <Field
                                            inline={true}
                                            name="gender"
                                            list={GENDER}
                                            component={Radio}
                                            label={ <strong> Gender </strong> }
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="offset-bottom-4">
                                        Avatar
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="offset-bottom-4">
                                        <Field
                                            name="testDescription"
                                            disabled={disabled}
                                            component={Textarea}
                                            placeholder="testDescription"
                                            label={ <strong> testDescription </strong> }
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className="offset-bottom-4">
                                        <Field
                                            skipTouch
                                            name="testTime"
                                            disabled={disabled}
                                            timeFormat="HH:mm:ss"
                                            dateFormat={false}
                                            component={InputDateTime}
                                            label={<strong> testTime </strong>}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <Field
                                            skipTouch
                                            name="testCheckbox"
                                            disabled={disabled}
                                            component={Checkbox}
                                            label={<strong> testCheckbox </strong>}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Field
                                    skipTouch
                                    name="testHtmlEditor"
                                    disabled={disabled}
                                    component={HtmlEditor}
                                    label={<strong> testHtmlEditor </strong>}
                                />
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel> </Col> </Row>
            </form>
        </Preloader>);
    }
}
// Check
UserEdit.propTypes = {
    invalid: PropTypes.bool,
    disabled: PropTypes.bool,
    pristine: PropTypes.bool,
    expectInit: PropTypes.bool,
    errorMessage: PropTypes.string,
    match: PropTypes.object.isRequired,
    init: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};
// Def
UserEdit.defaultProps = {
    disabled: true,
    invalid: false,
    pristine: false,
    expectInit: true,
    errorMessage: null,
};
// Export
export default connect(
    state => ({
        initialValues: state.users.edit.data,
        expectInit: state.users.edit.initialized,
        disabled: state.users.edit.expectAnswer,
        errorMessage: state.users.edit.errorMessage,
    }),
    dispatch => ({
        clear: () => dispatch({ type: EDIT.CLEAR }),
        init: id => dispatch({ type: EDIT.INITIALIZE, id }),
        clearError: () => dispatch({ type: EDIT.META, errorMessage: '' }),
        updateData: formData => dispatch({ type: EDIT.UPDATE_DATA, ...formData }),
    })
)(reduxForm({
    form: 'userEditForm',
    enableReinitialize: true,
    validate: values => {
        const errors = {};
        // name
        if (!values.name) {
            errors.name = 'Name is required.';
        } else if (values.name.length < 3) {
            errors.name = 'Name must contain at least 3 symbols character.';
        }
        // email
        if (!values.email) {
            errors.email = 'Email is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address.';
        }
        // roles
        if (!values.roles || !values.roles.length) {
            errors.roles = 'User role is required.';
        }
        // gender
        if (!values.gender) {
            errors.gender = 'User gender is required.';
        }
        // testDescription
        if (!values.testDescription) {
            errors.testDescription = 'test testDescription';
        }
        // testTime
        if (!values.testTime) {
            errors.testTime = 'test testTime';
        }
        // testCheckbox
        if (!values.testCheckbox) {
            errors.testCheckbox = 'test testCheckbox';
        }
        // testHtmlEditor
        // NOTE even empty html content contain at least "<p></p>"
        if (!values.testHtmlEditor) {
            errors.testHtmlEditor = 'test testHtmlEditor';
        }
        return errors;
    },
})(UserEdit));

class FormButtons extends PureComponent {
    render () {
        const { disabled, invalid, pristine, isNew } = this.props;
        return (<Row className="offset-bottom-4">
            <Col xs={3}>
                <Button block bsStyle="warning" disabled={disabled} onClick={() => historyPush(USERS.LINK())}>
                    <i className="fa fa-fast-backward" aria-hidden="true"> </i>&nbsp;Back to list
                </Button>
            </Col>
            <Col xs={3}> {/* Empty */} </Col>
            <Col xs={3}> {/* Empty */} </Col>
            <Col xs={3}>
                <AllowedBtn
                    block={true}
                    type="submit"
                    action={PERMISSION.USER.UPDATE}
                    disabled={pristine || invalid || disabled}
                >
                    { isNew
                        ? (<span> <i className="fa fa-plus" aria-hidden="true"> </i>&nbsp;Create </span>)
                        : (<span> <i className="fa fa-floppy-o" aria-hidden="true"> </i>&nbsp;Update </span>)
                    }
                    <Preloader type="ICON" active={disabled} />
                </AllowedBtn>
            </Col>
        </Row>);
    }
}
// Check
FormButtons.propTypes = {
    isNew: PropTypes.bool,
    disabled: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
};
// Def
FormButtons.defaultProps = {
    isNew: true,
    disabled: true,
    invalid: false,
    pristine: false,
};
