
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// local dependencies
import TYPE from './types';
import { Avatar } from '../../images';
import { APP } from '../../actions/types';
import { Humanize } from '../../components/filter';
import { FasIcon } from '../../components/fa-icon';

class UserMenu extends PureComponent {
    handleSignOut = () => this.props.signOut();

    handleToggleMenu = () => this.props.toggleAside();

    render () {
        const { user, expanded } = this.props;
        return (<UncontrolledDropdown nav inNavbar className="mr-md-3">
            <DropdownToggle nav className="pt-2 pb-2">
                <strong> { user.fullName } </strong>&nbsp;
                <Avatar src={ user.avatar } alt={ user.fullName } style={{ width: '39px', height: '39px' }} />
                {/*<span className="badge badge-danger">100500</span>*/}
            </DropdownToggle>
            <DropdownMenu right className="animated flipInX">
                <DropdownItem header>
                    <span className="d-flex align-items-center">
                        <span>Roles: </span>
                        {(user.roles || [{ name: 'Unknown' }]).map((role, i) => <Humanize
                            key={i}
                            tag="span"
                            text={role.name}
                            className="badge badge-danger ml-auto"
                        />)}
                    </span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleToggleMenu}>
                    <div className="media">
                        <div className="align-self-start mr-3">
                            <FasIcon size="2x" icon="bars" className="text-success" />
                        </div>
                        <div className="media-body">
                            <p className="m-0">Toggle menu</p>
                            <p className="m-0 text-muted text-sm">{expanded ? 'Collapse' : 'Expand' }</p>
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <div className="media">
                        <div className="align-self-start mr-3">
                            <FasIcon size="2x" icon="user-cog" className="text-primary" />
                        </div>
                        <div className="media-body">
                            <p className="m-0">Settings</p>
                            <p className="m-0 text-muted text-sm">My profile</p>
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem>
                    <div className="media">
                        <div className="align-self-start mr-3">
                            <FasIcon size="2x" icon="envelope" className="text-warning" />
                        </div>
                        <div className="media-body">
                            <p className="m-0">Notifications</p>
                            <p className="m-0 text-muted text-sm">100500</p>
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem onClick={this.handleSignOut}>
                    <div className="media">
                        <div className="align-self-start mr-3">
                            <FasIcon size="2x" icon="sign-out-alt" className="text-danger" />
                        </div>
                        <div className="media-body">
                            <p className="m-0">Sign out</p>
                            <p className="m-0 text-muted text-sm">Destroy current session</p>
                        </div>
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>);
    }
}
// Check
UserMenu.propTypes = {
    user: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    toggleAside: PropTypes.func.isRequired,
};
// Export
export default connect(
    state => ({
        user: state.app.user,
        expanded: state.layout.expanded,
    }),
    dispatch => ({
        toggleAside: () => dispatch({ type: TYPE.TOGGLE_ASIDE }),
        signOut: () => dispatch({ type: APP.SIGN_OUT.REQUEST }),
    })
)(UserMenu);
