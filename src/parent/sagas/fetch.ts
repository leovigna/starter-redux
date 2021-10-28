import { put, takeEvery } from 'redux-saga/effects';
import { create, FETCH, FetchAction } from '../actions';

export default function* fetch(action: FetchAction) {
    //Fetch here
    if (action.payload == 'jane') {
        yield put(create({ firstName: 'Jane', lastName: 'Doe' }));
    }
}

export function* saga() {
    yield takeEvery(FETCH, fetch);
}
