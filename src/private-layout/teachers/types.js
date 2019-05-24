
// local dependencies
import { createTypes } from '../../actions/types';

const prefix = '@teachers-page';
export const PREFIX = new RegExp(prefix, 'i');
export const SHOW = `${prefix}/SHOW`;
export const CLEAR = `${prefix}/CLEAR`;
export const PRELOADER = `${prefix}/PRELOADER`;
export const CHANGE = createTypes(`${prefix}/CHANGE`);
export const DELETE = createTypes(`${prefix}/DELETE`);
export const UPDATE = createTypes(`${prefix}/UPDATE`);
export const CREATE = createTypes(`${prefix}/CREATE`);
export const GET_DATA = createTypes(`${prefix}/GET_DATA`);
export const META = `${prefix}/META`;
export const INITIALIZE = `${prefix}/INITIALIZE`;

export default {
    PREFIX,
    CLEAR,
    SHOW,
    GET_DATA,
    CHANGE,
    DELETE,
    UPDATE,
    CREATE,
    PRELOADER,
    META,
    INITIALIZE
};
