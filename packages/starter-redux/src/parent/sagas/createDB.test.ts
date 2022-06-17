import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
import { putCreateDBSAga, createDBSaga, watchCreateDBSaga } from './createDB.js';
import db from '../../db.js';
import { name } from '../common.js';

import createAction from '../actions/create.js';
import createDBAction from '../actions/createDB.js';
import { Interface, validate } from '../model/interface.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}/sagas/createDB.ts`, () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    beforeEach(async () => {
        indexedDB = new FDBFactory();
    });

    describe('unit', () => {
        it('putCreate', async () => {
            const create = createAction(item);
            testSaga(putCreateDBSAga, create).next().put(createDBAction(item, create.meta.uuid)).next().isDone();
        });

        it('createDB', async () => {
            const models = await db.connect();
            testSaga(createDBSaga, createDBAction(item))
                .next()
                .call([db, db.connect])
                .next(models)
                .call([models[name], models[name].create], item)
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('createDB', async () => {
            await expectSaga(createDBSaga, createDBAction(item)).run();

            //DB State
            const models = await db.connect();
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });

        it('watchCreateDBSaga', async () => {
            await expectSaga(watchCreateDBSaga).dispatch(createDBAction(item)).run();

            //DB State
            const models = await db.connect();
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });
    });
});
