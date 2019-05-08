
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import React, { PureComponent } from 'react';
import { Badge, ListGroup, ListGroupItem, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// local dependencies
import TYPE from './types';
import Fa from '../../components/fa-icon';
import is from '../../services/is.service';

// Spec available menu item types
export const MENU_ITEM_TYPE = {
    ACTION: 'ACTION',
    HEADER: 'HEADER',
    LINK: 'LINK',
    MENU: 'MENU',
};

class ItemView extends PureComponent {
    formatIcon () {
        const { name, icon, expanded } = this.props;
        const className = `nav-item-icon animated slideInLeft ${expanded ? '' : 'collapsed'}`;
        return !icon ? '' :(<Fa
            tag="span"
            icon={icon}
            title={name}
            key="nav-item-icon"
            className={className}
        />);
    }

    formatBadge () {
        const { badge, expanded } = this.props;
        const className = `nav-item-badge animated slideInRight ${expanded ? '' : 'collapsed'}`;
        return !badge ? '' : (<Badge
            pill
            tag="div"
            color="success"
            key="nav-item-badge"
            className={className}
        > { badge } </Badge>);
    }

    formatTitle () {
        const { name, expanded } = this.props;
        const className = `nav-item-title animated zoomIn ${expanded ? '' : 'collapsed'}`;
        return !name ? '' : (<div
            key="nav-item-title"
            className={className}
        >{ name }</div>);
    }

    render () {
        return [
            this.formatIcon(),
            this.formatTitle(),
            this.formatBadge(),
        ];
    }
}
ItemView.propTypes = {
    expanded: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    badge: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
};
ItemView.defaultProps = {
    badge: null,
    icon: null,
};
/**
 * Menu wrapper which watch changes of url
 */
class SideMenu extends PureComponent {
    render () {
        const { menu, expanded, location } = this.props;
        return (<aside id="menu">
            <nav className="hide-scroll-bar nav-custom">
                <ListGroup flush>
                    { (menu || []).map(item => <ItemByType
                        {...item}
                        id={item.key}
                        key={item.key}
                        expanded={expanded}
                        location={location}
                    />) }
                </ListGroup>
            </nav>
        </aside>);
    }
}
SideMenu.propTypes = {
    expanded: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    menu: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default withRouter(connect(
    state => ({
        menu: state.layout.menu,
        expanded: state.layout.expanded,
    }),
    null
)(SideMenu));

/**
 * Switch items by type
 */
class ItemByType extends PureComponent {
    render () {
        const { type, ...attr } = this.props;
        let Component;
        switch (type) {
            default:
                Component = InvalidType;
                break;
            case MENU_ITEM_TYPE.LINK:
                Component = ItemLink;
                break;
            case MENU_ITEM_TYPE.MENU:
                Component = ItemMenuConnected;
                break;
            case MENU_ITEM_TYPE.HEADER:
                Component = ItemHeader;
                break;
            case MENU_ITEM_TYPE.ACTION:
                Component = ItemAction;
                break;
        }
        return <Component {...attr} />;
    }
}
ItemByType.propTypes = {
    type: PropTypes.oneOf(Object.keys(MENU_ITEM_TYPE).map(key => MENU_ITEM_TYPE[key])).isRequired,
};

/**
 * Switch items by type
 */
class ItemHeader extends PureComponent {
    render () {
        return (<ListGroupItem className="nav-item nav-header">
            <ItemView {...this.props} />
        </ListGroupItem>);
    }
}
ItemHeader.propTypes = {
    ...ItemView.propTypes,
};
ItemHeader.defaultProps = {
    ...ItemView.defaultProps,
};

class ItemMenu extends PureComponent {
    constructor (...args) {
        super(...args);
        this.state = { open: false, animationClass: '' };
    }

    onExiting = () => this.setState({ animationClass: 'zoomOut' });

    onEntering = () => this.setState({ animationClass: 'zoomIn' });

    handleClick = e => {
        e.preventDefault();
        const { update, id } = this.props;
        !this.state.open&&update(id);
        this.setState({ open: !this.state.open });
    };

    isActive = () => {
        // NOTE at least one nested item should be active to activate menu
        let atLeastOne = false;
        const { list, location } = this.props;
        for (const { isActive, link } of list) {
            const check = is.function(isActive) ? isActive : defaultIsActive;
            atLeastOne = check(location, link);
            if (atLeastOne) {
                break;
            }
        }
        return atLeastOne;
    };

    componentDidMount () {
        if (this.props.expanded && this.isActive()) { this.setState({ open: true }); }
    }

    componentDidUpdate (prevProps) {
        const { expanded, lastOpened, id } = this.props;
        if ( expanded ) {
            if (!this.isActive() && id !== lastOpened) {
                this.setState({ open: false });
            }
        } else if ( prevProps.expanded ) {
            this.setState({ open: false });
        }
    }

    renderCollapsible () {
        const { open, animationClass } = this.state;
        const { disabled, list, location, ...attr } = this.props;
        return (<ListGroupItem
            disabled={disabled}
            active={this.isActive()}
            onClick={this.handleClick}
            className="nav-item nav-menu"
        >
            <a href="/" className="nav-menu-toggle" onClick={preventDefault}>
                <ItemView {...attr} />
            </a>
            <Collapse
                isOpen={open}
                onClick={stopPropagation}
                onExiting={this.onExiting}
                onEntering={this.onEntering}
            >
                <ListGroup
                    className={`animated ${animationClass}`}
                    style={{ animationDuration: '500ms' }}
                >
                    { (list || []).map((item, i) => <ItemByType
                        key={i}
                        {...item}
                        location={location}
                        expanded={this.props.expanded}
                    />) }
                </ListGroup>
            </Collapse>
        </ListGroupItem>);
    }

    onMouseEnter = () => this.setState({open: true});

    onMouseLeave = () => this.setState({open: false});

    getDropdownMenuPosition () {
        if (!this.dropdownRef) { return { top: 50, left: 70 }; }
        // NOTE make sure polyfill was added https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const position = this.dropdownRef.containerRef.current.getBoundingClientRect();
        return {
            top: position.top,
            // NOTE prevent distance between toggle and menu
            left: position.left + position.width - 3
        };
    }

    renderDropdown () {
        const { disabled, list, location, ...attr } = this.props;
        return (<ListGroupItem
            disabled={disabled}
            active={this.isActive()}
            className="nav-item nav-menu"
        >
            <Dropdown
                isOpen={this.state.open}
                toggle={this.handleClick}
                onMouseOver={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                ref={ref => this.dropdownRef = ref}
            >
                <DropdownToggle tag="a" className="nav-menu-toggle">
                    <ItemView {...attr} />
                </DropdownToggle>
                <DropdownMenu className="animated zoomInLeft" style={{
                    position: 'fixed',
                    animationDuration: '400ms',
                    ...this.getDropdownMenuPosition()
                }}>
                    <DropdownItem header> {this.props.name} </DropdownItem>
                    <DropdownItem header>
                        { (list || []).map((item, i) => <ItemByType
                            key={i}
                            {...item}
                            location={location}
                            expanded={this.props.expanded}
                        />) }
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ListGroupItem>);
    }

    render () {
        return this.props.expanded ?
            this.renderCollapsible()
            : this.renderDropdown();
    }
}
ItemMenu.propTypes = {
    ...ItemView.propTypes,
    disabled: PropTypes.bool,
    isActive: PropTypes.func,
    update: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    lastOpened: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};
ItemMenu.defaultProps = {
    ...ItemView.defaultProps,
    lastOpened: null,
    disabled: false,
    isActive: null,
};
const ItemMenuConnected = connect(
    state => ({ lastOpened: state.layout.lastOpened }),
    dispatch => ({ update: id => dispatch({ type: TYPE.DATA, lastOpened: id }) }),
)(ItemMenu);

class ItemLink extends PureComponent {
    isActive = () => {
        const { isActive, location, link } = this.props;
        if (is.function(isActive)) {
            return isActive(location, link);
        }
    };

    render () {
        const { disabled, link, ...attr } = this.props;
        return (<ListGroupItem
            className="nav-item nav-link"
            disabled={disabled}
            active={this.isActive()}
        >
            <Link to={link}>
                <ItemView {...attr} />
            </Link>
        </ListGroupItem>);
    }
}
ItemLink.propTypes = {
    ...ItemView.propTypes,
    disabled: PropTypes.bool,
    isActive: PropTypes.func,
    link: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
};
ItemLink.defaultProps = {
    ...ItemView.defaultProps,
    disabled: false,
    isActive: defaultIsActive,
};

class ItemAction extends PureComponent {
    isActive = () => {
        const { isActive, location } = this.props;
        if (is.function(isActive)) {
            return isActive(location, null);
        }
    };

    handleClick = () => {
        const { action } = this.props;
        if (is.function(action)) {
            return action(this.props);
        }
        console.error('Action was not be setup', this.props);
    };

    render () {
        const { disabled, ...attr } = this.props;
        return (<ListGroupItem
            className="nav-item nav-action"
            disabled={disabled}
            active={this.isActive()}
            onClick={this.handleClick}
        >
            <a href="/" onClick={preventDefault}>
                <ItemView {...attr} />
            </a>
        </ListGroupItem>);
    }
}
ItemAction.propTypes = {
    ...ItemView.propTypes,
    disabled: PropTypes.bool,
    isActive: PropTypes.func,
    action: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};
ItemAction.defaultProps = {
    ...ItemView.defaultProps,
    disabled: false,
    isActive: defaultIsActive,
};

/**
 *
 * @param {Object} location
 * @param {String} [link=null]
 */
function defaultIsActive (location, link) {
    if (!link) { return false; }
    return (new RegExp(link, 'i')).test(location.pathname);
}
const preventDefault = e => e.preventDefault();
const stopPropagation = e => e.stopPropagation();
const InvalidType = () => <ListGroupItem className="nav-item text-danger">Invalid type</ListGroupItem>;
