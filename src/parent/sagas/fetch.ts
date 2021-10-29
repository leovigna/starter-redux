import { call, put, takeEvery } from 'typed-redux-saga/macro';
import { set, FETCH, FetchAction } from '../actions';
import exists from './exists';

export default function* fetch(action: FetchAction) {
    const { payload } = action;
    yield* call(exists, payload);

    //Fetch mock
    yield* put(set({ id: payload, key: 'age', value: 69 }));
}

export function* saga() {
    yield* takeEvery(FETCH, fetch);
}
