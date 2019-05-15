
// outsource dependencies

// local dependencies
import TYPE from './types';

const initial = {
    expectAnswer: false,
    errorMessage: null,
};

export default function (state = initial, action) {
    const { type, ...options } = action;
    switch (type) {
        default:
            break;
        case TYPE.SHOW:
            state = { ...state, errorMessage: 'message =)', ...options };
            break;
        case TYPE.CLEAR:
            state = { ...state, errorMessage: null, ...options };
            break;
    }

    TYPE.PREFIX.test(type)
    &&console.log(`%c Welcome page ${type} `, 'color: #fff; background: #232323; font-size: 18px;'
        , '\n state:', state
        , '\n options:', options
    );

    return state;
}
