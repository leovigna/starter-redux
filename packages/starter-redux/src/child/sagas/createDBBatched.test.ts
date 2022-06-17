import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { putCreateDBBatchedSaga, createDBBatchedSaga, watchCreateDBBatchedSaga } from './createDBBatched.js';
import { createBatchedAction, createDBBatchedAction } from '../actions/index.js';
import getDB from '../../db.js';
import { name } from '../common.js';

import { Interface, validate } from '../model/interface.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}/sagas/createDB.ts`, () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });
    let db: Connector;

    beforeEach(async () => {
        indexedDB = new FDBFactory();
        db = await getDB();
    });

    describe('unit', () => {
        it('putCreate', async () => {
            const action = createBatchedAction([item]);
            testSaga(putCreateDBBatchedSaga, action)
                .next()
                .put(createDBBatchedAction([item], action.meta.uuid))
                .next()
                .isDone();
        });

        it('createDB', async () => {
            const models = await db.connect();
            testSaga(createDBBatchedSaga, createDBBatchedAction([item]))
                .next()
                .call(getDB)
                .next(db)
                .call([db, db.connect])
                .next(models)
                .call([models[name], models[name].createMultiple], [item])
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('createDB', async () => {
            await expectSaga(createDBBatchedSaga, createDBBatchedAction([item])).run();

            //DB State
            const models = await db.connect();
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });

        it('watchCreateDBSaga', async () => {
            await expectSaga(watchCreateDBBatchedSaga)
                .dispatch(createDBBatchedAction([item]))
                .run();

            //DB State
            const models = await db.connect();
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });
    });
});
