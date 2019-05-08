
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// local dependencies
import InputErrorMessage from './input-error-message';

class Radio extends PureComponent {
    render () {
        const { input, meta, list, inline, label } = this.props;
        return (<div className="form-group offset-bottom-1">
            { !label ? '' : (<label htmlFor={input.name} className="input-group offset-bottom-2"> { label } </label>) }
            <div>
                {list.map((item, index) => (
                    <div key={index} className={`custom-radio radio${inline?'-inline':''}`}>
                        <label htmlFor={`radio-${input.name}-${index}`}>
                            <input
                                {...input}
                                type="radio"
                                value={item.value}
                                id={`radio-${input.name}-${index}`}
                                checked={input.value === item.value}
                            />
                            &nbsp;{ item.label }
                        </label>
                    </div>
                ))}
            </div>
            <InputErrorMessage inputId={input.name} message={meta.error} statusClassName="has-error text-center" />
        </div>);
    }
}
// Check
Radio.propTypes = {
    label: PropTypes.node,
    inline: PropTypes.bool,
    list: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};
// Def
Radio.defaultProps = {
    label: null,
    inline: false,
};

export default Radio;
