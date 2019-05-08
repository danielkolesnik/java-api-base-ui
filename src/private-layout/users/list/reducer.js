
// outsource dependencies

// local dependencies
import { LIST } from '../types';

// configuration
export const initial = {
    list: [],
    selected: [],
    meta: {
        initialized: false,
        expectAnswer: true,
        errorMessage: null,
    },
    sort: {
        direction: true,
        field: 'name',
    },
    filter: {
        value: '',
        field: 'status',
    },
    pagination: {
        page: 0,
        size: 10,
        totalPages: 0,
    },
};

export default function (state = initial, action) {
    const { type, ...options } = action;
    switch (type) {
        default:
            break;
        case LIST.CLEAR:
            state = initial;
            break;
        case LIST.DATA:
            state = { ...state, list: options.list };
            break;
        case LIST.SELECTED:
            state = { ...state, selected: options.selected };
            break;
        case LIST.META:
            state = { ...state, meta: { ...state.meta, ...options } };
            break;
        case LIST.SORT:
            state = { ...state, sort: { ...state.sort, ...options } };
            break;
        case LIST.FILTER:
            state = { ...state, filter: { ...state.filter, ...options } };
            break;
        case LIST.PAGINATION:
            state = { ...state, pagination: { ...state.pagination, ...options } };
            break;
    }

    // LIST.PREFIX.test(type)&&
    // console.log(`%c USERS LIST ${type} `, 'color: #fff; background: #232323; font-size: 18px;'
    //     ,'\n state:', state
    //     ,'\n options:', options
    // );

    return state;
}
