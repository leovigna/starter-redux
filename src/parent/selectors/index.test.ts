import { assert } from 'chai';
import { createStore } from '../../store';
import { name } from '../common';
import { create } from '../actions';
import { selectByIdExists, selectByIdSingle, selectByIdMany } from '../selectors';

describe(`${name}.selectors`, () => {
    let store: ReturnType<typeof createStore>;
    const john = { firstName: 'John', lastName: 'Doe', age: 42 };
    const johnId = 'John-Doe';
    const johnIdDeconstructed = { firstName: john.firstName, lastName: john.lastName };
    const johnWithId = { id: johnId, ...john };

    beforeEach(() => {
        store = createStore();
        store.dispatch(create(john));
    });
    it('selectByIdExists', async () => {
        const state = store.getState();
        assert.isTrue(selectByIdExists(state, johnId));
        assert.isTrue(selectByIdExists(state, johnIdDeconstructed));
    });
    it('selectByIdSingle', async () => {
        const state = store.getState();
        assert.deepEqual(selectByIdSingle(state, johnId), johnWithId);
        assert.deepEqual(selectByIdSingle(state, johnIdDeconstructed), johnWithId);
    });
    it('selectByIdMany', async () => {
        const state = store.getState();
        assert.deepEqual(selectByIdMany(state), [johnWithId]);
        assert.deepEqual(selectByIdMany(state, [johnId]), [johnWithId]);
        assert.deepEqual(selectByIdMany(state, [johnIdDeconstructed]), [johnWithId]);
    });
});
