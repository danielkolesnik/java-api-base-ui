
// outsource dependencies
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Provider, connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
// STYLES inject ...
import './style';
// polyfill
import './polyfill';
// local dependencies
import { config } from './constants';
import { history, store } from './store';
import * as ROUTES from './constants/routes';
import registerServiceWorker from './registerServiceWorker';

import NoMatch from './no-match';
import PublicLayout from './public-layout';
import PrivateLayout from './private-layout';
import Preloader from './components/preloader';
import Maintenance from './public-layout/maintenance';

/**
 * Root view which should contain all common dependencies on views
 */
class RootView extends PureComponent {
    render () {
        const { health, ready } = this.props;
        if (!health) { return (<Maintenance />); }
        if (!ready) { return (<Preloader active={true} />); }
        return [
            <ConnectedRouter key="root-1" history={history} location={history.location}>
                <Switch>
                    <Route path={ROUTES.LAYOUT_PUBLIC} component={ PublicLayout } />
                    <Route path={ROUTES.LAYOUT_PRIVATE} component={ PrivateLayout } />
                    {/* OTHERWISE */}
                    { !config.production
                        ? (<Route component={ NoMatch } />)
                        // TODO on otherwise should redirect
                        : (<Redirect to={{ pathname: ROUTES.SIGN_IN.LINK(), state: { from: history.location } }}/>)
                    }
                </Switch>
            </ConnectedRouter>,
            <ReduxToastr
                key="root-2"
                timeOut={2000}
                progressBar={true}
                newestOnTop={false}
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                preventDuplicates={true}
            />
        ];
    }
}
// Check
RootView.propTypes = {
    ready: PropTypes.bool.isRequired,
    health: PropTypes.bool.isRequired,
};
// Connect
const Root = connect(
    state => ({
        ...state.app
    }),
    null
)(RootView);

// NOTE insert Root Component in ReactDOM
ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

