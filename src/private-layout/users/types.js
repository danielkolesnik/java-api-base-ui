
// local dependencies
import { createTypes } from '../../actions/types';

export const EDIT = (prefix => {
    return {
        PREFIX: new RegExp(prefix, 'i'),
        // simple action
        META: `${prefix}META`,
        DATA: `${prefix}DATA`,
        CLEAR: `${prefix}CLEAR`,
        // complex actions
        INITIALIZE: `${prefix}INITIALIZE`,
        UPDATE_DATA: `${prefix}UPDATE_DATA`,
    };
})('@users/edit/');

export const LIST = (prefix => {
    return {
        PREFIX: new RegExp(prefix, 'i'),
        // simple action
        META: `${prefix}META`,
        DATA: `${prefix}DATA`,
        SORT: `${prefix}SORT`,
        CLEAR: `${prefix}CLEAR`,
        FILTER: `${prefix}FILTER`,
        LOCATION: `${prefix}LOCATION`,
        SELECTED: `${prefix}SELECTED`,
        PAGINATION: `${prefix}PAGINATION`,
        GET_DATA: createTypes(`${prefix}GET_DATA`),
        // complex actions
        INITIALIZE: `${prefix}INITIALIZE`,
        CHANGE_SIZE: `${prefix}CHANGE_SIZE`,
        CHANGE_PAGE: `${prefix}CHANGE_PAGE`,
        CHANGE_SORT: `${prefix}CHANGE_SORT`,
        APPLY_FILTER: `${prefix}APPLY_FILTER`,
        CLEAR_FILTER: `${prefix}CLEAR_FILTER`,
        CHANGE_STATUS: `${prefix}CHANGE_STATUS`,
        SELECT_ALL: `${prefix}SELECT_ALL`,
        SELECT_ONE: `${prefix}SELECT_ONE`,
    };
})('@users/list/');
