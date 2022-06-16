import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { Interface, validate } from '../model/interface.js';

export const CREATE_DB = `${name}/CREATE`;
export const createDB = createAction(CREATE_DB, (payload: Interface, uuid?: string) => {
    return {
        payload: validate(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

export type CreateDBAction = ReturnType<typeof createDB>;
export const isCreateDBAction = createDB.match;

export default createDB;
