
// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { push, connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';

// local dependencies
import rootSaga from './sagas';
import config from './constants';
import rootReducer from './reducers';

// export history outside of components to be able dispatch navigation actions from anywhere!
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routerMiddleware = createRouterMiddleware(history);

// Build the middleware to run our Saga
const sagaMiddleware = createSagaMiddleware();

// Apply redux extension compose for non production environment
const enchantedCompose = config.production ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

// Create store outside of root to be able dispatch actions from anywhere!
export const store = createStore(
    connectRouter(history)(rootReducer),
    enchantedCompose(applyMiddleware(routerMiddleware, sagaMiddleware))
);

// initialize saga
sagaMiddleware.run(rootSaga);

// Export
export default store;

/**
 * provide functionality to chane history outside of component
 *
 * @param {String} path
 * @public
 */
export function historyPush (path) {
    store.dispatch(push(path));
}
