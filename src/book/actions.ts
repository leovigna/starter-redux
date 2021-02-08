import { actionCreator } from '../utils';
import { Model, Fields } from './model';

const name = Model.modelName as string;

export const CREATE = `${name}/CREATE`;
export const UPDATE = `${name}/UPDATE`;
export const REMOVE = `${name}/DELETE`;
export const FETCH = `${name}/FETCH`;

export interface CreateUpdateActionInput {
    name: Fields['name'];
    authorId: Fields['authorId'];
}

export const create = actionCreator<typeof CREATE, CreateUpdateActionInput>(CREATE);
export const update = actionCreator<typeof UPDATE, CreateUpdateActionInput>(UPDATE);
export const remove = actionCreator<typeof REMOVE, number>(REMOVE);
export const fetch = actionCreator<typeof FETCH, number>(FETCH);

export type CreateAction = ReturnType<typeof create>;
export type UpdateAction = ReturnType<typeof update>;
export type RemoveAction = ReturnType<typeof remove>;
export type FetchAction = ReturnType<typeof fetch>;

export type Action = CreateAction | UpdateAction | RemoveAction | FetchAction;
