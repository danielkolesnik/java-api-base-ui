
// outsource dependencies

// local dependencies
import { NEW_ID } from './spec';
import is from '../services/is.service';
import query from '../services/query.service';
// import { config } from '../constants';

export const LAYOUT_PUBLIC = '/public';
export const LAYOUT_PRIVATE = '/private';

/*-------------------------------------------------
        LAYOUT_PUBLIC nested routes
---------------------------------------------------*/
export const SIGN_IN = (base => ({
    ROUTE: base,
    REGEXP: new RegExp(`${base}.*`, 'i'),
    LINK: linkTo.bind({ url: () => base }),
}))(`${LAYOUT_PUBLIC}/sign-in`);

export const SIGN_UP = (base => ({
    ROUTE: base,
    REGEXP: new RegExp(`${base}.*`, 'i'),
    LINK: linkTo.bind({ url: () => base }),
}))(`${LAYOUT_PUBLIC}/sign-up`);

export const FORGOT_PASSWORD = (base => ({
    ROUTE: base,
    REGEXP: new RegExp(`${base}.*`, 'i'),
    LINK: linkTo.bind({ url: () => base }),
}))(`${LAYOUT_PUBLIC}/forgot-password`);

export const CHANGE_PASSWORD = (base => ({
    ROUTE: `${base}/:token?`,
    REGEXP: new RegExp(`${base}/.*`, 'i'),
    LINK: linkTo.bind({ url: ({ token }) => `${base}/${token||''}` }),
}))(`${LAYOUT_PUBLIC}/change-password`);

export const EMAIL_CONFIRMATION = (base => ({
    ROUTE: `${base}/:token?`,
    REGEXP: new RegExp(`${base}/.*`, 'i'),
    LINK: linkTo.bind({ url: ({ token }) => `${base}/${token||''}` }),
}))(`${LAYOUT_PUBLIC}/email-confirmation`);

/*-------------------------------------------------
        LAYOUT_PRIVATE nested routes
---------------------------------------------------*/
export const PRIVATE_WELCOME_SCREEN = (base => ({
    ROUTE: base,
    REGEXP: new RegExp(base, 'i'),
    LINK: linkTo.bind({ url: () => base }),
}))(`${LAYOUT_PRIVATE}/welcome`);

export const HOME_CTR = ((base, TAB) => {
    const routes = {};
    for (const name in TAB) { routes[name] = `base/${TAB[name]}`; }
    return {
        TAB,
        ROUTE: `${base}/:tab`,
        REGEXP: new RegExp(`${base}/.*`, 'i'),
        LINK: linkTo.bind({ url: ({ tab = TAB.MAIN }) => `${base}/${tab}` }),
        ...routes
    };
})(`${LAYOUT_PRIVATE}/home-page-controller`, {
    MAIN: 'main',
    TAB_1: 'test-tab-1',
    TAB_2: 'test-tab-2',
});

export const USERS = (base => ({
    ROUTE: base,
    LIST: `${base}/list`,
    EDIT: `${base}/edit/:id`,
    REGEXP: new RegExp(`${base}.*`, 'i'),
    LINK: linkTo.bind({ url: () => (`${base}/list`) }),
    LINK_EDIT: linkTo.bind({ url: ({ id = NEW_ID }) => (`${base}/edit/${id}`) }),
}))(`${LAYOUT_PRIVATE}/users`);

export const PERMISSIONS = (base => ({
    ROUTE: base,
    REGEXP: new RegExp(`${base}.*`, 'i'),
    LINK: linkTo.bind({ url: () => base }),
}))(`${LAYOUT_PRIVATE}/permissions`);

export const REPORTS = (base => ({
    ROUTE: base,
    REGEXP: new RegExp(`${base}.*`, 'i'),
    LINK: linkTo.bind({ url: () => base }),
}))(`${LAYOUT_PRIVATE}/reports`);

export const SETTINGS = (base => ({
    ROUTE: base,
    REGEXP: new RegExp(`${base}.*`, 'i'),
    LINK: linkTo.bind({ url: () => base }),
}))(`${LAYOUT_PRIVATE}/settings`);

/**
 * @example SETTINGS.LINK({ some: 'urlParam' query: {some: 'queryParam'}})
 * @param { Object } options
 * @returns { String }
 * @function linkTo
 * @private
 */
function linkTo (options) {
    options = options || {};
    // NOTE provide ability to format query params for url
    const params = is.object(options.query) ? query.format(options.query) : '';
    // NOTE prepare options to setting in url
    const opt = {};
    for (const key in options) {
        if (is.string(options[key]) || is._number(options[key])) {
            opt[key] = encodeURIComponent(options[key]);
        }
    }
    // config.DEBUG&& // log debug
    // console.log('%c linkTo => ( options ) ', 'color: #0747a6; font-weigth: bolder; font-size: 12px;'
    //     ,'\n options:', options
    //     ,'\n possibleParams:', possibleParams
    //     ,'\n params:', params
    //     ,'\n result:', `${this.url(opt)}${params}`
    // );
    return `${this.url(opt)}${params}`;
}

