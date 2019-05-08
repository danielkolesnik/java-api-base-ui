
// outsource dependencies
import is from '../services/is.service';

// local dependencies
import BaseModel from './base.model';
// import { instanceAPI } from '../services/auth.service';

/**
 *
 *
 * @constructor CategoryModel
 * @type {CategoryModel}
 * @public
 */
class CategoryModel extends BaseModel {
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
        !is.object(this.image)&&(this.image = {});
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
        return 'categories';
    }

}

export default CategoryModel;
