
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class InputErrorMessage extends PureComponent {
    render () {
        const { message, statusClassName, inputId } = this.props;
        if (!message) { return ''; }
        return (<div className={`input-group ${statusClassName}`}>
            <label htmlFor={inputId} className="help-block offset-bottom-0"> { message } </label>
        </div>);
    }
}

// Check
InputErrorMessage.propTypes = {
    message: PropTypes.string,
    statusClassName: PropTypes.string,
    inputId: PropTypes.string.isRequired,
};
// Def
InputErrorMessage.defaultProps = {
    message: null,
    statusClassName: 'has-error',
};

export default InputErrorMessage;
