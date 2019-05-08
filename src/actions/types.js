
// define rule to crate actions pack for async actions
export const ASYNC_SUFFIX = {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FINISH: 'FINISH',
    ERROR: 'ERROR',
    CLEAR: 'CLEAR',
};

/**
 * create object with types to build async actions package
 *
 * @param {String} action - name of action to create many action
 * @param {Object} [expand={}] - provide ability to add non standard actions
 * @return {Object}
 * @public
 */
export function createTypes (action, expand = {}) {
    for (const name in ASYNC_SUFFIX) {
        expand[name] = `${action}_${ASYNC_SUFFIX[name]}`;
    }
    return expand;
}

export const APP = (prefix => ({
    INIT: createTypes(`${prefix}INIT`),
    HEALTH: createTypes(`${prefix}HEALTH`),
    SIGN_IN: createTypes(`${prefix}SIGN_IN`),
    SIGN_OUT: createTypes(`${prefix}SIGN_OUT`),
    GET_SELF: createTypes(`${prefix}GET_SELF`),
}))('@app/');

export const PUBLIC = (prefix => ({
    SIGN_UP: createTypes(`${prefix}/SIGN_UP`),
    FORGOT_PASSWORD: createTypes(`${prefix}FORGOT_PASSWORD`),
    CHANGE_PASSWORD: createTypes(`${prefix}CHANGE_PASSWORD`),
    EMAIL_CONFIRMATION: createTypes(`${prefix}EMAIL_CONFIRMATION`),
    VALIDATE_PASSWORD_TOKEN: createTypes(`${prefix}VALIDATE_PASSWORD_TOKEN`),

}))('@public/');

export const PRIVATE = (prefix => ({
    TOGGLE_ASIDE: `${prefix}/TOGGLE_ASIDE`,
}))('@private/');

export const TMP = (prefix => ({
    UPDATE: `${prefix}UPDATE`,
    CLEAR: `${prefix}CLEAR`,
    REMOVE: `${prefix}REMOVE`,
    ADD: `${prefix}ADD`,
}))('@tmp/');
