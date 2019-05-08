
import { TMP } from '../actions/types';

export default function (state = {}, action) {
    const { type, name, ...options } = action;
    if (!name) { return state; }
    const initial = `initial_${name}`;
    switch (type) {
        default:
            break;
        case TMP.ADD:
            state = { ...state, [name]: options.state, [initial]: options.state };
            break;
        case TMP.REMOVE:
            state = { ...state, [name]: null, [initial]: null };
            break;
        case TMP.CLEAR:
            state = { ...state, [name]: state[initial] };
            break;
        case TMP.UPDATE:
            state = { ...state, [name]: options.state };
            break;
    }

    // /@tmp/.test(type)&&
    // console.log(`%c REDUCER ${action.type} `, 'color: #fff; background: #232323; font-size: 18px;'
    //     ,'\n state:', state
    //     ,'\n action:', action
    // );

    return state;
}
