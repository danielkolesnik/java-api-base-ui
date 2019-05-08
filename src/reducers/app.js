
import { APP } from '../actions/types';

const initial = {
    health: false,
    auth: false,
    ready: false,
    user: null,
};

export default function (state = initial, action) {
    const { type, ...options } = action;

    switch (type) {
        default:
            break;
        case APP.INIT.FINISH:
            state = { ...state, ...options, ready: true };
            break;
        case APP.SIGN_IN.SUCCESS:
            state = { ...state, ...options, auth: true };
            break;
        case APP.SIGN_OUT.FINISH:
        case APP.GET_SELF.ERROR:
        case APP.SIGN_IN.ERROR:
            state = { ...state, ...options, user: null, auth: false };
            break;
        case APP.HEALTH.SUCCESS:
            state = { ...state, ...options, health: true };
            break;
        case APP.HEALTH.ERROR:
            state = { ...state, ...initial, health: false };
            break;
    }
    // /@app/.test(type)
    // &&console.log(`%c REDUCER ${action.type} `, 'color: #fff; background: #232323; font-size: 18px;'
    //     , '\n state:', state
    //     , '\n action:', action
    //     // ,'\n arguments:', arguments
    // );
    return state;
}
