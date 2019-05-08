
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// local dependencies
import InputErrorMessage from './input-error-message';

class TextArea extends PureComponent {
    handleChange = event => {
        const { input, filter } = this.props;
        input.onChange(filter(event));
    };

    render () {
        const { input, meta, label, skipTouch = false, filter, ...attr } = this.props;
        let message = '', statusClassName = '';
        if (skipTouch || meta.touched) {
            message = meta.error;
            statusClassName = meta.valid ? 'has-success' : 'has-error';
        }
        return (<div className={`form-group offset-bottom-1 ${statusClassName}`}>
            <div>
                { !label ? '' : (<label htmlFor={input.name} className="input-group"> { label } </label>) }
                <textarea
                    rows="3"
                    className="form-control"
                    style={{ maxWidth: '100%' }}
                    { ...input }
                    { ...attr }
                    id={input.name}
                    onChange={this.handleChange}
                />
            </div>
            <InputErrorMessage inputId={input.name} message={message} />
        </div>);
    }
}
// Check
TextArea.propTypes = {
    label: PropTypes.node,
    filter: PropTypes.func,
    skipTouch: PropTypes.bool,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};
// Def
TextArea.defaultProps = {
    label: null,
    filter: e => e,
    skipTouch: false,
};

export default TextArea;
