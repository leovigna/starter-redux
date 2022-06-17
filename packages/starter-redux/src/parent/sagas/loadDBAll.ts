import { call, put, takeEvery } from 'typed-redux-saga';
import { LoadDBAllAction, LOAD_DB_ALL, createBatchedAction } from '../actions/index.js';
import db from '../../db.js';

/** Load DB data */
export function* loadDBAllSaga(action: LoadDBAllAction) {
    const models = yield* call([db, db.connect]);
    const data = yield* call([models.Parent, models.Parent.all]);
    yield* put(createBatchedAction(data, action.meta.uuid));
}

export function* watchLoadDBSaga() {
    yield* takeEvery(LOAD_DB_ALL, loadDBAllSaga);
}

export default watchLoadDBSaga;