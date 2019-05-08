
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// local dependencies
class RowSelect extends PureComponent {
    render () {
        const { checked, disabled, onClick } = this.props;
        return (<th className={`interactive dark${disabled?' disabled': ''}`} style={{ width: '30px' }} onClick={e => disabled||onClick(e)}>
            <div className="checkbox custom-checkbox">
                <label> <input type="checkbox" name={`tc-${Math.random()}`} checked={Boolean(checked)} /> </label>
            </div>
        </th>);
    }
}

// Check
RowSelect.propTypes = {
    checked: PropTypes.any,
    disabled: PropTypes.any,
    onClick: PropTypes.func.isRequired,
};
// Def
RowSelect.defaultProps = {
    checked: false,
    disabled: false,
};

export default RowSelect;
