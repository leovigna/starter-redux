import { ORM } from 'redux-orm';
import ParentModel from './parent/model/orm';
import { REDUX_ROOT } from './common';

//Fix undefined import issue
let orm = getOrm();
export function getOrm(): any {
    if (orm) return orm;
    orm = new ORM({
        stateSelector: (state: any) => state[REDUX_ROOT],
    });
    orm.register(ParentModel);

    return orm;
}

export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();

    // Default state
    /*
    const { Parent } = orm.mutableSession(state);
    Parent.create({ firstName: 'John', lastName: 'Doe' });
    */

    return state;
};
