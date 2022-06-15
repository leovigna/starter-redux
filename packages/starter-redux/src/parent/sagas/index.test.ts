import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import exists from './exists.js';
import fetch from './fetch.js';
import { name } from '../common.js';

import fetchAction from '../actions/fetch.js';
import setAction from '../actions/set.js';
import { selectByIdSingle } from '../selectors/index.js';

import { getId, Interface } from '../model/interface.js';

describe(`${name}.sagas`, () => {
    const item: Interface = { firstName: 'John', lastName: 'Doe', age: 42 };
    const id = getId(item);
    const itemWithId: Interface = { id, ...item };

    describe('exists', () => {
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
            testSaga(fetch, fetchAction(id))
                .next()
                .call(exists, id)
                .next(itemWithId)
                .put(setAction({ id, key: 'age', value: 69 }));
        });
    });
});
