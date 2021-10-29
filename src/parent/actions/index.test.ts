import { assert } from 'chai';
import { CREATE, UPDATE, REMOVE, SET, create, update, remove, set } from './index';

import { name } from '../common';
import Interface, { InterfacePartial, Id, getId } from '../model/interface';

describe(`${name}.actions`, () => {
    const item: InterfacePartial = { firstName: 'John', lastName: 'Doe', age: 42 };
    const id: Id = getId(item);

    it('create', () => {
        const expected = {
            type: CREATE,
            payload: { id, ...item },
        };
        assert.deepEqual(create(item), expected);
    });

    it('update', () => {
        const expected = {
            type: UPDATE,
            payload: { id, ...item },
        };
        assert.deepEqual(update(item), expected);
    });

    it('remove', () => {
        const expected = {
            type: REMOVE,
            payload: id,
        };
        assert.deepEqual(remove(id), expected);
        assert.deepEqual(remove(item), expected);
    });

    it('set', () => {
        const expected = {
            type: SET('firstName'),
            payload: { id, key: 'firstName' as keyof Interface, value: item.firstName },
        };
        assert.deepEqual(set({ id, key: 'firstName', value: item.firstName }), expected);
    });
});
