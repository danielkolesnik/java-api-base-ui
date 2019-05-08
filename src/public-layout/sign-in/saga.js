
// outsource dependencies
import { call, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { historyPush } from '../../store';
import { APP } from '../../actions/types';
import { login } from '../../services/api.service';
import { PRIVATE_WELCOME_SCREEN } from '../../constants/routes';

function * signInSaga ({ type, ...formData }) {
    try {
        const user = yield call(login, formData);
        yield put({ type: APP.SIGN_IN.SUCCESS, user });
        yield call(historyPush, PRIVATE_WELCOME_SCREEN.LINK());
    } catch ({ message }) {
        yield put({ type: APP.SIGN_IN.ERROR, errorMessage: message });
    }
    yield put({ type: APP.SIGN_IN.FINISH });
}

/**
 * connect page sagas
 *
 *
 * @public
 */
export default function * () {
    yield takeEvery(APP.SIGN_IN.REQUEST, signInSaga);
}
