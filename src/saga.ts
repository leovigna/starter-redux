import { all, spawn } from 'redux-saga/effects';
import parentSaga from './parent/sagas';

//https://redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield all([spawn(parentSaga)]);
}
