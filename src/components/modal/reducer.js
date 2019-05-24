
// local dependencies
import TYPE from './types';

const initialState = {
    modalType: null,
    modalProps: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        default:
            break;
        case TYPE.SHOW_MODAL:
            const {modalProps, modalType} = payload;
            state = {...state, modalProps, modalType};
            break;
        case TYPE.HIDE_MODAL:
            state = initialState;
    }

    return state;
}
