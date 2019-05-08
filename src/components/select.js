
// outsource dependencies
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import React, { PureComponent } from 'react';

// local dependencies
import is from '../services/is.service';
import InputErrorMessage from './input-error-message';

export class Select extends PureComponent {
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
            <ReactSelect
                id={input.name}
                name={input.name}
                value={input.value}
                className="custom-select"
                {...attr}
                onChange={this.handleChange}
            />
            <InputErrorMessage inputId={input.name} message={message} />
        </div>);
    }
}
// Check
Select.propTypes = {
    label: PropTypes.node,
    skipTouch: PropTypes.bool,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};
// Def
Select.defaultProps = {
    label: null,
    skipTouch: false,
};

export class SelectAsync extends PureComponent {
    handleChange = event => this.props.input.onChange(event);

    handleLoadList = (value, done) => {
        this.props.getList(value, list => done(null, { options: is.array(list) ? list : [], complete: true }));
    };

    render () {
        const { input, meta, label, skipTouch, ...attr } = this.props;
        let message = '', statusClassName = '';
        if (skipTouch || meta.touched) {
            message = meta.error;
            statusClassName = meta.valid ? 'has-success' : 'has-error';
        }
        return (<div className={`form-group offset-bottom-1 ${statusClassName}`}>
            { !label ? '' : (<label htmlFor={input.name} className="input-group"> { label } </label>) }
            <ReactSelect.Async
                id={input.name}
                name={input.name}
                value={input.value}
                className="custom-select"
                {...attr}
                onChange={this.handleChange}
                loadOptions={this.handleLoadList}
            />
            <InputErrorMessage inputId={input.name} message={message} />
        </div>);
    }
}
// Check
SelectAsync.propTypes = {
    label: PropTypes.node,
    skipTouch: PropTypes.bool,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
};
// Def
SelectAsync.defaultProps = {
    label: null,
    skipTouch: false,
};

export default Select;
