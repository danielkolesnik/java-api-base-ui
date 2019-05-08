
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';

class PageSize extends PureComponent {
    handleChange (item) {
        const { onChange, value, disabled } = this.props;
        if (disabled || value === item) { return; }
        onChange(item);
    }

    render () {
        const { value, list, dropup, disabled, formatTitle, formatItem } = this.props;
        return (<Dropdown id="pageSize" dropup={dropup} disabled={disabled}>
            <Dropdown.Toggle>{ formatTitle(value) }</Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: '100%', right: 0 }}>
                {list.map((item, index) => (
                    <MenuItem
                        key={index}
                        eventKey={index}
                        active={value === item}
                        onClick={() => this.handleChange(item)}
                    >
                        { formatItem(item) }
                    </MenuItem>))
                }
            </Dropdown.Menu>
        </Dropdown>);
    }
}

// Check
PageSize.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    formatTitle: PropTypes.func,
    formatItem: PropTypes.func,
    disabled: PropTypes.bool,
    dropup: PropTypes.bool,
    list: PropTypes.array,
};
// Def
PageSize.defaultProps = {
    formatTitle: defFormatTitle,
    formatItem: defFormatItem,
    list: [10, 20, 30],
    disabled: false,
    dropup: false,
};

export default PageSize;

/**
 * default format item view
 *
 * @param {String|Number} val
 * @public
 */
function defFormatItem (val) {
    return (<strong>{val}</strong>);
}

/**
 * default format title view
 *
 * @param {String|Number} val
 * @public
 */
function defFormatTitle (val) {
    return (<strong>{val}&nbsp;&nbsp;</strong>);
}
