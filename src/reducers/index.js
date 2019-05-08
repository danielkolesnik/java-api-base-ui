
// outsource dependencies
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';

// local dependencies
import tmp from './tmp';
import app from './app';
import publicLayout from '../public-layout/reducers';
import privateLayout from '../private-layout/reducers';
// configuration

// connect
const rootReducer = combineReducers({
    ...publicLayout,
    ...privateLayout,
    toastr,
    form,
    app,
    tmp,
});
// export
export default rootReducer;
