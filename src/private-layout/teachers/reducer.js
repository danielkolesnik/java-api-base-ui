
// outsource dependencies

// local dependencies
import TYPE from './types';

const initial = {
    preloader: false,
    expectAnswer: false,
    errorMessage: null,
    teachers: [],
    meta: {
        initialized: false,
        expectAnswer: true,
        errorMessage: null,
    },
};

export default function (state = initial, action) {
    const { type, payload, ...options } = action;
    switch (type) {
        default:
            break;
        case TYPE.SHOW:
            state = { ...state, errorMessage: 'message =)', payload, ...options };
            break;
        case TYPE.PRELOADER:
            state = { ...state, preloader: payload };
            break;
        case TYPE.CLEAR:
            state = { ...state, errorMessage: null, payload, ...options };
            break;
        case TYPE.GET_DATA.FINISH:
            state = {...state, teachers: payload};
            break;
        case TYPE.GET_DATA.ERROR:
            console.error('ERROR while trying to update teachers list',payload);
            // state = {...state};
            break;
        case TYPE.UPDATE.FINISH:
            // state = {...state};
            console.log('UPDATE FINISHED',payload);
            break;
        case TYPE.UPDATE.ERROR:
            console.error('ERROR while trying to update teacher',payload);
            // state = {...state};
            break;
        case TYPE.DELETE.FINISH:
            // state = {...state};
            console.log('DELETE FINISHED',payload);
            break;
        case TYPE.DELETE.ERROR:
            console.error('ERROR while trying to delete teacher',payload);
            // state = {...state};
            break;
        case TYPE.CREATE.FINISH:
            // state = {...state};
            console.log('CREATE FINISHED',payload);
            break;
        case TYPE.CREATE.ERROR:
            console.error('ERROR while trying to create teacher',payload);
            // state = {...state};
            break;
    }

    TYPE.PREFIX.test(type)
    &&console.log(`%c Welcome page ${type} `, 'color: #fff; background: #232323; font-size: 18px;'
        , '\n state:', state
        , '\n options:', options
    );

    return state;
}
