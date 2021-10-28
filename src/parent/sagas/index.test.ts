import { assert } from 'chai';
import { put } from 'redux-saga/effects';
import { create, fetch as fetchAction } from '../actions';
import fetchSaga from './fetch';

describe('sagas', () => {
    it('fetch', () => {
        //Hardcoded test case
        const gen = fetchSaga(fetchAction('jane'));
        assert.deepEqual(gen.next().value, put(create({ firstName: 'Jane', lastName: 'Doe' })));
    });
});
