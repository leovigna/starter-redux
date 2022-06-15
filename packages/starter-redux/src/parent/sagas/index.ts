import { all, takeEvery } from 'typed-redux-saga';
import fetch from './fetch.js';
import { FETCH } from '../actions/index.js';

export function* saga() {
    yield* all([takeEvery(FETCH, fetch)]);
}

export default saga;
