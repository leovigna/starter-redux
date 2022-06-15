import { assert } from 'chai';

import { create, CREATE, CreateAction, isCreateAction } from './create.js';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update.js';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove.js';
import { set, SET, SetAction, isSetAction } from './set.js';
import { Interface, getId } from '../model/interface.js';
import { name } from '../common.js';

describe(`${name}.actions`, () => {
    const item: Interface = { firstName: 'John', lastName: 'Doe', age: 42 };
    const id = getId(item);

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: { id, ...item },
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item), expected);
    });

    it('update', () => {
        const expected: UpdateAction = {
            type: UPDATE,
            payload: { id, ...item },
        };
        assert.isTrue(isUpdateAction(expected));
        assert.deepEqual(update(item), expected);
    });

    it('remove', () => {
        const expected: RemoveAction = {
            type: REMOVE,
            payload: id,
        };
        assert.isTrue(isRemoveAction(expected));
        assert.deepEqual(remove(id), expected);
        assert.deepEqual(remove(item), expected);
    });

    it('set', () => {
        const expected: SetAction = {
            type: SET('firstName'),
            payload: { id, key: 'firstName' as keyof Interface, value: item.firstName },
        };
        assert.isTrue(isSetAction(expected));
        assert.deepEqual(set({ id, key: 'firstName', value: item.firstName }), expected);
    });
});
