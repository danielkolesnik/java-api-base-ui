
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';

// local dependencies
import { Logo } from '../../images';
import Input from '../../components/input';
import { PUBLIC } from '../../actions/types';
import CenteredBox from '../../components/centered-box';
import ErrorMessage from '../../components/alert-error';
import { Spinner, BoxHolder } from '../../components/preloader';
import { SIGN_IN, FORGOT_PASSWORD } from '../../constants/routes';


class ChangePassword extends PureComponent {
    componentDidMount () {
        const { validateToken, match: { params: { token } } } = this.props;
        validateToken({ token });
    }

    render () {
        const { invalidToken, expectAnswer } = this.props;
        return (<CenteredBox style={{ width: '360px', maxWidth: '80%' }}>
            <Row className="align-items-center" style={{ minHeight: '300px', background: '#fff' }}>
                <Col xs="12" className="pt-3 mb-3 text-center">
                    <Logo className="img-fluid" />
                </Col>
                <Col xs={{ size: 10, offset: 1 }}>
                    <BoxHolder active={expectAnswer}>
                        { invalidToken ? (<h4 className="text-justify text-danger">
                            Whoa there! The request token for this page is invalid.
                            It may have already been used, or expired because it is too old.
                            Please go back to the
                            <Link to={FORGOT_PASSWORD.LINK()}> forgot password page </Link>
                            and try again. <small> it was probably just a mistake </small>
                        </h4>) : (<ChangePasswordFormConnected />) }
                    </BoxHolder>
                </Col>
                <Col xs="12" className="text-right mb-3">
                    <Link to={SIGN_IN.LINK()}> Sign in </Link>
                </Col>
            </Row>
        </CenteredBox>);
    }
}

// Check
ChangePassword.propTypes = {
    invalidToken: PropTypes.bool,
    expectAnswer: PropTypes.bool,
    match: PropTypes.object.isRequired,
    validateToken: PropTypes.func.isRequired,
};
// Def
ChangePassword.defaultProps = {
    invalidToken: true,
    expectAnswer: false,
};

export default connect(
    state => ({ ...state.changePassword }),
    dispatch => ({ validateToken: ({ token }) => dispatch({ type: PUBLIC.VALIDATE_PASSWORD_TOKEN.REQUEST, token }) })
)(ChangePassword);

class ChangePasswordForm extends PureComponent {
    render () {
        const { invalid, expectAnswer, handleSubmit, changePassword, errorMessage, clearError } = this.props;
        return (<form name="changePassword" onSubmit={ handleSubmit(changePassword) }>
            <h4 className="text-muted mb-4 text-center">
                Type new password to change password for account
            </h4>
            <div className="mb-2">
                <Field
                    name="password"
                    type="password"
                    component={ Input }
                    placeholder="Password"
                    disabled={ expectAnswer }
                />
            </div>
            <div className="mb-2">
                <Field
                    type="password"
                    component={ Input }
                    name="confirmPassword"
                    disabled={ expectAnswer }
                    placeholder="Confirm password"
                />
            </div>
            <Button block outline color="primary" type="submit" disabled={ invalid || expectAnswer } className="mb-3">
                <span> Change password </span>
                <Spinner active={expectAnswer} />
            </Button>
            <ErrorMessage active title={'Error:'} message={errorMessage} onChange={clearError}/>
        </form>);
    }
}

// Check
ChangePasswordForm.propTypes = {
    invalid: PropTypes.bool,
    expectAnswer: PropTypes.bool,
    errorMessage: PropTypes.string,
    clearError: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
};
// Def
ChangePasswordForm.defaultProps = {
    invalid: false,
    expectAnswer: false,
    errorMessage: null,
};

const ChangePasswordFormConnected = reduxForm({
    form: 'changePassword',
    /**
     * @param { Object } values - named properties of input data
     * @param { Object } meta - information about form status
     * @returns { Object } - named errors
     * @function validate
     * @public
     */
    validate: (values, meta) => {
        const errors = {};
        // PASSWORD
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must contain at least 8 symbol character';
        }
        // CONFIRM PASSWORD
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Password confirmation is required';
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords confirmation do not match with password';
        }
        return errors;
    },
})(connect(
    state => ({ ...state.changePassword }),
    dispatch => ({
        changePassword: ({ password }) => dispatch({ type: PUBLIC.CHANGE_PASSWORD.REQUEST, password }),
        clearError: () => dispatch({ type: PUBLIC.CHANGE_PASSWORD.CLEAR }),
    })
)(ChangePasswordForm));
