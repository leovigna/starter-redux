import { Action as ParentAction, isReducerAction as isParentAction } from './parent/actions';
import parentReducer from './parent/reducer';
import { orm, initializeState } from './orm';

export type Action = ParentAction;

export function rootReducer(state: any, action: Action) {
    const sess = orm.session(state || initializeState(orm));
    if (isParentAction(action)) parentReducer(sess, action);

    return sess.state;
}
