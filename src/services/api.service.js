
// outsource dependencies
import axios from 'axios';

// local dependencies
import is from './is.service';
import { config } from '../constants';
import { UserModel } from '../models';
import storage from './storage.service';
import { getMessage } from '../constants/error-messages';
// absolute url to API
const API_PATH = config.serviceUrl+config.apiPath;

// private names
const AUTH_STORE = 'sAuth';
const AUTH_BEARER = 'Bearer ';
const AUTH_HEADER = 'Authorization';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

/**
 * axios instance with base configuration of app
 *
 * @public
 */
const instanceAPI = axios.create({
    baseURL: API_PATH,
    withCredentials: false,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
    },
});

/**
 * origin axios instance interceptors
 *
 * @private
 */
axios.interceptors.response.use(
    prepareResponse,
    prepareError
);

/**
 * sync check to known is user logged in
 * NOTE to known more {@link https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c | axios-interceptors-refresh-token}
 *
 * @private
 */
instanceAPI.interceptors.response.use(
    prepareResponse,
    error => ((
        isLoggedIn()
        && error.request.status === 401
        // NOTE support request may get 401 (JAVA Spring is fucking genius ...) we must skip restoring for that case
        && !/sign-out|\/oauth\/token/.test(error.config.url)
    ) ? handleRefreshSession(error) : prepareError(error))
);

/**
 * local variables to correctness refreshing session process
 *
 * @private
 */
let isRefreshing = false,
    stuckRequests = [];

/**
 * stuck request should be
 * @typedef {Object} stuckRequest
 * @property {Error}    error
 * @property {Object}   config
 * @property {Function} resolve
 * @property {Function} reject
 */

/**
 * store all requests with 401 refresh session and try send request again
 *
 * @param {Object} error
 * @return {Promise}
 * @private
 */
function handleRefreshSession (error) {
    const { config } = error;
    if (!isRefreshing) {
        isRefreshing = true;
        refreshSession()
            .then(session => {
                // NOTE resend all
                stuckRequests.map(({ config, resolve, reject }) => {
                    // set common authentication header
                    config.headers[AUTH_HEADER] = AUTH_BEARER+session[ACCESS_TOKEN];
                    instanceAPI(config).then(resolve).catch(reject);
                    // NOTE "array-callback-return"
                    return null;
                });
                // NOTE start new stuck
                stuckRequests = [];
                isRefreshing = false;
            })
            .catch(() => {
                // NOTE reject all
                stuckRequests.map(({ error, reject }) => reject(error));
                // NOTE start new stuck
                stuckRequests = [];
                isRefreshing = false;
            });
    }
    // NOTE determine first trying to restore session
    // to prevent recursive restoring session for not allowed request based on user permissions
    if (!config.wasTryingToRestore) {
        return new Promise((resolve, reject) => {
            config.wasTryingToRestore = true;
            stuckRequests.push({ config, error, resolve, reject });
        });
    }
    return prepareError(error);

}

/**
 * prepare results. Solution to prepare data ... or not
 *
 * @param {Object} response
 * @return {Object}
 * @private
 */
function prepareResponse (response) {
    // NOTE solution to prepare data
    return response.data;
}

/**
 * prepare error
 *
 * @param {Object} error
 * @return {Promise}
 * @private
 */
function prepareError (error) {
    const { response, request, config } = error;
    console.info('%c Interceptor', 'background: #EC1B24; color: #fff; font-size: 14px; font-weigth: bold;'
        , '\n error:', error
        , '\n config:', config
        , '\n request:', request
        , '\n response:', response
    );

    const data = response ? response.data : { exceptionCode: ['CROSS_DOMAIN_REQUEST'] };
    const message = getMessage(data.exceptionCode, data.message);
    return Promise.reject({ ...data, message });
}

/**
 * sync check to known is user logged in
 *
 * @param {Object} session
 * @private
 */
function recordSession ({ access_token, refresh_token }) {
    // NOTE record session at the moment primitive
    storage.set(AUTH_STORE, {
        [ACCESS_TOKEN]: access_token,
        [REFRESH_TOKEN]: refresh_token
    });
}

/**
 * sync check to known is user logged in
 *
 * @private
 */
function clearSession () {
    // NOTE clear session at the moment primitive
    storage.remove(AUTH_STORE);
}

/**
 * sync check to known is user logged in
 * @example isLoggedIn(); // => true/false
 * @returns {Boolean}
 * @public
 */
function isLoggedIn () {
    return !is.empty(storage.get(AUTH_STORE));
}

/**
 * Logout from API
 * @example logout().then( ... ).catch( ... )
 *
 * @returns {Promise}
 * @public
 */
function logout () {
    return new Promise(resolve => {
        if (!isLoggedIn()) {
            delete instanceAPI.defaults.headers[AUTH_HEADER];
            return resolve({});
        }
        instanceAPI({ method: 'post', url: `${API_PATH}/auth/logout` })
            .then(() => {
                clearSession();
                delete instanceAPI.defaults.headers[AUTH_HEADER];
                resolve({});
            })
            .catch(() => {
                clearSession();
                delete instanceAPI.defaults.headers[AUTH_HEADER];
                resolve({});
            });
    });
}

