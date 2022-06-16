import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { Interface, validate } from '../model/interface.js';

export const CREATE = `${name}/CREATE`;
export const create = createAction(CREATE, (payload: Interface, uuid?: string) => {
    return {
        payload: validate(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export default create;
