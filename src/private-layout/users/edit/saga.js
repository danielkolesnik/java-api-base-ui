
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { EDIT } from '../types';
import { UserModel } from '../../../models';
import { historyPush } from '../../../store';
import { NEW_ID } from '../../../constants/spec';
import { USERS } from '../../../constants/routes';


function * initializeSaga (action) {
    yield put({ type: EDIT.CLEAR });
    try {
        const result = yield call(getData, action.id);
        yield put({ type: EDIT.DATA, ...result });
    } catch ({ message }) {
        yield call(toastr.error, 'Error', message);
        yield put({ type: EDIT.META, errorMessage: message });
    }
    yield put({ type: EDIT.META, expectAnswer: false, initialized: true });
}

function * updateDataSaga ({ type, id, ...options }) {
    yield put({ type: EDIT.META, expectAnswer: true, errorMessage: null });
    try {
        const result = yield call(updateData, id, options);
        yield put({ type: EDIT.DATA, ...result });
        if (id === NEW_ID) {
            // NOTE update url take id from results
            yield call(historyPush, USERS.LINK_EDIT(result));
        }
        yield call(toastr.success, 'User', 'Data was successfully updated.');
    } catch ({ message }) {
        yield call(toastr.error, 'Error', message);
        yield put({ type: EDIT.META, errorMessage: message });
    }
    yield put({ type: EDIT.META, expectAnswer: false });
}

/**
 * connect all public sagas
 *
 * @public
 */
export default function * () {
    yield takeEvery(EDIT.INITIALIZE, initializeSaga);
    yield takeEvery(EDIT.UPDATE_DATA, updateDataSaga);
}

/**
 *
 * @public
 */
function getData (id) {
    return id === NEW_ID ? UserModel.create({ id: NEW_ID }) : UserModel.getById(id);
}
/**
 *
 * @param {String|Number} id
 * @param {Object} data
 * @public
 */
function updateData (id, data = {}) {
    // NOTE convert date to known to backend time format
    if (data.birthday && data.birthday.isValid()) {
        data.birthday = data.birthday.format('YYYY-MM-DD');
    }
    // NOTE "spread" break the model instance
    return UserModel.partiallyUpdate(id, data);
}
