
/**
 * @description method to parse url query
 * @param {String} query
 * @returns {Object}
 * @public
 */
export function parseQueryParams (query) {
    let list = query.replace(/^[\?]/, '').split('&'), result = {}; // eslint-disable-line
    for (const item of list) {
        const [field, value] = item.split('=');
        result[field] = decodeURIComponent(value);
    }
    return result;
}

/**
 * @description method to format object data to url query
 * NOTE only one level of nesting
 * @param {Object} params
 * @returns {String}
 * @public
 */
export function formatQueryParams (params) {
    let query = '';
    for (const name in params) {
        query += `${name}=${encodeURIComponent(String(params[name]))}&`;
    }
    // NOTE remove last "&"
    return !query ? '' : `?${query.substring(0, query.length-1)}`;
}

// TEST =))
// let test = { qwe: 2, bool: true, some: 'val', obj: {} };
// parseQueryParams(formatQueryParams(test));

export default {
    parse: parseQueryParams,
    format: formatQueryParams,
};
