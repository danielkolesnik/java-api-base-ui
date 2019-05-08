
import { TMP } from './types';

export const clearTmp = name => ({ type: TMP.CLEAR, name });
export const removeTmp = name => ({ type: TMP.REMOVE, name });
export const addTmp = (name, state) => ({ type: TMP.ADD, name, state });
export const updateTmp = (name, state) => ({ type: TMP.UPDATE, name, state });
