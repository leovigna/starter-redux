import { all, spawn } from 'typed-redux-saga';
import PetCRUD from '../crud.js';

/** @internal */
export function* rootSaga() {
    yield* all([spawn(PetCRUD.sagas.crudRootSaga)]);
}

export default rootSaga;
