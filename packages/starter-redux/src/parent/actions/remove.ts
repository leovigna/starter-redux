import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { IdArgs, getId } from '../model/interface.js';

export const REMOVE = `${name}/DELETE`;
export const remove = createAction(REMOVE, (payload: IdArgs) => {
    return { payload: getId(payload) };
});

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export default remove;
