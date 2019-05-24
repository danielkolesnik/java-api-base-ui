
// outsource dependencies
import moment from 'moment';
import assignIn from 'lodash/assignIn';

// local dependencies
import { config } from '../constants';
import is from '../services/is.service';
import { instanceAPI } from '../services/api.service';

const timeFix = 1000;
/**
 * prevent "encodeURIComponent" to let setup custom parameter
 * sort=createdDate,desc&sort=lastModifiedDate,asc
 *
 * @param {Object} params
 * @returns {String}
 * @private
 */
function skipEncode (params) {
    let query = '';
    for (const name in params) {
        query += `${name}=${String(params[name])}&`;
    }
    // NOTE remove last "&"
    return query.substring(0, query.length-1);
}

/**
 *
 *
 * @constructor BaseModel
 * @type {BaseModel}
 * @abstract
 */
class BaseModel {
    constructor (data = {}) {
        // copy all
        assignIn(this, data);
    }

    /**
     * helper to prevent Type Error
     *
     * @public
     */
    get created () {
        // NOTE Java API returns long (1531236834.000000000 => 1531236834)
        const time = this.createdAt ? this.createdAt*timeFix : (new Date(2018, 0, 1, 0, 0, 0, 0));
        return moment(time).format(config.clientTimeFormat);
    }

    /**
     * helper to prevent Type Error
     *
     * @public
     */
    get updated () {
        // NOTE Java API returns long (1531236834.000000000 => 1531236834)
        const time = this.updatedAt ? this.updatedAt*timeFix : (new Date(2018, 0, 1, 0, 0, 0, 0));
        return moment(time).format(config.clientTimeFormat);
    }

    /**
     * logger for all models
     *
     * @public
     */
    get log () {
        return this.constructor.log.bind(this.constructor);
    }

    /**
     * debug state logger for all models
     *
     * @public
     */
    get debug () {
        return this.constructor.debug.bind(this.constructor);
    }

    /**
     * setup default data for model or use another preparation
     *
     * @public
     */
    init () {
        throw new Error(`Method "init" must be provided for models but in ${this.constructor.name} it absent`);
    }

    /**
     * create/update method
     * NOTE solution on server side to use one method to create and update entities
     *
     * @param {Object} data
     * @public
     */
    update (data) {
        const Model = this.constructor;
        const baseRoute = Model.baseRoute;
        return new Promise((resolve, reject) => {
            const updated = assignIn(assignIn({}, this), data);
            // id is important things to known is exist item on server side
            instanceAPI({ data: updated, method: 'put', url: `${baseRoute}/` })
                .then(success => {
                    assignIn(this, Model.create(success));
                    resolve(this);
                }).catch(reject);
        });
    }

    /**
     * change status method
     *
     * @param {String} status
     * @public
     */
    changeStatus (status) {
        const Model = this.constructor;
        return Model.changeStatuses(status, [{ id: this.id }]);
    }

    /**
     * delete method
     *
     * @public
     */
    remove () {
        const Model = this.constructor;
        return Model.remove([{ id: this.id }]);
    }

    /**
     * helper to detect changes in model after merge with other data
     *
     * @param {Object} changes
     * @private
     */
    isWillChange (changes) {
        const Model = this.constructor;
        const newData = Model.create(assignIn({}, this, changes));
        const isEqual = is.equal(this, newData);
        return !isEqual;
    }

    /*----------------------------------------
                    STATIC
    ------------------------------------------*/

    /**
     * setup path for base CRUD requests
     *
     * @private
     */
    static get baseRoute () {
        throw new Error('static "baseRoute" required for models');
    }

    /**
     * get by Id
     *
     * @param {Number} id
     * @param {Object} [options=null]
     * @public
     */
    static getById (id, options) {
        const Model = this;
        const baseRoute = Model.baseRoute;
        return new Promise((resolve, reject) => {
            instanceAPI({ method: 'get', url: `${baseRoute}/${id}/full` })
                .then(success => {
                    const instance = Model.create(success);
                    resolve(instance);
                }).catch(reject);
        });
    }

    /**
     * change status method
     *
     * @param {String} status
     * @param {Array} list - ([{id: 1}, {id: 2}])
     * @public
     */
    static changeStatuses (status, list) {
        const Model = this;
        const baseRoute = Model.baseRoute;
        return new Promise((resolve, reject) => {
            // id is important things to known is exist item on server side
            // NOTE request from server side from 06.08.2018 for url mapping to use ENUM of status in lower case
            instanceAPI({ data: list, method: 'put', url: `${baseRoute}/statuses/${status.toLowerCase()}` })
                .then(resolve).catch(reject);
        });
    }

    /**
     * multi remove method
     *
     * @param {Array} list - ([{id: 1}, {id: 2}])
     * @public
     */
    static remove (list) {
        const Model = this;
        const baseRoute = Model.baseRoute;
        return new Promise((resolve, reject) => {
            // id is important things to known is exist item on server side
            instanceAPI({ data: list, method: 'delete', url: `${baseRoute}/` })
                .then(resolve).catch(reject);
        });
    }

    /**
     * get list with pagination
     *
     * @param {Object} pagination
     * @param {Object} [filters={}]
     * @param {Object} [options=null]
     * @public
     */
    static getPage (pagination, filters = {}, options) {
        const Model = this;
        const baseRoute = Model.baseRoute;

        !options&&(options = {});
        if (!is.defined(options.paramsSerializer)) {
            // NOTE prevent "encodeURIComponent"
            options.paramsSerializer = skipEncode;
        }

        return new Promise((resolve, reject) => {
            instanceAPI({
                data: filters,
                params: pagination,
                method: 'post',
                url: `${baseRoute}/full/filter`,
                ...options
            }).then(({ content, ...rest }) => {
                const result = [];
                for (const item of content) {
                    result.push(Model.create(item));
                }
                resolve({ ...rest, content: result });
            }).catch(reject);
        });
    }

    /**
     * get list with pagination
     * NOTE minimum fields within list and cut pagination information
     * the same request as pagination
     *
     * @param {String} name
     * @param {Number} [size=10]
     * @param {Array} [excludeIds]
     * @public
     */
    static getListByName (name, size = 10, excludeIds) {
        const Model = this;
        const baseRoute = Model.baseRoute;
        // console.log( 'name', name, '\n excludeIds', excludeIds);
        return new Promise((resolve, reject) => {
            instanceAPI({ data: { name, excludeIds }, params: { size, page: 0, sort: 'name,ASC' }, method: 'post', url: `${baseRoute}/name/filter` })
                .then(({ content }) => {
                    const result = [];
                    for (const { name, id } of content) {
                        result.push({ name, id });
                    }
                    resolve(result);
                }).catch(reject);
        });
    }

    /**
     * create method
     *
     * @public
     */
    static create (...args) {
        const Model = this;
        const instance = new Model(...args);
        // NOTE make some preparing for instances
        instance.init(...args);
        return instance;
    }

    /**
     * debug state logger
     *
     * @public
     */
    static debug (...args) {
        config.DEBUG&&console.info(`%c[${this.name}] DEBUG:`, 'background: #0747A6; color: #fff; font-weight: bolder; font-size: 14px; padding: 4px 2px;', '\n', ...args);
    }

    /**
     * logger
     *
     * @public
     */
    static log (...args) {
        console.info(`%c ${this.name} `, 'background: #3e8f3e; color: #000; font-weight: bolder; font-size: 12px; padding: 2px 0;', '\n', ...args);
    }

}

export default BaseModel;
