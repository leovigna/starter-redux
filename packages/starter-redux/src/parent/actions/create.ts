import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { Interface, validate } from '../model/interface.js';

export const CREATE = `${name}/CREATE`;
export const create = createAction(CREATE, (payload: Interface) => {
    return { payload: validate(payload) };
});

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export default create;
