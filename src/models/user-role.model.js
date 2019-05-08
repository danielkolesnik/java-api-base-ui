
// outsource dependencies
import reject from 'lodash/reject';
import assignIn from 'lodash/assignIn';
import is from '../services/is.service';

// local dependencies
import BaseModel from './base.model';
import { instanceAPI } from '../services/api.service';

/**
 *
 *
 * @constructor UserRoleModel
 * @type {UserRoleModel}
 * @public
 */
class UserRoleModel extends BaseModel {
    constructor (data = {}) {
        super(data);
        // copy all inherited
    }

    /**
     * setup default data for model
     *
     * @public
     */
    init () {
        !is.array(this.permissions)&&(this.permissions = []);
    }

    /**
     * create/update user method
     *
     * @param {Object} data
     * @public
     */
    update (data) {
        return new Promise((resolve, reject) => {
            const { id, name, permissions } = this;
            instanceAPI({
                url: 'roles',
                method: (id ? 'put' : 'post'),
                data: {
                    id,
                    name: data.name || name,
                    permissions: data.permissions || permissions,
                },
            }).then(success => {
                assignIn(this, UserRoleModel.create(success));
                resolve(this);
            }).catch(reject);
        });
    }

    /**
     * add permission to the role
     *
     * @param {Object} perm
     * @public
     */
    addPermission (perm) {
        const { permissions } = this;
        permissions.push(perm);
        return this.update({ permissions });
    }

    /**
     * remove permission from the role
     *
     * @param {Object} perm
     * @public
     */
    removePermission (perm) {
        let { permissions } = this;
        permissions = reject(permissions, { id: perm.id });
        return this.update({ permissions });
    }

    /**
     * delete role method
     *
     * @public
     */
    remove () {
        const { id } = this;
        return instanceAPI({
            method: 'delete',
            url: 'roles',
            data: [{ id }]
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
        return 'roles';
    }

    /**
     * get user Role list
     *
     * @public
     */
    static getAllRoles () {
        return new Promise((resolve, reject) => {
            instanceAPI({ method: 'get', url: '/roles' })
                .then(success => {
                    const result = [];
                    for (const item of success) {
                        result.push(UserRoleModel.create(item));
                    }
                    resolve(result);
                }).catch(reject);
        });
    }

    /**
     * get Role permission list
     *
     * @public
     */
    static getPermissions () {
        return instanceAPI({ method: 'get', url: '/permissions' });
    }

}

export default UserRoleModel;
