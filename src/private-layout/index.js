// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import Layout from './layout';
import { config } from '../constants';
import * as ROUTES from '../constants/routes';
import { MENU_ITEM_TYPE } from './layout/side-menu';

// nested pages
import NoMatch from '../no-match';
import WelcomePage from './welcome';

import Users from './users';
import Teachers from './teachers';
// eslint-disable-next-line no-duplicate-imports
import ReportsPage from '../peg';
// eslint-disable-next-line no-duplicate-imports
import SettingsPage from '../peg';
// eslint-disable-next-line no-duplicate-imports
import HomeCtrlPage from '../peg';
// eslint-disable-next-line no-duplicate-imports
import PermissionsPage from '../peg';

class PrivateLayout extends PureComponent {
    render () {
        const { location, auth } = this.props;
        // NOTE redirect for unauthorized users
        if (!auth) {
            return (<Redirect to={ { pathname: ROUTES.SIGN_IN.ROUTE, state: { from: location } } }/>);
        }
        return (<Layout>
            <Switch>
                <Route path={ ROUTES.PRIVATE_WELCOME_SCREEN.ROUTE } component={ WelcomePage }/>
                <Route path={ ROUTES.HOME_CTR.ROUTE } component={ HomeCtrlPage }/>
                <Route path={ ROUTES.USERS.ROUTE } component={ Users }/>
                <Route path={ ROUTES.TEACHERS.ROUTE } component={ Teachers }/>
                <Route path={ ROUTES.REPORTS.ROUTE } component={ ReportsPage }/>
                <Route path={ ROUTES.PERMISSIONS.ROUTE } component={ PermissionsPage }/>
                <Route path={ ROUTES.SETTINGS.ROUTE } component={ SettingsPage }/>
                { /* OTHERWISE */ }
                { !config.production ? (
                    <Route component={ NoMatch }/>
                ) : (
                    <Redirect to={ { pathname: ROUTES.PRIVATE_WELCOME_SCREEN.LINK(), state: { from: location } } }/>
                ) }
            </Switch>
        </Layout>);
    }
}

// Check
PrivateLayout.propTypes = {
    auth: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
};
// Export
export default connect(
    state => ({ auth: state.app.auth }),
    null
)(PrivateLayout);

// Side Menu
export const MENU = [
    {
        key: 0,
        type: MENU_ITEM_TYPE.HEADER,
        name: 'Entities'
    },
    {
        key: 2,
        // disabled: true,
        type: MENU_ITEM_TYPE.LINK,
        name: 'Teachers',
        icon: 'chalkboard-teacher',
        link: ROUTES.TEACHERS.ROUTE,
        // NOTE ability to custom detection of active state
        isActive: location => ROUTES.TEACHERS.REGEXP.test(location.pathname)
    },
    {
        key: 3,
        // disabled: true,
        type: MENU_ITEM_TYPE.LINK,
        name: 'Home Page',
        icon: 'home',
        // badge: 10,
        link: ROUTES.HOME_CTR.LINK(),
        // NOTE ability to custom detection of active state
        isActive: location => ROUTES.HOME_CTR.REGEXP.test(location.pathname)
    },
    // {
    //     key: 4,
    //     icon: 'cog',
    //     // badge: 10,
    //     type: MENU_ITEM_TYPE.MENU,
    //     name: 'Settings menu',
    //     list: [
    //         {
    //             key: 5222,
    //             // disabled: true,
    //             // badge: 10,
    //             type: MENU_ITEM_TYPE.ACTION,
    //             name: 'test action',
    //             icon: 'exclamation-triangle',
    //             action: (...args) => console.log('test action', args),
    //         }, {
    //             key: 41,
    //             type: MENU_ITEM_TYPE.LINK,
    //             name: 'Permissions',
    //             icon: 'universal-access',
    //             link: ROUTES.PERMISSIONS.LINK(),
    //         }, {
    //             key: 42,
    //             type: MENU_ITEM_TYPE.LINK,
    //             name: 'Reports',
    //             icon: 'chart-line',
    //             link: ROUTES.REPORTS.LINK(),
    //         }, {
    //             key: 43,
    //             type: MENU_ITEM_TYPE.LINK,
    //             name: 'Settings',
    //             icon: 'cogs',
    //             link: ROUTES.SETTINGS.LINK(),
    //         }
    //     ]
    // }
];
