import { call, put } from 'typed-redux-saga';
import exists from './exists.js';
import { set, FetchAction } from '../actions/index.js';

export default function* fetch(action: FetchAction) {
    const { payload } = action;
    yield* call(exists, payload);

    //Fetch mock
    yield* put(set({ id: payload, key: 'age', value: 69 }));
}
