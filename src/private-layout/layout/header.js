
// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';
import React, { PureComponent } from 'react';

// local dependencies
import TYPE from './types';
import { Logo } from '../../images';
import UserMenuConnected from './user-menu';
import SearchFormConnected from './search-form';
import { FasIcon, FabIcon } from '../../components/fa-icon';
import { PRIVATE_WELCOME_SCREEN } from '../../constants/routes';

class Header extends PureComponent {
    constructor (...args) {
        super(...args);
        this.handleResize = throttle(this.handleResize, 500, { trailing: true });
    }

    handleResize = () => {
        if (this.props.expanded && window.innerWidth < 768) {
            this.props.toggleAside();
        }
    };

    handleToggleAside = e => {
        e.preventDefault();
        this.props.toggleAside();
    };

    handleOpenSearch = e => {
        e.preventDefault();
        this.props.openSearch();
    };

    componentDidMount () {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize);
    }

    render () {
        return (<header id="header" className="topnavbar-wrapper">
            <nav className="navbar topnavbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to={PRIVATE_WELCOME_SCREEN.LINK()}>
                        <div className="brand-logo">
                            <Logo className="img-fluid" />
                        </div>
                        <div className="brand-logo-collapsed">
                            <FabIcon icon="google" />
                        </div>
                    </Link>
                </div>

                <ul className="navbar-nav mr-auto flex-row">
                    <li className="nav-item">
                        <a href="/" className="nav-link sidebar-toggle" onClick={this.handleToggleAside}>
                            <FasIcon size="lg" icon="bars" />
                        </a>
                    </li>
                </ul>

                <SearchFormConnected />

                <ul className="navbar-nav flex-row">
                    <li className="nav-item">
                        <a href="/" className="nav-link" onClick={this.handleOpenSearch}>
                            <FasIcon size="lg" icon="search" />
                        </a>
                    </li>

                    <UserMenuConnected />

                    {/*<li className="nav-item pr-3"> /!*empty item*!/ </li>*/}
                </ul>
            </nav>
        </header>);
    }
}

// Check
Header.propTypes = {
    expanded: PropTypes.bool.isRequired,
    openSearch: PropTypes.func.isRequired,
    toggleAside: PropTypes.func.isRequired,
};

export default connect(
    state => ({ expanded: state.layout.expanded }),
    dispatch => ({
        toggleAside: () => dispatch({ type: TYPE.TOGGLE_ASIDE }),
        openSearch: () => dispatch({ type: TYPE.DATA, showSearch: true }),
    })
)(Header);
