
// outsource dependencies
import moment from 'moment';
import filter from 'lodash/filter';
import assignIn from 'lodash/assignIn';
import is from '../services/is.service';

// local dependencies
import BaseModel from './base.model';
import { instanceAPI } from '../services/api.service';

/**
 *
 *
 * @constructor UserModel
 * @type {UserModel}
 * @public
 */
class UserModel extends BaseModel {
    constructor (data = {}) {
        super(data);
        // copy all inherited
    }

    get fullName () {
        return `${this.firstName||''} ${this.lastName||''}`;
    }

    /**
     * method to detect on client side is user has permission for action
     *
     * @param {String} permissionName
     * @returns {Boolean}
     * @public
     */
    hasPermission (permissionName) {
        const name = is.string(permissionName) ? permissionName.toLowerCase() : 'not equal to any';
        const atLeastOne = filter(this.permissions, { name })[0];
        const result = Boolean(atLeastOne);
        // this.debug('hasPermission => ( permissionName )'
        //     // ,'\n this.permissions:', this.permissions
        //     ,'\n permissionName:', permissionName
        //     ,'\n result:', result
        //     ,'\n name:', name
        // );
        return result;
    }

    /**
     * setup default data for model
     *
     * @public
     */
    init () {
        !is.array(this.permissions)&&(this.permissions = []);
        this.birthday = moment(this.birthday).isValid() ? moment(this.birthday) : moment('2002-06-21T13:06:41.577Z');
    }

    /**
     * create/update user method
     *
     * @param {Object} data
     * @override BaseModel
     * @public
     */
    update (data) {
        return new Promise((resolve, reject) => {
            const updated = assignIn(assignIn({}, this), data);
            let promise;
            // id is important things to known is exist item on server side
            if (this.id) { // update
                promise = instanceAPI({ data: updated, method: 'put', url: 'user/' });
            } else { // create new one
                promise = instanceAPI({ data: updated, method: 'post', url: 'user/' });
            }
            promise.then(success => {
                assignIn(this, UserModel.create(success));
                resolve(this);
            }).catch(reject);
        });
    }

    /**
     * enable/disable user method
     *
     * @param {Boolean} enable
     * @public
     */
    enable (enable) {
        return new Promise((resolve, reject) => {
            let promise;
            // id is important things to known is exist item on server side
            if (this.id) { // request
                promise = instanceAPI({ method: 'put', url: `user/${this.id}/${enable ? 'enable' : 'disable'}` });
            } else { // NOTE emulate item not exist on server side
                promise = new Promise(resolve => resolve({}));
            }
            promise.then(() => {
                this.enabled = enable;
                resolve({});
            }).catch(reject);
        });
    }

    /**
     * change password for logged user
     *
     * @param {Object} data
     * @public
     */
    changePassword ({ oldPassword, password }) {
        return new Promise((resolve, reject) => {
            let promise;
            // id is important things to known is exist item on server side
            if (this.id) { // request
                promise = instanceAPI({ data: { oldPassword, password }, method: 'put', url: `user/${this.id}/password` });
            } else { // NOTE emulate item not exist on server side
                promise = new Promise(resolve => resolve({}));
            }
            promise.then(() => {
                resolve({});
            }).catch(reject);
        });
    }

    /*----------------------------------------
                    STATIC
    ------------------------------------------*/

    /**
     * setup path for base CRUD requests
     *
     * @override BaseModel
     * @private
     */
    static get baseRoute () {
        return 'users';
    }

    /**
     * get user list with pagination
     *
     * @param {Object} pagination
     * @param {Object} [filters={}]
     * @override BaseModel
     * @public
     */
    static getSelf (pagination, filters = {}) {
        return new Promise((resolve, reject) => {
            instanceAPI({ method: 'get', url: '/auth/me/' })
                .then(user => resolve(UserModel.create(user)))
                .catch(reject);
        });
    }

    /**
     * get country list using name filter
     *
     * @param {String} name
     * @param {Number} [size=10]
     * @override BaseModel
     * @public
     */
    static getCountriesByName (name, size = 10) {
        const baseRoute = 'countries';
        return new Promise((resolve, reject) => {
            instanceAPI({ data: { name }, params: { size, page: 0, sort: 'name,ASC' }, method: 'post', url: `${baseRoute}/name/filter` })
                .then(({ content }) => {
                    const result = [];
                    for (const { name, id } of content) {
                        result.push({ name, id });
                    }
                    resolve(result);
                }).catch(reject);
        });
    }

}

export default UserModel;
