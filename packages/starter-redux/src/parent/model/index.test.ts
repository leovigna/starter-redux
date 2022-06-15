import { assert } from 'chai';

import { name } from '../common.js';
import { Interface, Id, getId, getIdDeconstructed, validate, IdDeconstructed } from '../model/interface.js';

describe(`${name}.model`, () => {
    const item: Interface = { firstName: 'John', lastName: 'Doe', age: 42 };
    const id: Id = `${item.firstName}-${item.lastName}`;
    const itemWithId: Interface = { id, ...item };
    const idDeconstructed: IdDeconstructed = { firstName: item.firstName, lastName: item.lastName };

    it('getId', () => {
        assert.equal(getId(item), id);
    });
    it('getIdDeconstructed', () => {
        assert.deepEqual(getIdDeconstructed(id), idDeconstructed);
    });
    it('validate', () => {
        assert.deepEqual(validate(item), itemWithId);
    });
});