/**
 * manual authentication
 *
 * @example login().then( ... ).catch( ... )
 * @param {Object} credential => {email: 'valid email', password: 'password'}
 * @returns {Promise}
 * @public
 */
function login ({ username, password }) {
    return new Promise((resolve, reject) => {
        instanceAPI({
            method: 'post',
            url: `${API_PATH}/auth/login`,
            // params: { 'grant_type': 'password', username: email, password},
            data: { username, password },
        }).then(data => {
            const session = data.auth_token;
            // set common authentication header
            instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER+session[ACCESS_TOKEN];
            // check token on API
            getSelf().then(user => {
                recordSession(session);
                resolve(user);
            }).catch(error => logout().finally(() => reject(error)));
        }).catch(error => logout().finally(() => reject(error)));
    });
}

/**
 * try to refresh session using refresh_token
 *
 * @example refreshSession().then( ... ).catch( ... )
 * @returns {Promise}
 * @public
 */
function refreshSession () {
    return new Promise((resolve, reject) => {
        // remove authentication header if it present
        delete instanceAPI.defaults.headers[AUTH_HEADER];
        // get refresh token
        const refreshToken = (storage.get(AUTH_STORE)||{})[REFRESH_TOKEN];
        // NOTE use the axios origin instance to refresh and store new session data
        axios.post(`${API_PATH}/oauth/token/refresh-token`, { refreshToken })
            .then(data => {
                // alias
                const session = data;
                recordSession(session);
                // set common header
                instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER+session[ACCESS_TOKEN];
                resolve(session);
            })
            // NOTE execute application logout
            .catch(error => logout().then(() => reject(error)));
    });
}

/**
 * try to restore session after reloading application page
 *
 * @example restoreSession().then( ... ).catch( ... )
 * @returns {Promise}
 * @public
 */
function restoreSession () {
    return new Promise((resolve, reject) => {
        // do not have session at all
        if (!isLoggedIn()) {
            return logout().finally(() => reject({}));
        }
        // get from storage
        const session = storage.get(AUTH_STORE);
        // set common authentication header
        instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER+session[ACCESS_TOKEN];
        // check token on API
        getSelf()
            .then(user => {
                recordSession(storage.get(AUTH_STORE));
                resolve(user);
            })
            // NOTE execute application logout
            .catch(error => logout().finally(() => reject(error)));
    });
}

/**
 * get logged user
 *
 * @returns {Promise}
 * @public
 */
function getSelf () {
    return UserModel.getSelf();
}

/**
 * check token for changing password
 *
 * @example verifyChangePasswordToken().then( ... ).catch( ... )
 * @param {Object} data
 * @returns {Promise}
 * @public
 */
function verifyPasswordToken ({ token }) {
    // NOTE used the origin axios instance
    return axios.post(`${API_PATH}/oauth/token/forgot-password/exists`, { token });
}

/**
 * change password
 *
 * @example verifyChangePasswordToken().then( ... ).catch( ... )
 * @param {Object} data
 * @returns {Promise}
 * @public
 */
function changePassword ({ token, password }) {
    // NOTE used the origin axios instance
    return axios({
        method: 'post',
        url: `${API_PATH}/oauth/token/forgot-password`,
        params: { token, password },
    });
}

/**
 * create user
 * @example verifyChangePasswordToken().then( ... ).catch( ... )
 * @param {Object} data
 * @returns {Promise}
 * @public
 */
function signUp (data) {
    // NOTE used the origin axios instance
    return axios({
        data,
        method: 'post',
        url: `${API_PATH}/oauth/token/sign-up`,
    });
}

/**
 * change password
 *
 * @example verifyChangePasswordToken().then( ... ).catch( ... )
 * @param {Object} data
 * @returns {Promise}
 * @public
 */
function forgotPassword ({ email }) {
    // NOTE used the origin axios instance
    return axios.get(`${API_PATH}/oauth/token/forgot-password`, { params: { email } });
}

/**
 * change password
 *
 * @example verifyChangePasswordToken().then( ... ).catch( ... )
 * @param {Object} data
 * @returns {Promise}
 * @public
 */
function emailConfirmation ({ token }) {
    // NOTE used the origin axios instance
    return axios.get(`${API_PATH}/oauth/token/confirmation`, { params: { token } });
}

/**
 * check health of server
 *
 * @example checkHealth().then( ... ).catch( ... )
 * @returns {Promise}
 * @public
 */
function checkHealth () {
    // NOTE used the origin axios instance
    // TODO expect real API ping
    return axios.get(`${API_PATH}/actuator/info`);
    // return axios.get(`${API_PATH}/actuator/health`);
}

// named export
export {
    instanceAPI,
    AUTH_STORE,
    AUTH_HEADER,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    login,
    logout,
    signUp,
    getSelf,
    isLoggedIn,
    checkHealth,
    forgotPassword,
    restoreSession,
    refreshSession,
    changePassword,
    emailConfirmation,
    verifyPasswordToken,
};
