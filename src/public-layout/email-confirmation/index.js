
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

// local dependencies
import { Logo } from '../../images';
import { PUBLIC } from '../../actions/types';
import { SIGN_IN } from '../../constants/routes';
import Preloader from '../../components/preloader';
import CenteredBox from '../../components/centered-box';


class EmailConfirmation extends PureComponent {
    componentDidMount () {
        const { validateToken, match: { params: { token } } } = this.props;
        validateToken({ token });
    }

    render () {
        const { expectAnswer, invalidToken } = this.props;
        return (<CenteredBox style={{ width: '360px', maxWidth: '80%' }}>
            <Row className="align-items-center" style={{ minHeight: '300px', background: '#fff' }}>
                <Col xs="12" className="pt-3 mb-3 text-center">
                    <Logo className="img-fluid" />
                </Col>
                <Col xs={{ size: 10, offset: 1 }}>
                    <Preloader type="BOX" active={expectAnswer}>
                        { invalidToken ? (<h4 className="text-justify text-danger">
                            Whoa there! The request token for this page is invalid.
                            It may have already been used, or expired because it is too old.
                            Please go back to the and try again.
                        </h4>) : (<h3 className="text-center text-success">
                            The email address was successfully verified. Welcome aboard !
                        </h3>)}
                    </Preloader>
                </Col>
                <Col xs="12" className="text-right">
                    <Link to={SIGN_IN.LINK()}> Sign in </Link>
                </Col>
            </Row>
        </CenteredBox>);
    }
}
// Check
EmailConfirmation.propTypes = {
    expectAnswer: PropTypes.bool,
    invalidToken: PropTypes.bool,
    match: PropTypes.object.isRequired,
    validateToken: PropTypes.func.isRequired,
};
// Def
EmailConfirmation.defaultProps = {
    invalidToken: true,
    expectAnswer: false,
};

export default connect(
    // mapStateToProps
    state => ({ ...state.emailConfirmation }),
    // mapDispatchToProps
    dispatch => ({
        validateToken: ({ token }) => dispatch({ type: PUBLIC.EMAIL_CONFIRMATION.REQUEST, token }),
    })
)(EmailConfirmation);
