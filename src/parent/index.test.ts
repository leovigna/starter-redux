import { assert } from 'chai';
import { createStore, StoreType } from '../store';
import { getId, validate, create, selectByIdSingle } from './index';
import { name } from './common';

describe(`${name}.integration`, () => {
    const item = {
        firstName: 'John',
        lastName: 'Doe',
        age: 42,
    };
    const id = getId(item);
    const itemWithId = validate(item);

    let store: StoreType;

    beforeEach(() => {
        store = createStore();
    });

    describe('selectors', () => {
        it('selectByIdSingle', () => {
            store.dispatch(create(item));
            const selected1 = selectByIdSingle(store.getState(), id);
            assert.deepEqual(selected1, itemWithId);
        });
    });
});
