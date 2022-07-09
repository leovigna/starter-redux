import { ORM } from 'redux-orm';
import PetModel from './pet/model/orm.js';
import { REDUX_ROOT } from './common.js';

//Fix undefined import issue
let orm: any;
export function getOrm(): any {
    if (orm) return orm;
    orm = new ORM({
        stateSelector: (state: any) => state[REDUX_ROOT],
    });
    orm.register(PetModel);

    return orm;
}

export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();
    return state;
};
