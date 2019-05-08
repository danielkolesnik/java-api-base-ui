
// outsource dependencies

// local dependencies
import { PUBLIC } from '../../actions/types';

const initial = {
    invalidToken: false,
    expectAnswer: true,
    errorMessage: null,
};

export default function (state = initial, action) {
    const { type } = action;
    switch (type) {
        default:
            break;
        case PUBLIC.EMAIL_CONFIRMATION.SUCCESS:
            state = { expectAnswer: false, invalidToken: false };
            break;
        case PUBLIC.EMAIL_CONFIRMATION.ERROR:
            state = { expectAnswer: false, invalidToken: true };
            break;
    }

    return state;
}
