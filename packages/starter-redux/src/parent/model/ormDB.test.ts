import { assert } from 'chai';
import { name } from '../common.js';
import { Interface, validate } from '../model/interface.js';
import db from '../../db.js';

describe(`${name}.model`, () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
    const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

    beforeEach(async () => {
        indexedDB = new FDBFactory();
    });

    it('insert', async () => {
        const models = await db.connect();
        const record = await models.Parent.create(item);
        assert.deepEqual(record, item);
    });
});
