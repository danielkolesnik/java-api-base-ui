
// outsource dependencies

// local dependencies
import { APP } from '../../actions/types';

const initial = {
    expectAnswer: false,
    errorMessage: null,
};

export default function (state = initial, action) {
    const { type, ...options } = action;
    switch (type) {
        default:
            break;
        case APP.SIGN_IN.REQUEST:
            state = { ...state, expectAnswer: true, errorMessage: null };
            break;
        case APP.SIGN_IN.ERROR:
            state = { errorMessage: 'Email and/or password does not match.', ...options, expectAnswer: false };
            break;
        case APP.SIGN_IN.CLEAR:
        case APP.SIGN_IN.SUCCESS:
            state = { ...state, ...initial };
            break;
    }

    return state;
}
