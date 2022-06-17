import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { loadDBAllSaga } from './loadDBAll.js';
import { createBatchedAction, loadDBAllAction } from '../actions/index.js';
import db from '../../db.js';

import { Interface, validate } from '../model/interface.js';
import { rootReducer } from '../../reducer.js';
import { getOrm } from '../../orm.js';
import { name } from '../common.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}/sagas/loadDBAll.ts`, () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    beforeEach(async () => {
        indexedDB = new FDBFactory();
    });

    describe('unit', () => {
        it('loadDBAll', async () => {
            const models = await db.connect();
            await models[name].create(item);
            const action = loadDBAllAction();

            testSaga(loadDBAllSaga, action)
                .next()
                .call([db, db.connect])
                .next(models)
                .call([models[name], models[name].all])
                .next([item])
                .put(createBatchedAction([item], action.meta.uuid))
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('loadDBAll', async () => {
            const models = await db.connect();
            await models[name].create(item);
            const action = loadDBAllAction();

            const initialState = getOrm().getEmptyState();
            const expectedState = {
                '@@_______REDUX_ORM_STATE_FLAG': true,
                Parent: {
                    items: ['John-Doe'],
                    itemsById: {
                        'John-Doe': { firstName: 'John', lastName: 'Doe', age: 42, id: 'John-Doe' },
                    },
                    indexes: {},
                    meta: { maxId: NaN },
                },
            };

            await expectSaga(loadDBAllSaga, action)
                .withReducer(rootReducer, initialState)
                .put(createBatchedAction([item], action.meta.uuid))
                .hasFinalState(expectedState)
                .run();
        });
    });
});
