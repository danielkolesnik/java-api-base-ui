
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import signInSagas from './sign-in/saga';
import signUpSagas from './sign-up/saga';
import forgotPassword from './forgot-password/saga';
import changePassword from './change-password/saga';
import emailConfirmation from './email-confirmation/saga';

/**
 * connect all public sagas
 *
 *
 * @public
 */
export default function * () {
    yield fork(signInSagas);
    yield fork(signUpSagas);
    yield fork(forgotPassword);
    yield fork(changePassword);
    yield fork(emailConfirmation);
}
