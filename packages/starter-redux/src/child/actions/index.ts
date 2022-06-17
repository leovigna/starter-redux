import { CREATE, createAction, CreateAction, isCreateAction } from './create.js';
import { CREATE_BATCHED, createBatchedAction, CreateBatchedAction, isCreateBatchedAction } from './createBatched.js';
import { CREATE_DB, createDBAction, CreateDBAction, isCreateDBAction } from './createDB.js';
import {
    CREATE_DB_BATCHED,
    createDBBatchedAction,
    CreateDBBatchedAction,
    isCreateDBBatchedAction,
} from './createDBBatched.js';
import { LOAD_DB_ALL, loadDBAllAction, LoadDBAllAction, isLoadDBAllAction } from './loadDBAll.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch.js';

export type ReducerAction = CreateAction | CreateBatchedAction | RemoveAction | UpdateAction | SetAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return (
        isCreateAction(action) ||
        isCreateBatchedAction(action) ||
        isRemoveAction(action) ||
        isUpdateAction(action) ||
        isSetAction(action)
    );
}

export type SagaAction = FetchAction | CreateDBAction | CreateDBBatchedAction | LoadDBAllAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isFetchAction(action) ||
        isCreateDBAction(action) ||
        isCreateDBBatchedAction(action) ||
        isLoadDBAllAction(action)
    );
}

export type Action = ReducerAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}

export type {
    CreateAction,
    CreateBatchedAction,
    CreateDBAction,
    CreateDBBatchedAction,
    RemoveAction,
    UpdateAction,
    SetAction,
    FetchAction,
    LoadDBAllAction,
};

export {
    CREATE,
    createAction,
    isCreateAction,
    CREATE_BATCHED,
    createBatchedAction,
    isCreateBatchedAction,
    CREATE_DB,
    createDBAction,
    isCreateDBAction,
    CREATE_DB_BATCHED,
    createDBBatchedAction,
    isCreateDBBatchedAction,
    REMOVE,
    remove,
    isRemoveAction,
    UPDATE,
    update,
    isUpdateAction,
    SET,
    set,
    isSetAction,
    FETCH,
    fetch,
    isFetchAction,
    LOAD_DB_ALL,
    loadDBAllAction,
    isLoadDBAllAction,
};
