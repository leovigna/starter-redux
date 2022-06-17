import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';

export const select = createSelector(getOrm()[name]);

export default select;
