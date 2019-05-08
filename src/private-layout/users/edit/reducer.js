
// outsource dependencies

// local dependencies
import { EDIT } from '../types';

// configuration
const initial = {
    initialized: false,
    expectAnswer: true,
    errorMessage: null,
    data: {},
};

export default function (state = initial, action) {
    const { type, ...options } = action;
    switch (type) {
        default:
            break;
        case EDIT.CLEAR:
            state = initial;
            break;
        case EDIT.DATA:
            state = { ...state, data: { ...options } };
            break;
        case EDIT.META:
            state = { ...state, ...options, data: state.data };
            break;
    }

    // EDIT.PREFIX.test(type)&&
    // console.log(`%c SPONSOR EDIT ${type} `, 'color: #fff; background: #232323; font-size: 18px;'
    //     ,'\n state:', state
    //     ,'\n action:', action
    //     // ,'\n arguments:', arguments
    // );

    return state;
}
