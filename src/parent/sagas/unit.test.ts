import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import { name } from '../common';

import fetchAction from '../actions/fetch';
import setAction from '../actions/set';
import { selectByIdSingle } from '../selectors';

import exists from './exists';
import fetchSaga from './fetch';

describe('sagas', () => {
    const item = { firstName: 'John', lastName: 'Doe', age: 42 };
    const id = 'John-Doe';
    const itemWithId = { id: id, ...item };

    describe('exists()', () => {
        it(`error: ${name} undefined`, () => {
            expect(testSaga(exists, id).next().select(selectByIdSingle, id).next).to.throw(`${name} ${id} undefined`);
        });
        it('exists', () => {
            const gen = testSaga(exists, id).next().select(selectByIdSingle, id).next(itemWithId);
            gen.returns(itemWithId);
            gen.isDone();
        });
    });

    describe('fetch', () => {
        it('fetch', () => {
            testSaga(fetchSaga, fetchAction(id))
                .next()
                .call(exists, id)
                .next(itemWithId)
                .put(setAction({ id, key: 'age', value: 69 }));
        });
    });
});
