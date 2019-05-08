
// outsource dependencies
import { delay } from 'redux-saga';
import { take, call, put, takeEvery } from 'redux-saga/effects';

// local dependencies
import { APP } from '../actions/types';
import { checkHealth, restoreSession, getSelf, logout } from '../services/api.service';

function * getLoggedUser () {
    try {
        const user = yield call(getSelf);
        yield put({ type: APP.GET_SELF.SUCCESS, user });
    } catch (error) {
        yield put({ type: APP.GET_SELF.ERROR, error });
    }
}

function * signOut () {
    try {
        yield call(logout);
    } catch (e) {
        // NOTE do nothing
    }
    // NOTE no need to redirect private layout make it by him self
    yield put({ type: APP.SIGN_OUT.FINISH });
}

function * health () {
    try {
        yield call(checkHealth);
        yield put({ type: APP.HEALTH.SUCCESS });
        yield put({ type: APP.INIT.REQUEST });
    } catch (e) {
        // NOTE start asynchronous recursion until the service starts
        yield delay(5 * 1000);
        yield put({ type: APP.HEALTH.REQUEST });
    }
}

function * appInit () {
    try {
        const user = yield call(restoreSession);
        yield put({ type: APP.INIT.FINISH, user, auth: true });
    } catch (e) {
        yield put({ type: APP.SIGN_OUT.REQUEST });
        yield take(APP.SIGN_OUT.FINISH);
        yield put({ type: APP.INIT.FINISH });
    }
}

/**
 * common request handler
 *
 *
 * @public
 */
export default function * () {
    yield takeEvery(APP.INIT.REQUEST, appInit);
    yield takeEvery(APP.HEALTH.REQUEST, health);
    yield takeEvery(APP.SIGN_OUT.REQUEST, signOut);
    yield takeEvery(APP.GET_SELF.REQUEST, getLoggedUser);

    // initialization of app start from check health
    yield put({ type: APP.HEALTH.REQUEST });
}
