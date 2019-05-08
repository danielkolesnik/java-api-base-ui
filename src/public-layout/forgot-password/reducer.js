
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
        case PUBLIC.FORGOT_PASSWORD.REQUEST:
            state = { ...state, expectAnswer: true, errorMessage: null };
            break;
        case PUBLIC.FORGOT_PASSWORD.ERROR:
            state = { errorMessage: 'There is no user with this e-mail', ...options, expectAnswer: false };
            break;
        case PUBLIC.FORGOT_PASSWORD.CLEAR:
        case PUBLIC.FORGOT_PASSWORD.SUCCESS:
            state = { ...state, ...initial };
            break;
    }

    return state;
}
