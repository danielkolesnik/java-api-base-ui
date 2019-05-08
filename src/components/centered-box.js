
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';

export class CenteredBox extends PureComponent {
    render () {
        const { children, style, ...attr } = this.props;
        return (<Container fluid style={{ height: '100%' }}>
            <Row className="align-items-center" style={{ height: '100%' }}>
                <Col xs="12">
                    <div style={{ margin: '0 auto', ...style }} {...attr}>
                        { children }
                    </div>
                </Col>
            </Row>
        </Container>);
    }
}
// Check
CenteredBox.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object.isRequired, // NOTE =) make sure the with is present in styles
    children: PropTypes.node.isRequired,
};
// Def
CenteredBox.defaultProps = {
    className: 'centered-box',
};

export default CenteredBox;
