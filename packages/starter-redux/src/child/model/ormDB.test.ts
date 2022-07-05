import { assert } from 'chai';
import { Connector } from 'indexeddb-orm';
import { Interface, validate } from './interface.js';
import { name } from '../common.js';
import getDB from '../../db.js';

describe(`${name}/model/ormDB.ts`, () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
    const FDBFactory = require('fake-indexeddb/lib/FDBFactory');
    let db: Connector;

    beforeEach(async () => {
        indexedDB = new FDBFactory();
        db = await getDB();
    });

    it('insert', async () => {
        const models = await db.connect();
        const record = await models[name].create(item);
        assert.deepEqual(record, item);
    });
});
