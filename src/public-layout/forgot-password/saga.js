
// outsource dependencies
import { call, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { historyPush } from '../../store';
import { SIGN_IN } from '../../constants/routes';
import { PUBLIC } from '../../actions/types';
import { forgotPassword } from '../../services/api.service';

function * forgotPasswordSaga ({ email }) {
    try {
        yield call(forgotPassword, { email });
        yield put({ type: PUBLIC.FORGOT_PASSWORD.SUCCESS });
        yield call(historyPush, SIGN_IN.LINK());
    } catch ({ message }) {
        yield put({ type: PUBLIC.FORGOT_PASSWORD.ERROR, errorMessage: message });
    }
    yield put({ type: PUBLIC.FORGOT_PASSWORD.FINISH });
}

/**
 * connect page sagas
 *
 *
 * @public
 */
export default function * () {
    yield takeEvery(PUBLIC.FORGOT_PASSWORD.REQUEST, forgotPasswordSaga);
}
