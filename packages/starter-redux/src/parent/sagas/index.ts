import { all, takeEvery, spawn } from 'typed-redux-saga';
import fetch from './fetch.js';
import { watchCreateDBSaga } from './createDB.js';
import { FETCH } from '../actions/index.js';

export function* saga() {
    yield* all([takeEvery(FETCH, fetch), spawn(watchCreateDBSaga)]);
}

export default saga;
