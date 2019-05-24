
// outsource dependencies
import { toastr } from 'react-redux-toastr';
import { takeEvery, put, call, /*take, select*/ } from 'redux-saga/effects';

// local dependencies
import TYPE from './types';
import { TeacherModel } from '../../models';
// import is from '../../services/is.service';
// import { initial as defVal } from './reducer';
// import { TEACHERS } from '../../constants/routes';
// import query from '../../../services/query.service';
// import store, { history, historyPush } from '../../store';
import {getTeachers, updateTeacher, deleteTeacher, createTeacher} from '../../services/api.service';


export default function*() {
    yield takeEvery(TYPE.GET_DATA.REQUEST, getDataSaga);
    yield takeEvery(TYPE.UPDATE.REQUEST, updateTeacherSaga);
    yield takeEvery(TYPE.DELETE.REQUEST, deleteTeacherSaga);
    yield takeEvery(TYPE.CREATE.REQUEST, createTeacherSaga);
    // yield takeEvery('', );
}

function *getDataSaga () {
    yield put({type: TYPE.PRELOADER, payload: true});
    try {
        let data = yield call(getTeachers);
        let teachers = [];
        data.map((teacher) => {
            return teachers.push(new TeacherModel(teacher));
        });
        yield put({type: TYPE.GET_DATA.FINISH, payload: teachers});
    } catch ({message}) {
        yield call(toastr.error, 'Error', message);
        yield put({ type: TYPE.META, errorMessage: message});
    }
    yield put({type: TYPE.PRELOADER, payload: false});
}

function *updateTeacherSaga ({payload}) {
    let {id, firstName, lastName, qualificationName, email, fired} = payload;
    try {
        let data = yield call(updateTeacher, id, firstName, lastName, email, qualificationName, fired);
        let updatedTeacher = new TeacherModel(data);
        yield put({type: TYPE.UPDATE.FINISH, payload: updatedTeacher});
        yield put({type: TYPE.GET_DATA.REQUEST});
    } catch ({message}) {
        yield call(toastr.error, 'Error', message);
        yield put({ type: TYPE.META, errorMessage: message});
    }
}

function *createTeacherSaga ({payload}) {
    let {firstName, lastName, qualificationName, email} = payload;
    try {
        let data = yield call(createTeacher, firstName, lastName, email, qualificationName);
        let updatedTeacher = new TeacherModel(data);
        yield put({type: TYPE.UPDATE.FINISH, payload: updatedTeacher});
        yield put({type: TYPE.GET_DATA.REQUEST});
    } catch ({message}) {
        yield call(toastr.error, 'Error', message);
        yield put({ type: TYPE.META, errorMessage: message});
    }
}

function *deleteTeacherSaga ({payload}) {
    let {id, firstName, lastName, qualificationName, email, fired} = payload;
    try {
        let deletedTeacherId = yield call(deleteTeacher, id, firstName, lastName, email, qualificationName, fired);
        yield put({type: TYPE.DELETE.FINISH, payload: deletedTeacherId});
        yield put({type: TYPE.GET_DATA.REQUEST});
    } catch ({message}) {
        yield call(toastr.error, 'Error', message);
        yield put({ type: TYPE.META, errorMessage: message});
    }
}


