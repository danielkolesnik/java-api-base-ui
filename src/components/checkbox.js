
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// local dependencies
import InputErrorMessage from './input-error-message';

class Checkbox extends PureComponent {
    handleChange = event => this.props.input.onChange(event);

    render () {
        const { input, meta, label, skipTouch, ...attr } = this.props;
        let message = '', statusClassName = '';
        if (skipTouch || meta.touched) {
            message = meta.error;
            statusClassName = meta.valid ? 'has-success' : 'has-error';
        }
        return (<div className={`form-group form-inline top-indent-3 offset-bottom-1 ${statusClassName}`}>
            <div className="custom-checkbox custom-checkbox-hover">
                <label htmlFor={input.name}>
                    <input
                        { ...input }
                        { ...attr }
                        type="checkbox"
                        id={input.name}
                        checked={Boolean(input.value)}
                        onChange={this.handleChange}
                    />
                </label>
                <label htmlFor={input.name} className="input-group offset-left-2"> { label } </label>
            </div>
            <InputErrorMessage inputId={input.name} message={message} />
        </div>);
    }
}
// Check
Checkbox.propTypes = {
    label: PropTypes.node,
    skipTouch: PropTypes.bool,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};
// Def
Checkbox.defaultProps = {
    label: null,
    skipTouch: false,
};

export default Checkbox;
