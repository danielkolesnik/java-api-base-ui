
// outsource dependencies
import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { historyPush } from '../../store';
import { SIGN_IN } from '../../constants/routes';
import { signUp } from '../../services/api.service';
import { PUBLIC } from '../../actions/types';

function * signInSaga ({ type, ...formData }) {
    try {
        const user = yield call(signUp, formData);
        yield put({ type: PUBLIC.SIGN_UP.SUCCESS, user });
        yield call(delay, 1000);
        yield call(historyPush, SIGN_IN.LINK());
    } catch ({ message }) {
        yield put({ type: PUBLIC.SIGN_UP.ERROR, errorMessage: message });
    }
    yield put({ type: PUBLIC.SIGN_UP.FINISH });
}

/**
 * connect page sagas
 *
 *
 * @public
 */
export default function * () {
    yield takeEvery(PUBLIC.SIGN_UP.REQUEST, signInSaga);
}
