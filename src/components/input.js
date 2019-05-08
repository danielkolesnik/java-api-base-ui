
// outsource dependencies
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import React, { PureComponent } from 'react';

class Input extends PureComponent {

    handleChange = event => {
        const { input, filter } = this.props;
        input.onChange(filter(event));
    };

    className = statusClassName => {
        const { addClassName, className } = this.props;
        const resClass = addClassName ? `${className} ${addClassName}`: className;
        return `${resClass} ${statusClassName}`;
    };

    render () {
        const { input, meta, label, skipTouch, addClassName, filter, ...attr } = this.props;
        let message = '', statusClassName = '';
        if (skipTouch || meta.touched) {
            message = meta.error;
            statusClassName = meta.valid ? 'is-valid' : 'is-invalid';
        }

        return (<FormGroup>
            { !label ? '' : (<label htmlFor={input.name}> { label } </label>) }
            <input
                { ...input }
                { ...attr }
                id={input.name}
                onChange={this.handleChange}
                className={this.className(statusClassName)}
            />
            <label htmlFor={input.name} className="invalid-feedback"> { message } </label>
        </FormGroup>);
    }
}
// Check
Input.propTypes = {
    label: PropTypes.node,
    filter: PropTypes.func,
    skipTouch: PropTypes.bool,
    className: PropTypes.string,
    addClassName: PropTypes.string,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};
// Def
Input.defaultProps = {
    label: null,
    filter: e => e,
    skipTouch: false,
    addClassName: null,
    className: 'form-control',
};

export default Input;
