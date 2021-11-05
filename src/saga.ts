import { all, spawn } from 'typed-redux-saga/macro';
import parentSaga from './parent/sagas';

//https://redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([spawn(parentSaga)]);
}
