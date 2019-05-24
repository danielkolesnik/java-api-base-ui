
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import welcomeSagas from './welcome/saga';
import layoutSagas from './layout/saga';
import usersSagas from './users/sagas';
import teachersSagas from './teachers/saga';

/**
 * connect all public sagas
 *
 * @public
 */
export default function * () {
    yield fork(welcomeSagas);
    yield fork(layoutSagas);
    yield fork(usersSagas);
    yield fork(teachersSagas);

}
