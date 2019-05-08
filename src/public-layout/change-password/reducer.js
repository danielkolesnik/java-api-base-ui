
// outsource dependencies

// local dependencies
import { PUBLIC } from '../../actions/types';

const initial = {
    token: null,
    invalidToken: false,
    expectAnswer: true,
    errorMessage: null,
};

export default function (state = initial, action) {
    const { type, ...options } = action;
    switch (type) {
        default:
            break;
        case PUBLIC.VALIDATE_PASSWORD_TOKEN.SUCCESS:
            state = { ...state, ...options, expectAnswer: false, invalidToken: false };
            break;
        case PUBLIC.VALIDATE_PASSWORD_TOKEN.ERROR:
            state = { ...state, ...options, expectAnswer: false, invalidToken: true };
            break;
        case PUBLIC.CHANGE_PASSWORD.REQUEST:
            state = { ...state, expectAnswer: true, errorMessage: null };
            break;
        case PUBLIC.CHANGE_PASSWORD.ERROR:
            state = { ...state, errorMessage: 'There is no user with this e-mail.', ...options, expectAnswer: false };
            break;
        case PUBLIC.CHANGE_PASSWORD.CLEAR:
        case PUBLIC.CHANGE_PASSWORD.SUCCESS:
            state = { ...state, ...options, expectAnswer: false, errorMessage: null };
            break;
    }

    // /CHANGE_PASSWORD/.test(type)&&
    // console.log(`%c REDUCER changePassword ${action.type} `, 'color: #fff; background: #232323; font-size: 18px;'
    //     ,'\n state:', state
    //     ,'\n action:', action
    //     // ,'\n arguments:', arguments
    // );

    return state;
}
