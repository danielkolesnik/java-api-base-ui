
// outsource dependencies
import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { historyPush } from '../../store';
import { SIGN_IN } from '../../constants/routes';
import { PUBLIC } from '../../actions/types';
import { emailConfirmation } from '../../services/api.service';

function * validateEmailTokenSaga ({ token }) {
    try {
        yield call(emailConfirmation, { token });
        yield put({ type: PUBLIC.EMAIL_CONFIRMATION.SUCCESS, token });
        yield call(delay, 1000);
        yield call(historyPush, SIGN_IN.LINK());
    } catch (error) {
        yield put({ type: PUBLIC.EMAIL_CONFIRMATION.ERROR });
    }
    yield put({ type: PUBLIC.EMAIL_CONFIRMATION.FINISH });
}

/**
 * connect page sagas
 *
 *
 * @public
 */
export default function * () {
    yield takeEvery(PUBLIC.EMAIL_CONFIRMATION.REQUEST, validateEmailTokenSaga);
}
