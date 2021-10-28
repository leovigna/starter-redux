import { assert } from 'chai';
import { CREATE, UPDATE, REMOVE, SET, create, update, remove, set } from './index';

import { name } from '../common';
import Interface from '../model/interface';

describe(`${name}.actions`, () => {
    const john = { firstName: 'John', lastName: 'Doe', age: 42 };
    const johnId = 'John-Doe';

    it('create', () => {
        const expected = {
            type: CREATE,
            payload: { id: johnId, ...john },
        };
        assert.deepEqual(create(john), expected);
    });

    it('update', () => {
        const expected = {
            type: UPDATE,
            payload: { id: johnId, ...john },
        };
        assert.deepEqual(update(john), expected);
    });

    it('remove', () => {
        const expected = {
            type: REMOVE,
            payload: johnId,
        };
        assert.deepEqual(remove(johnId), expected);
        assert.deepEqual(remove(john), expected);
    });

    it('set', () => {
        const expected = {
            type: SET('firstName'),
            payload: { id: johnId, key: 'firstName' as keyof Interface, value: john.firstName },
        };
        assert.deepEqual(set({ id: johnId, key: 'firstName', value: john.firstName }), expected);
    });
});
