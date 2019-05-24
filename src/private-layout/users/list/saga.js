
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { takeEvery, put, call, take, select } from 'redux-saga/effects';

// local dependencies
import { LIST } from '../types';
import { UserModel } from '../../../models';
import is from '../../../services/is.service';
import { initial as defVal } from './reducer';
import { USERS } from '../../../constants/routes';
import query from '../../../services/query.service';
import { allowedFilters, allowedSort } from './index';
import store, { history, historyPush } from '../../../store';

// configure
// const changeStatus = UserModel.changeStatuses.bind(UserModel);

function * initializeSaga () {
    yield put({ type: LIST.CLEAR });
    // NOTE take data from location and setup verified params
    const params = yield call(getQueryParams, query.parse(history.location.search));
    // NOTE setup data in to reducer
    yield put({ type: LIST.SORT, field: params.sortF, direction: Boolean(Number(params.sortD)) });
    yield put({ type: LIST.FILTER, field: params.filterF, value: params.filterV });
    yield put({ type: LIST.PAGINATION, page: Number(params.page), size: Number(params.size) });
    // NOTE send request
    yield put({ type: LIST.GET_DATA.REQUEST });
    yield take(LIST.GET_DATA.FINISH);
    // NOTE initialized
    yield put({ type: LIST.META, initialized: true, expectAnswer: false });
}

function * getDataSaga () {
    try {
        const reducer = yield select(state => state.users.list);
        const result = yield call(getList, reducer);
        yield put({ type: LIST.DATA, list: result.content });
        yield put({ type: LIST.PAGINATION, totalPages: result.totalPages });
        // NOTE update location
        yield call(updateLocation, reducer);
    } catch ({ message }) {
        yield call(toastr.error, 'Error', message);
        yield put({ type: LIST.META, errorMessage: message });
    }
    yield put({ type: LIST.GET_DATA.FINISH });
}

function * clearFilterSaga () {
    // NOTE remove error and on preloader
    yield put({ type: LIST.META, expectAnswer: true, errorMessage: null });
    // NOTE clear filter value
    yield put({ type: LIST.FILTER, value: '' });
    // NOTE send request
    yield put({ type: LIST.GET_DATA.REQUEST });
    yield take(LIST.GET_DATA.FINISH);
    // NOTE preloader off
    yield put({ type: LIST.META, expectAnswer: false });
}

function * changeSizeSaga ({ size }) {
    // NOTE remove error and on preloader
    yield put({ type: LIST.META, expectAnswer: true, errorMessage: null });
    // NOTE setup size and reset page counter
    yield put({ type: LIST.PAGINATION, size: Number(size), page: 0 });
    // NOTE send request
    yield put({ type: LIST.GET_DATA.REQUEST });
    yield take(LIST.GET_DATA.FINISH);
    // NOTE preloader off
    yield put({ type: LIST.META, expectAnswer: false });
}

function * changePageSaga ({ page }) {
    // NOTE remove error and on preloader
    yield put({ type: LIST.META, expectAnswer: true, errorMessage: null });
    // NOTE setup page
    yield put({ type: LIST.PAGINATION, page });
    // NOTE send request
    yield put({ type: LIST.GET_DATA.REQUEST });
    yield take(LIST.GET_DATA.FINISH);
    // NOTE preloader off
    yield put({ type: LIST.META, expectAnswer: false });
}

function * applyFilterSaga ({ value, field }) {
    // NOTE remove error and on preloader
    yield put({ type: LIST.META, expectAnswer: true, errorMessage: null });
    // NOTE reset page
    yield put({ type: LIST.PAGINATION, page: 0 });
    // NOTE apply filter
    yield put({ type: LIST.FILTER, value, field });
    // NOTE send request
    yield put({ type: LIST.GET_DATA.REQUEST });
    yield take(LIST.GET_DATA.FINISH);
    // NOTE preloader off
    yield put({ type: LIST.META, expectAnswer: false });
}

function * changeSortSaga ({ field }) {
    // NOTE remove error and on preloader
    yield put({ type: LIST.META, expectAnswer: true, errorMessage: null });
    // NOTE get previous sort values
    const sort = yield select(state => state.users.list.sort);
    // NOTE detect and setup direction for sorting based on previous value
    const direction = sort.field === field ? !sort.direction : true;
    // NOTE reset page
    yield put({ type: LIST.PAGINATION, page: 0 });
    // NOTE apply sort
    yield put({ type: LIST.SORT, field, direction });
    // NOTE send request
    yield put({ type: LIST.GET_DATA.REQUEST });
    yield take(LIST.GET_DATA.FINISH);
    // NOTE preloader off
    yield put({ type: LIST.META, expectAnswer: false });
}

