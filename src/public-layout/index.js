
// outsource dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import SignIn from './sign-in';
import SignUp from './sign-up';
import NoMatch from '../no-match';
import { config } from '../constants';
import * as ROUTES from '../constants/routes';
import ForgotPassword from './forgot-password';
import ChangePassword from './change-password';
import EmailConfirmation from './email-confirmation';

class PublicLayout extends PureComponent {
    render () {
        const { location } = this.props;
        return (<Switch>
            <Route path={ROUTES.SIGN_IN.ROUTE} component={ SignIn } />
            <Route path={ROUTES.SIGN_UP.ROUTE} component={ SignUp } />
            <Route path={ROUTES.FORGOT_PASSWORD.ROUTE} component={ ForgotPassword } />
            <Route path={ROUTES.CHANGE_PASSWORD.ROUTE} component={ ChangePassword } />
            <Route path={ROUTES.EMAIL_CONFIRMATION.ROUTE} component={ EmailConfirmation } />
            {/* OTHERWISE */}
            { !config.production
                ? (<Route component={ NoMatch } />)
                // TODO on otherwise should redirect
                : (<Redirect to={{ pathname: ROUTES.SIGN_IN.LINK(), state: { from: location } }}/>)
            }
        </Switch>);
    }
}
// Check
PublicLayout.propTypes = {
    location: PropTypes.object.isRequired,
};

export default PublicLayout;
