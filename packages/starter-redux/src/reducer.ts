import { Action, Reducer, combineReducers } from 'redux';
import { REDUX_ROOT } from './common.js';

import { getOrm, initializeState } from './orm.js';

import PetCRUD from './pet/crud.js';

export const reducerWithOrm: Reducer = (state: any, action: Action) => {
    const orm = getOrm();
    const sess = orm.session(state || initializeState(orm));

    if (PetCRUD.isAction(action)) PetCRUD.reducer(sess, action);

    return sess.state;
};

export const createRootReducer = (reducerWeb3Redux: Reducer) => {
    return combineReducers({
        [REDUX_ROOT]: reducerWeb3Redux,
    });
};

export const rootReducer = createRootReducer(reducerWithOrm);
export default rootReducer;
