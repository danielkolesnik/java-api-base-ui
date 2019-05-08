
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

// configuration
const sortIcon = {
    sort: 'text-super-muted glyphicon glyphicon-sort',
    sortASC: 'glyphicon glyphicon-sort-by-attributes',
    sortDESC: 'glyphicon glyphicon-sort-by-attributes-alt',

    alphabet: 'text-super-muted glyphicon glyphicon-sort',
    alphabetASC: 'glyphicon glyphicon-sort-by-alphabet',
    alphabetDESC: 'glyphicon glyphicon-sort-by-alphabet-alt',

    order: 'text-super-muted glyphicon glyphicon-sort',
    orderASC: 'glyphicon glyphicon-sort-by-order',
    orderDESC: 'glyphicon glyphicon-sort-by-order-alt',
};

class SortIcon extends PureComponent {
    render () {
        const { Tag, type, status, children } = this.props;
        let tagClass = '';
        let icon;
        switch (status) {
            case 1:
                icon = sortIcon[`${type}ASC`];
                break;
            case 0:
                icon = sortIcon[`${type}DESC`];
                break;
            default:
                icon = sortIcon[type];
                tagClass = 'text-light-muted';
        }
        return (<Tag className={tagClass}>
            {children}&nbsp;<i className={icon} aria-hidden="true"> </i>
        </Tag>);
    }
}
// Check
SortIcon.propTypes = {
    Tag: PropTypes.string,
    status: PropTypes.any,
    type: PropTypes.oneOf(['sort', 'alphabet', 'order']),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.element,
        PropTypes.node
    ]).isRequired,
};
// Def
SortIcon.defaultProps = {
    Tag: 'strong',
    type: 'sort',
    status: null,
};

export default SortIcon;
