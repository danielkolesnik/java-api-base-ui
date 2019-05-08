
import { ENTITY_TYPE as TYPE } from '../constants/spec';
import BaseModel from './base.model';
import UserModel from './user.model';
import CategoryModel from './category.model';
import UserRoleModel from './user-role.model';

/**
 * Associate models with on ENTITY_TYPE constant to provide ability determine Models programmatically
 *
 * @param { String } type
 * @public
 */
export function getModelByType (type) {
    switch (type) {
        default:
            console.error(`%c getModelByType ${type} !!!`, 'color: #fff; background: #a41e22; font-size: 20px;');
            return UserModel;
        case TYPE.USER: return UserModel;
        case TYPE.CATEGORY: return CategoryModel;
        case TYPE.USER_ROLE: return UserRoleModel;
    }
}

export {
    BaseModel,
    UserModel,
    UserRoleModel,
    CategoryModel,
};
