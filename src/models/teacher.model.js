
// outsource dependencies
import moment from 'moment';
// import filter from 'lodash/filter';
// import assignIn from 'lodash/assignIn';

// local dependencies
// import { instanceAPI } from '../services/api.service';
import is from '../services/is.service';

/**
 *
 *
 * @constructor TeacherModel
 * @type {TeacherModel}
 * @public
 */
class TeacherModel {
    constructor (data = {}) {
        console.log(data);
        // copy all inherited
        this.id = data.id || 0;
        this.email = data.email || '';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.fullName = data.fullName || this.firstName + ' ' + this.lastName;
        this.qualification = data.qualification;
        this.qualificationExpired = is.boolean(data.qualificationExpired) ? data.qualificationExpired : false;
        this.fired = is.boolean(data.fired) ? data.fired : false;
    }
}

export default TeacherModel;
