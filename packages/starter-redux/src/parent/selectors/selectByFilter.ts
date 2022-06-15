import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import Interface from '../model/interface.js';

type selectByFilterType = (state: any, filter: Partial<Interface> | undefined) => Interface[];
export const selectByFilter: selectByFilterType = createSelector(
    getOrm(),
    (_1: any, filter: Partial<Interface> | undefined) => filter,
    (session: any, filter: Partial<Interface> | undefined) => {
        const model = session[name];
        let query = model.all();
        if (!!filter) query = query.filter(filter);

        const result = query.toRefArray();
        return result;
    },
);

export default selectByFilter;
