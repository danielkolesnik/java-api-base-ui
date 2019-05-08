
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';

// local dependencies
import { APP } from '../../actions/types';
import Input from '../../components/input';
import { Logo, LoginPageImage } from '../../images';
import { Spinner } from '../../components/preloader';
import ErrorMessage from '../../components/alert-error';
import CenteredBox from '../../components/centered-box';
import { FORGOT_PASSWORD, SIGN_UP } from '../../constants/routes';

/**
 * Sign In page
 *
 */
export default function () {
    return (<CenteredBox style={{ width: '640px', maxWidth: '80%' }}>
        <Row style={{ background: '#fff' }}>
            <Col xs="12" md="6">
                <Row className="align-items-center" style={{ minHeight: '430px' }}>
                    <Col xs="12" className="pt-5 mb-5 text-center">
                        <Logo className="img-fluid" />
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}>
                        <SignInFormConnected />
                    </Col>
                    <Col xs="6" className="mb-3">
                        <Link to={SIGN_UP.LINK()}> Request to join </Link>
                    </Col>
                    <Col xs="6" className="text-right mb-3">
                        <Link to={FORGOT_PASSWORD.LINK()}> Forgot password </Link>
                    </Col>
                </Row>
            </Col>
            <Col xs="6" className="d-none d-md-block" style={{ padding: 0 }}>
                <LoginPageImage className="img-fluid" />
            </Col>
        </Row>
    </CenteredBox>);
}

/**
 * Sign In form
 *
 */
class SignInForm extends PureComponent {
    render () {
        const { invalid, handleSubmit, expectAnswer, signIn, errorMessage, clearError } = this.props;
        return (<form name="signInForm" onSubmit={ handleSubmit(signIn) }>
            <div className="mb-2">
                <Field
                    type="text"
                    name="username"
                    component={ Input }
                    disabled={ expectAnswer }
                    placeholder="Email Address"
                    addClassName="with-icon envelop"
                />
            </div>
            <div className="mb-2">
                <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    component={ Input }
                    disabled={ expectAnswer }
                />
            </div>
            <Button block outline color="primary" type="submit" disabled={ invalid || expectAnswer } className="mb-3">
                <span> Log In </span>
                <Spinner active={expectAnswer} />
            </Button>
            <ErrorMessage active title={'Error:'} message={errorMessage} onChange={clearError}/>
        </form>);
    }
}
// Check
SignInForm.propTypes = {
    invalid: PropTypes.bool,
    expectAnswer: PropTypes.bool,
    errorMessage: PropTypes.string,
    signIn: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};
// Def
SignInForm.defaultProps = {
    invalid: false,
    expectAnswer: false,
    errorMessage: null,
};

const SignInFormConnected = reduxForm({
    form: 'signInForm',
    validate: values => {
        const errors = {};
        // EMAIL
        if (!values.username) {
            errors.username = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
            errors.username = 'Invalid email address';
        }
        // // LOGIN
        // if (!values.username) {
        //     errors.username = 'Login is required';
        // }
        // PASSWORD
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must contain at least 8 symbol character';
        }
        return errors;
    },
})(connect(
    state => ({ ...state.signIn }),
    dispatch => ({
        signIn: formData => dispatch({ type: APP.SIGN_IN.REQUEST, ...formData }),
        clearError: () => dispatch({ type: APP.SIGN_IN.CLEAR }),
    })
)(SignInForm));
