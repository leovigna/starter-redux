import { enableBatching } from 'redux-batched-actions';
import { Reducer } from 'redux';
import { Action as ParentAction, isReducerAction as isParentAction } from './parent/actions/index.js';
import { Action as ChildAction, isReducerAction as isChildAction } from './child/actions/index.js';
import parentReducer from './parent/reducer.js';
import childReducer from './child/reducer.js';
import { getOrm, initializeState } from './orm.js';

export type Action = ParentAction | ChildAction;

export function reducerWithOrm(state: any, action: Action) {
    const orm = getOrm();
    const sess = orm.session(state || initializeState(orm));
    if (isParentAction(action)) parentReducer(sess, action);
    if (isChildAction(action)) childReducer(sess, action);

    return sess.state;
}

export const reducerWithBatching = enableBatching(reducerWithOrm as Reducer);
export const rootReducer = reducerWithBatching;
