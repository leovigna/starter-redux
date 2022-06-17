import { assert } from 'chai';
import { Interface, validate } from './interface.js';
import { name } from '../common.js';
import getDB from '../../db.js';

describe(`${name}/model/ormDB.ts`, () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
    const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

    beforeEach(async () => {
        indexedDB = new FDBFactory();
    });

    it('insert', async () => {
        const models = await (await getDB()).connect();
        const record = await models[name].create(item);
        assert.deepEqual(record, item);
    });
});
