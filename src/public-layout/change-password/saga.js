
// outsource dependencies
import { select, call, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { historyPush } from '../../store';
import { SIGN_IN } from '../../constants/routes';
import { PUBLIC } from '../../actions/types';
import { changePassword, verifyPasswordToken } from '../../services/api.service';

function * changePasswordSaga ({ password }) {
    try {
        const token = yield select(state => state.changePassword.token);
        yield call(changePassword, { token, password });
        yield put({ type: PUBLIC.CHANGE_PASSWORD.SUCCESS });
        yield call(historyPush, SIGN_IN.LINK());
    } catch ({ message }) {
        yield put({ type: PUBLIC.CHANGE_PASSWORD.ERROR, errorMessage: message });
    }
    yield put({ type: PUBLIC.CHANGE_PASSWORD.FINISH });
}

function * validatePasswordTokenSaga ({ token }) {
    try {
        yield call(verifyPasswordToken, { token });
        yield put({ type: PUBLIC.VALIDATE_PASSWORD_TOKEN.SUCCESS, token });
    } catch (error) {
        yield put({ type: PUBLIC.VALIDATE_PASSWORD_TOKEN.ERROR });
    }
    yield put({ type: PUBLIC.VALIDATE_PASSWORD_TOKEN.FINISH });
}

/**
 * connect page sagas
 *
 *
 * @public
 */
export default function * () {
    yield takeEvery(PUBLIC.CHANGE_PASSWORD.REQUEST, changePasswordSaga);
    yield takeEvery(PUBLIC.VALIDATE_PASSWORD_TOKEN.REQUEST, validatePasswordTokenSaga);
}
