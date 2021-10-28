import { ORM } from 'redux-orm';
import ParentModel from './parent/model/orm';
import { REDUX_ROOT } from './common';

const orm = new ORM({
    stateSelector: (state: any) => state[REDUX_ROOT],
});
orm.register(ParentModel);

export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();

    // Default state
    /*
    const { Parent } = orm.mutableSession(state);
    Parent.create({ firstName: 'John', lastName: 'Doe' });
    */

    return state;
};

export { orm };
