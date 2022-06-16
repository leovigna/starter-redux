import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
import { putCreate, createDB, watchCreateDBSaga } from './createDB.js';
import db from '../../db.js';

import createAction from '../actions/create.js';
import createDBAction from '../actions/createDB.js';
import { Interface, validate } from '../model/interface.js';
import { getOrm } from '../../orm.js';
import { rootReducer } from '../../reducer.js';

describe('Parent/sagas/createDB.ts', () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    describe('unit', () => {
        it('putCreate', async () => {
            const create = createAction(item);
            testSaga(putCreate, create).next().put(createDBAction(item, create.meta.uuid)).next().isDone();
        });

        it('createDB', async () => {
            const models = await db.connect();
            testSaga(createDB, createDBAction(item))
                .next()
                .call([db, db.connect])
                .next(models)
                .call([models.Parent, models.Parent.create], item)
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('putCreate', async () => {
            const state = getOrm().getEmptyState();
            const create = createAction(item);

            //Redux State
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
            await expectSaga(putCreate, create)
                .withReducer(rootReducer, state)
                .put(createDBAction(item, create.meta.uuid))
                .hasFinalState(expectedState)
                .run();
        });

        it('createDB', async () => {
            await expectSaga(createDB, createDBAction(item))
                //.call([db, db.connect])
                //.call([models.Parent, models.Parent.create], item)
                .run();

            //DB State
            const models = await db.connect();
            const record = await models.Parent.find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });

        it.skip('watchCreateDBSaga', async () => {
            const create = createAction(item);
            //const models = await db.connect();
            await expectSaga(watchCreateDBSaga).dispatch(create).run();
        });
    });
});
