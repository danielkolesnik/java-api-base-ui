
// outsource dependencies
import { combineReducers } from 'redux';

// local dependencies
import list from './list/reducer';
import edit from './edit/reducer';

export default combineReducers({
    list,
    edit,
});
