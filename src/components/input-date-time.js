
// outsource dependencies
import PropTypes from 'prop-types';
import DateTimePicker from 'react-datetime';
import React, { PureComponent } from 'react';

// local dependencies
import InputErrorMessage from './input-error-message';

class InputDateTime extends PureComponent {
    handleChange = event => this.props.input.onChange(event);

    render () {
        const { input, meta, label, skipTouch, ...attr } = this.props;
        let message = '', statusClassName = '';
        if (skipTouch || meta.touched) {
            message = meta.error;
            statusClassName = meta.valid ? 'has-success' : 'has-error';
        }
        return (<div className={`form-group offset-bottom-1 ${statusClassName}`}>
            { !label ? '' : (<label htmlFor={input.name} className="input-group"> { label } </label>) }
            <DateTimePicker
                closeOnSelect={true}
                { ...attr }
                { ...input }
                id={input.name}
                onChange={this.handleChange}
            />
            <InputErrorMessage inputId={input.name} message={message} />
        </div>);
    }
}
// Check
InputDateTime.propTypes = {
    label: PropTypes.node,
    skipTouch: PropTypes.bool,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};
// Def
InputDateTime.defaultProps = {
    label: null,
    skipTouch: false,
};

export default InputDateTime;
