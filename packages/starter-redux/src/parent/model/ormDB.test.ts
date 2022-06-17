import { assert } from 'chai';
// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { name } from '../common.js';
import { Interface, validate } from '../model/interface.js';
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
