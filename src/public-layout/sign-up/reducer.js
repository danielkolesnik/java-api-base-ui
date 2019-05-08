
// outsource dependencies

// local dependencies
import { PUBLIC } from '../../actions/types';

const initial = {
    expectAnswer: false,
    errorMessage: null,
};

export default function (state = initial, action) {
    const { type, ...options } = action;
    switch (type) {
        default:
            break;
        case PUBLIC.SIGN_UP.REQUEST:
            state = { ...state, expectAnswer: true, errorMessage: null };
            break;
        case PUBLIC.SIGN_UP.ERROR:
            state = { errorMessage: 'Some things went wrong...', ...options, expectAnswer: false };
            break;
        case PUBLIC.SIGN_UP.CLEAR:
        case PUBLIC.SIGN_UP.SUCCESS:
            state = { ...state, ...initial };
            break;
    }

    return state;
}
