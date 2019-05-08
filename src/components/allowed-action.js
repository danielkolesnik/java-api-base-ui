
// outsource dependencies
import get from 'lodash/get';
import size from 'lodash/size';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import React, { PureComponent } from 'react';
import { Tooltip, OverlayTrigger, Button, Dropdown, MenuItem } from 'react-bootstrap';

// local dependencies
import is from '../services/is.service';

// configuration
export const SKIP_CHECK = '@AllowedAction/SKIP_CHECK';

class _AllowedAction extends PureComponent {
    render () {
        const { action, children, user, Message, ...attr } = this.props;
        // NOTE skip permission checks development only
        if (action === SKIP_CHECK) {
            return children;
        }
        // NOTE provide check for single permission
        if (is.string(action) && user.hasPermission(action)) {
            return children;
        }
        // NOTE user do not have permission to make action
        return (<Message {...attr} />);
    }
}

// Check
_AllowedAction.propTypes = {
    Message: PropTypes.func,
    user: PropTypes.object.isRequired,
    action: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
// Def
_AllowedAction.defaultProps = {
    Message: Message
};

// Connect
export const AllowedAction = connect(
    state => ({ user: state.app.user }),
    {}
)(_AllowedAction);
// Export
export default AllowedAction;

/**
 * Message component for not enough permission
 *
 * @private
 */
function Message () {
    return (<OverlayTrigger
        delayShow={600}
        placement="top"
        overlay={(<Tooltip id="tooltip">
            Current logged user do not have enough permission to make this action
        </Tooltip>)}>
        <div className="permission-message">
            <i aria-hidden="true" className="fa fa-ban fa-rotate-90 text-red"> </i>
            &nbsp;
            <strong>Permission</strong>
        </div>
    </OverlayTrigger>);
}

/**
 * Wrapped button with not required allowed action permission
 *
 */
export class AllowedBtn extends PureComponent {
    render () {
        const { action, className, btnClasses, children, ...attr } = this.props;
        return (<AllowedAction action={action}>
            <Button className={className+btnClasses} {...attr}>
                { children }
            </Button>
        </AllowedAction>);
    }
}

// Check
AllowedBtn.propTypes = {
    action: PropTypes.string,
    className: PropTypes.string,
    btnClasses: PropTypes.string,
    children: PropTypes.node.isRequired,
};
// Def
AllowedBtn.defaultProps = {
    action: SKIP_CHECK,
    className: 'btn-cbc ',
    btnClasses: '',
};

/**
 * Wrapped Actions with not required allowed action permission
 *
 */
export class AllowedActionList extends PureComponent {
    handleAction (action) {
        if (this.props.disabled) { return; }
        if (is.string(action.confirm)) {
            const okText = action.confirmBtn || action.label;
            toastr.confirm(action.confirm, {
                okText,
                onOk: () => action.action(action)
            });
        } else {
            action.action(action);
        }
    }

    render () {
        const { name = 'Actions', icon = 'fa fa-list', actions = [], disabled = false, ...attr } = this.props;
        if (size(actions) > 1) {
            return (<Dropdown className="cbc-actions" id="actionsDropdown" vertical block disabled={disabled}>
                <Dropdown.Toggle vertical="true" block disabled={disabled} {...attr}>
                    <i className={icon} aria-hidden="true"> </i>
                    &nbsp; <strong> {name} </strong>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: '100%' }}>
                    {actions.map((item, index) => (<MenuItem key={index} eventKey={index} disabled={disabled}>
                        <AllowedAction action={item.permission||SKIP_CHECK}>
                            <div onClick={() => this.handleAction(item)}> {item.label||''} </div>
                        </AllowedAction>
                    </MenuItem>))}
                </Dropdown.Menu>
            </Dropdown>);
        }
        const action = get(actions, '0', {});
        return (<AllowedBtn
            block
            bsStyle="primary"
            disabled={disabled}
            action={action.permission||SKIP_CHECK}
            onClick={() => this.handleAction(action)}
        >
            {action.label||''}
        </AllowedBtn>);
    }
}

// Check
AllowedActionList.propTypes = {
    name: PropTypes.node,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    confirm: PropTypes.string,
    actions: PropTypes.array.isRequired,
};
// Def
AllowedActionList.defaultProps = {
    icon: 'fa fa-list',
    disabled: false,
    name: 'Actions',
    confirm: '',
};
