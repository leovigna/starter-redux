import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch';

export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

export type SagaAction = FetchAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isSagaAction(action);
}

export type Action = ReducerAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}

export {
    CREATE,
    create,
    CreateAction,
    isCreateAction,
    REMOVE,
    remove,
    RemoveAction,
    isRemoveAction,
    UPDATE,
    update,
    UpdateAction,
    isUpdateAction,
    SET,
    set,
    SetAction,
    isSetAction,
    FETCH,
    fetch,
    FetchAction,
    isFetchAction,
};
