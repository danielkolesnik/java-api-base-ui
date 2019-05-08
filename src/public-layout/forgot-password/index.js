
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
import { SIGN_IN } from '../../constants/routes';
import { Spinner } from '../../components/preloader';
import CenteredBox from '../../components/centered-box';
import ErrorMessage from '../../components/alert-error';

class ForgotPasswordPage extends PureComponent {
    render () {
        const { invalid, handleSubmit, expectAnswer, forgotPassword, errorMessage, clearError } = this.props;
        return (<CenteredBox style={{ width: '360px', maxWidth: '80%' }}>
            <Row className="align-items-center" style={{ minHeight: '300px', background: '#fff' }}>
                <Col xs="12" className="pt-3 mb-3 text-center">
                    <Logo className="img-fluid" />
                </Col>
                <Col xs="12" tag="h2" className="text-center text-primary">
                    <strong> Forgot password ? </strong>
                </Col>
                <Col xs="12" tag="h4" className="text-center text-muted mb-4">
                    Please enter your <strong>email address</strong>, and we&apos;ll send you a password reset email.
                </Col>
                <Col xs={{ size: 10, offset: 1 }}>
                    <form name="forgotPassword" onSubmit={ handleSubmit(forgotPassword) }>
                        <div className="mb-2">
                            <Field
                                type="mail"
                                name="email"
                                placeholder="Email"
                                component={ Input }
                                disabled={ expectAnswer }
                                addClassName="with-icon envelop"
                            />
                        </div>
                        <Button
                            block
                            outline
                            type="submit"
                            color="primary"
                            className="mb-3"
                            disabled={ invalid || expectAnswer }
                        >
                            <span> Reset password </span>
                            <Spinner active={expectAnswer} />
                        </Button>
                        <ErrorMessage active title={'Error:'} message={errorMessage} onChange={clearError}/>
                    </form>
                </Col>
                <Col xs="12" className="text-right mb-3">
                    <Link to={SIGN_IN.LINK()}> Sign in </Link>
                </Col>
            </Row>
        </CenteredBox>);
    }
}
// Check
ForgotPasswordPage.propTypes = {
    invalid: PropTypes.bool,
    expectAnswer: PropTypes.bool,
    errorMessage: PropTypes.string,
    clearError: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
};
// Def
ForgotPasswordPage.defaultProps = {
    invalid: false,
    expectAnswer: false,
    errorMessage: null,
};

export default reduxForm({
    form: 'forgotPassword',
    /**
     * @param { Object } values - named properties of input data
     * @param { Object } meta - information about form status
     * @returns { Object } - named errors
     * @function validate
     * @public
     */
    validate: (values, meta) => {
        const errors = {};
        // EMAIL
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    },
})(connect(
    // mapStateToProps
    state => ({ ...state.forgotPassword }),
    // mapDispatchToProps
    dispatch => ({
        forgotPassword: ({ email }) => dispatch({ type: PUBLIC.FORGOT_PASSWORD.REQUEST, email }),
        clearError: () => dispatch({ type: PUBLIC.FORGOT_PASSWORD.CLEAR }),
    })
)(ForgotPasswordPage));
