
// outsource dependencies
import React from 'react';
import PropTypes from 'prop-types';

// local dependencies
import is from '../services/is.service';

// NOTE all filters
export const filters = {
    enum: toEnumFilter,
    truncate: truncateFilter,
    humanize: humanizeFilter,
    duration: durationFilter,
};

// NOTE list of filter types
const FILTER_TYPE = {};
for (const name of Object.keys(filters)) {
    FILTER_TYPE[toEnumFilter(name)] = name;
}
export { FILTER_TYPE };

/**
 *
 * @example
 <Filter
    tag="strong"
    type={FILTER_TYPE.TRUNCATE}
    options={{length: 12, end: '...', breakOnWord: true}}
        >
    { text ? text : 'default text' }
 </Filter>

 ...

 <Filter text={ text ? text : 'default text' } />

 * @param {Object} props
 * @public
 */
export function Filter ({ type, children, text, options, tag, ...attr }) {
    // NOTE prevent exception
    if (!is.function(filters[type])) {
        return (<Tag {...attr}>{ `Incorrect filter type ${String(type)}`}</Tag>);
    }
    const Tag = tag;
    // NOTE able to take a text from content
    if (is.string(children) && !text) { text = children; }
    return (<Tag {...attr}>{ filters[type](text, options) }</Tag>);
}
// Check
Filter.propTypes = {
    tag: PropTypes.string,
    text: PropTypes.string,
    options: PropTypes.object,
    children: PropTypes.string,
    type: PropTypes.oneOf(Object.keys(FILTER_TYPE).map(key => FILTER_TYPE[key])),
};
// Def
Filter.defaultProps = {
    text: '',
    children: '',
    tag: 'span',
    options: {},
    type: FILTER_TYPE.HUMANIZE,
};
// Shortcuts
export function Enum (props) { return (<Filter {...props} type={FILTER_TYPE.ENUM} />); }
export function Humanize (props) { return (<Filter {...props} type={FILTER_TYPE.HUMANIZE} />); }
export function Truncate (props) { return (<Filter {...props} type={FILTER_TYPE.TRUNCATE} />); }
export function Duration (props) { return (<Filter {...props} type={FILTER_TYPE.DURATION} />); }


/**
 * @description method to format string with server side ENUM value to human pretty view
 * @param {String} string
 * @returns {String}
 * @public
 */
function humanizeFilter (string) {
    //
    return String(string)
    // from camel case
        .replace(/([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g, '$1$4 $2$3$5')
        // .replace(/([a-z]){1,1}([A-Z])/g, function ( sib, f, s ) { return f+" "+s; })
        // spec
        .replace(/[_-]+/g, ' ')
        // normalize
        .replace(/\s+/g, ' ')
        // trim
        .replace(/^\s*|\s*$/g, '')
        // capitalize
        .toLowerCase()
        .replace(/^.{1,1}/, function (sib) { return sib.toUpperCase(); });
}

/**
 * handle string and make enum from it
 *
 * @param {Number} str
 * @returns {String}
 * @public
 */
function toEnumFilter (str = '') {
    return String(str)
        .replace(/[^\w\d\s]/gi, '')
        .replace(/[\s]+/g, '_')
        .toUpperCase();
}

/**
 * cut string by options
 *
 * @param {String} source
 * @param {Object} options
 * @returns {String}
 * @public
 */
function truncateFilter (source, { length = 10, end = '...', breakOnWord = false }) {
    // NOTE skip cases
    if (isNaN(length) || length <= 0) { return source; }
    if (!is.string(source) || source.length <= length) { return source; }
    // cut source
    source = source.substring(0, length);
    // cut more to the spice symbol
    if (!breakOnWord) {
        const lastSpace = source.lastIndexOf(' ');
        // get last space
        if (lastSpace !== -1) {
            source = source.substr(0, lastSpace);
        }
    }
    return source.trim() + end;
}

// equivalent in second
const equal = {
    // day 24*60*60=86400
    days: 86400,
    // hour 60*60=3600
    hours: 3600,
    // minute 60
    minutes: 60,
    // second 1
    seconds: 1,
};
// matches for replace
const reg = { days: '[D]', hours: '[H]', minutes: '[M]', seconds: '[S]', };
/**
 * handle string and make enum from it
 *
 * @example duration(100, '[D]d [H]h [M]m [S]s');
 *
 * @param {Number} value
 * @param {String} [format]
 * @returns {String}
 * @public
 */
function durationFilter (value, format) {
    value = is.countable(value) ? Math.abs(value) : 0;
    format = is.string(format) ? format : `${reg.days}d ${reg.hours}h ${reg.minutes}m ${reg.seconds}s`;
    let days = 0;
    let hours = 0;
    let minutes = 0;

    if (new RegExp(reg.days).test(format) && value >= equal.days) {
        days = Math.floor(value/equal.days);
        value-=(days*equal.days);
    }

    if (new RegExp(reg.hours).test(format) && value >= equal.hours) {
        hours = Math.floor(value/equal.hours);
        value-=(hours*equal.hours);
    }

    if (new RegExp(reg.minutes).test(format) && value >= equal.minutes) {
        minutes = Math.floor(value/equal.minutes);
        value-=(minutes*equal.minutes);
    }
    return format
        .replace(reg.days, days)
        .replace(reg.hours, hours)
        .replace(reg.minutes, minutes)
        .replace(reg.seconds, value);
}
