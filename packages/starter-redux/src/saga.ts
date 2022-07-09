import { all, spawn } from 'typed-redux-saga';
import petSaga from './pet/sagas/index.js';

//https://redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([spawn(petSaga)]);
}
