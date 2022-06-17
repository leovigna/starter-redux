import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
import { putCreateDBBatchedSaga, createDBBatchedSaga, watchCreateDBBatchedSaga } from './createDBBatched.js';
import { createBatchedAction, createDBBatchedAction } from '../actions/index.js';
import db from '../../db.js';

import { Interface, validate } from '../model/interface.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe('Parent/sagas/createDB.ts', () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    beforeEach(async () => {
        indexedDB = new FDBFactory();
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
                .call([db, db.connect])
                .next(models)
                .call([models.Parent, models.Parent.createMultiple], [item])
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('createDB', async () => {
            await expectSaga(createDBBatchedSaga, createDBBatchedAction([item])).run();

            //DB State
            const models = await db.connect();
            const record = await models.Parent.find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });

        it('watchCreateDBSaga', async () => {
            await expectSaga(watchCreateDBBatchedSaga)
                .dispatch(createDBBatchedAction([item]))
                .run();

            //DB State
            const models = await db.connect();
            const record = await models.Parent.find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });
    });
});
