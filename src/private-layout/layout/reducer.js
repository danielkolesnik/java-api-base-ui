
// local dependencies
import TYPE from './types';
import { MENU } from '../index';

// configuration
const initial = {
    // NOTE side navigation menu to provide ability to control menu items we should store it
    menu: MENU,
    expanded: true,
    searchInput: '',
    lastOpened: null,
    showSearch: false,
};

export default function (state = initial, action) {
    const { type, ...options } = action;
    switch (type) {
        default:
            break;
        case TYPE.CLEAR:
            state = initial;
            break;
        case TYPE.DATA:
            state = { ...state, ...options };
            break;
    }

    // TYPE.PREFIX.test(type)
    // &&console.log(`%c PRIVATE LAYOUT ${type} `, 'color: #fff; background: #232323; font-size: 18px;'
    //     , '\n state:', state
    //     , '\n action:', action
    //     // ,'\n arguments:', arguments
    // );

    return state;
}
