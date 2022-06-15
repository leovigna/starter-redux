import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { IdArgs, getId } from '../model/interface.js';

export const FETCH = `${name}/FETCH`;
export const fetch = createAction(FETCH, (payload: IdArgs) => {
    return { payload: getId(payload) };
});

export type FetchAction = ReturnType<typeof fetch>;
export const isFetchAction = fetch.match;

export default fetch;
