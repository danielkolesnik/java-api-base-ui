
// local dependencies
import { config } from './index';
import is from '../services/is.service';

/**
 * prepare error to view
 *
 * @param {Array|String} errors
 * @param {String} [defMessage=null]
 * @public
 */
export function getMessage (errors, defMessage) {
    // NOTE check and setup default message
    if (!is.string(defMessage)) {
        defMessage = getMessage('UNKNOWN_ERROR', 'Some thing went wrong ...');
    } else {
        defMessage = MESSAGE[defMessage] ? MESSAGE[defMessage] : defMessage;
    }
    // NOTE try to get message from specification
    let message = '';
    if (is.array(errors)) {
        message = errors.map(e => getMessage(e)).join(', ');
    } else if (errors) { // check is error is code
        message = MESSAGE[errors];
    }

    config.DEBUG
    &&console.warn(`%c getMessage ${defMessage} `, 'background: #D93025; color: #fff; font-size: 14px; font-weigth: bold;'
        , '\n errors:', errors
        , '\n message:', message
    );
    return message || defMessage;
}

// Error messages specification
export const MESSAGE = {
    NESTED_EXCEPTION: '', // errors which will be displayed as UNKNOWN_ERROR
    UNKNOWN_ERROR: 'Some thing went wrong ...',
    CROSS_DOMAIN_REQUEST: 'Cross domain request not allowed !',
    FORBIDDEN: 'Access is denied."',

};

export default { getMessage, MESSAGE };
