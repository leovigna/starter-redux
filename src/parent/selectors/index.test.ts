import { assert } from 'chai';
import { createStore } from '../../store';
import { name } from '../common';
import { create, set } from '../actions';
import { selectByIdExists, selectByIdSingle, selectByIdMany, selectByFilter } from '../selectors';

describe(`${name}.selectors`, () => {
    let store: ReturnType<typeof createStore>;
    let state: any;
    const john = { firstName: 'John', lastName: 'Doe', age: 42 };
    const johnId = 'John-Doe';
    const johnIdDeconstructed = { firstName: john.firstName, lastName: john.lastName };
    const johnWithId = { id: johnId, ...john };

    beforeEach(() => {
        store = createStore();
        store.dispatch(create(john));
        state = store.getState();
    });
    it('selectByIdExists', () => {
        assert.isTrue(selectByIdExists(state, johnId));
        assert.isTrue(selectByIdExists(state, johnIdDeconstructed));
    });
    describe('selectByIdSingle', () => {
        it('(id)', () => {
            assert.deepEqual(selectByIdSingle(state, johnId), johnWithId);
        });
        it('(idDeconstructed', () => {
            assert.deepEqual(selectByIdSingle(state, johnIdDeconstructed), johnWithId);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, johnId);
            const select2 = selectByIdSingle(state, johnIdDeconstructed);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);

            store.dispatch(set({ id: johnId, key: 'age', value: 43 }));
            const select3 = selectByIdSingle(state, johnId);
            assert.deepEqual(select3, select3);
            assert.equal(select3, select3);
        });
    });

    describe('selectByIdMany', () => {
        it('()', () => {
            assert.deepEqual(selectByIdMany(state), [johnWithId]);
        });
        it('([id])', () => {
            assert.deepEqual(selectByIdMany(state), [johnWithId]);
        });
        it('([idDeconstructed])', () => {
            assert.deepEqual(selectByIdMany(state, [johnId]), [johnWithId]);
        });
        it('memoization', () => {
            const select1 = selectByIdMany(state, [johnId]);
            const select2 = selectByIdMany(state, [johnIdDeconstructed]);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
    describe('selectByFilter', () => {
        it('(undefined)', () => {
            assert.deepEqual(selectByFilter(state, undefined), [johnWithId]);
        });
        it('({firstName})', () => {
            assert.deepEqual(selectByFilter(state, { firstName: 'John' }), [johnWithId]);
            assert.deepEqual(selectByFilter(state, { firstName: 'Jance' }), []);
        });
        it('memoization', () => {
            const select1 = selectByFilter(state, { firstName: 'John' });
            const select2 = selectByFilter(state, { firstName: 'John' });
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
});
