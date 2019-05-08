
// outsource dependencies
import { takeEvery, select, put, call } from 'redux-saga/effects';

// local dependencies
import TYPE from './types';

function * toggleAsideSaga () {
    const current = yield select(state => state.layout.expanded);
    yield put({ type: TYPE.DATA, expanded: !current });
}

function * submitSearchFormSaga () {
    // NOTE hide form
    yield put({ type: TYPE.DATA, showSearch: false });
    try {
        // NOTE make request if has need
        const result = yield call(() => new Promise((resolve, reject) => {
            resolve({ not: 'implemented' });
            reject({ not: 'implemented' });
        }));
        // NOTE clear value
        yield put({ type: TYPE.DATA, searchInput: '' });
        // NOTE handle success
        yield call(console.warn, 'submit Search Form not implemented yet', result);
    } catch (error) {
        // NOTE handle error
    }

}

/**
 * connect all public sagas
 *
 * @public
 */
export default function * () {
    yield takeEvery(TYPE.TOGGLE_ASIDE, toggleAsideSaga);
    yield takeEvery(TYPE.SUBMIT_SEARCH_FORM, submitSearchFormSaga);
}
