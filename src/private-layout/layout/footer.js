
// outsource dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// local dependencies
import { Logo } from '../../images';
import { PRIVATE_WELCOME_SCREEN } from '../../constants/routes';

export default () => (<Container fluid tag="footer" id="footer">
    <Row className="align-items-center">
        <Col xs="12">
            <Link to={PRIVATE_WELCOME_SCREEN.LINK()}>
                <Logo className="img-fluid" />
            </Link>
        </Col>
    </Row>
</Container>);
