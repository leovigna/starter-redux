import { all, takeEvery } from 'redux-saga/effects';
import { FETCH } from '../actions';
import fetch from './fetch';

export default function* saga() {
    yield all([takeEvery(FETCH, fetch)]);
}
