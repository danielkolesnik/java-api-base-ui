
// outsource dependencies
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

// local dependencies
import { Logo } from '../../images';
import { SIGN_IN } from '../../constants/routes';
import CenteredBox from '../../components/centered-box';

export default function SignUpPage () {
    return (<CenteredBox style={{ width: '360px', maxWidth: '80%' }}>
        <Row className="align-items-center" style={{ minHeight: '300px', background: '#fff' }}>
            <Col xs="12" className="pt-3 mb-3 text-center">
                <Logo className="img-fluid" />
            </Col>
            <Col xs="12" tag="h3" className="text-center text-muted">
                Sorry, but this functionality currently unavailable...
            </Col>
            <Col xs="12" className="text-right mb-3">
                <Link to={SIGN_IN.LINK()}> Sign in </Link>
            </Col>
        </Row>
    </CenteredBox>);
}
