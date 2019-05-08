
// outsource dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Row, Col, Alert } from 'reactstrap';

class AlertError extends Component {
    constructor (...args) {
        super(...args);
        this.state = { message: null };
    }

    componentDidMount () {
        this.setState({ message: this.props.message });
    }

    componentDidUpdate ({ message }) {
        if (message !== this.props.message && this.state.message !== this.props.message) {
            this.setState({ message: this.props.message });
        }
    }

    clear = event => {
        this.setState({ message: null });
        const { onChange } = this.props;
        onChange&&onChange(event);
    };

    render () {
        if (!this.state.message) { return ''; }
        const { title, active } = this.props;
        return (<Row>
            <Col xs="12">
                <Alert color="danger">
                    <strong> { title } </strong>
                    { this.state.message }
                    { !active ? '' : (
                        <Button close onClick={this.clear}>
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    )}
                </Alert>
            </Col>
        </Row>);
    }
}

// Check
AlertError.propTypes = {
    active: PropTypes.bool,
    title: PropTypes.string,
    onChange: PropTypes.func,
    message: PropTypes.string,
};
// Def
AlertError.defaultProps = {
    title: 'Error: ',
    message: null,
    active: false,
    onChange: null,
};

export default AlertError;
