
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import app from './app';
import publicLayout from '../public-layout/sagas';
import privateLayout from '../private-layout/sagas';

// configuration

/**
 * common watcher
 *
 *
 * @public
 */
export default function * watcher () {
    yield fork(app);
    yield fork(publicLayout);
    yield fork(privateLayout);

}