function * selectAllSaga ({ clear }) {
    // NOTE get selected
    let { list, selected } = yield select(state => state.users.list);
    // NOTE determine what supposed to do
    if (selected.length || clear) {
        selected = [];
    } else {
        selected = list.slice(0);
    }
    yield put({ type: LIST.SELECTED, selected });
}

function * selectOneSaga ({ item }) {
    // NOTE get selected
    const selected = yield select(state => state.users.list.selected);
    // NOTE determine what supposed to do
    const index = selected.indexOf(item);
    if (index === -1) {
        selected.push(item);
    } else {
        selected.splice(index, 1);
    }
    // NOTE to run react render ...
    yield put({ type: LIST.SELECTED, selected: selected.slice(0) });
}

function * changeStatusSaga ({ status, selected }) {
    // NOTE remove error and on preloader
    yield put({ type: LIST.META, expectAnswer: true, errorMessage: null });
    // NOTE change items status
    // yield call(changeStatus, status, selected.map(({ id }) => ({ id })));
    // NOTE clear selected
    yield put({ type: LIST.SELECTED, selected: [] });
    // NOTE send request
    yield put({ type: LIST.GET_DATA.REQUEST });
    yield take(LIST.GET_DATA.FINISH);
    // NOTE preloader off
    yield put({ type: LIST.META, expectAnswer: false });
}

/**
 * connect all public sagas
 *
 * @public
 */
export default function * () {
    yield takeEvery(LIST.INITIALIZE, initializeSaga);
    yield takeEvery(LIST.GET_DATA.REQUEST, getDataSaga);
    yield takeEvery(LIST.CLEAR_FILTER, clearFilterSaga);
    yield takeEvery(LIST.CHANGE_SIZE, changeSizeSaga);
    yield takeEvery(LIST.CHANGE_PAGE, changePageSaga);
    yield takeEvery(LIST.APPLY_FILTER, applyFilterSaga);
    yield takeEvery(LIST.CHANGE_SORT, changeSortSaga);
    yield takeEvery(LIST.SELECT_ALL, selectAllSaga);
    yield takeEvery(LIST.SELECT_ONE, selectOneSaga);
    yield takeEvery(LIST.CHANGE_STATUS, changeStatusSaga);

    // NOTE clear selected on each request
    yield takeEvery(LIST.GET_DATA.REQUEST, selectAllSaga, { type: 'ignored', clear: true });
    // NOTE setup listener on location change to listen history back event (POP)
    yield call(history.listen, historyBackListen);
}

function historyBackListen ({ pathname }, action) {
    if (action !== 'POP' || pathname !== USERS.LIST) { return; }
    // NOTE reinitialize search from query string after the page path was changed
    // NOTE this event will fired before the url was changed
    setTimeout(() => store.dispatch({ type: LIST.INITIALIZE }), 0);
}

/**
 * wrapper to get list
 *
 * @param {Object} reducer
 * @public
 */
function getList ({ pagination: { page, size }, sort: { field, direction }, filter }) {
    return UserModel.getPage(
        { page, size, sort: `${field},${direction ? 'ASC' : 'DESC'}` },
        filter.value ? { [filter.field]: filter.value } : {},
        // TODO backend must implement "manage" dto type for users - override when done
        { dto: 'full' }
    );
}

/**
 * helper to determine correctness url params
 *
 * @param {Object} query
 * @return {Object}
 * @public
 */
function getQueryParams (query) {
    return {
        page: is.countable(query.page) ? query.page : 0,
        size: is.countable(query.size) ? query.size : 10,
        sortD: is.countable(query.sortD) ? query.sortD : 1,
        filterV: is.defined(query.filterV) ? query.filterV : '',
        filterF: allowedFilters.indexOf(query.filterF) > -1 ? query.filterF : allowedFilters[0],
        sortF: allowedSort.indexOf(query.sortF) > -1 ? query.sortF : allowedSort[0],
    };
}

/**
 * helper to setup correctness url params
 * provide preventing to display default values
 *
 * @param {Object} reducer
 * @public
 */
function updateLocation ({ sort, filter, pagination }) {
    const params = {};
    defVal.sort.field !== sort.field && (params.sortF = sort.field);
    defVal.sort.direction !== sort.direction && (params.sortD = Number(sort.direction));
    defVal.pagination.page !== pagination.page && (params.page = pagination.page);
    defVal.pagination.size !== pagination.size && (params.size = pagination.size);
    defVal.filter.field !== filter.field && (params.filterF = filter.field);
    defVal.filter.value !== filter.value && (params.filterV = filter.value);
    historyPush(USERS.LINK({ query: params }));
}
