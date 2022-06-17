import { assert } from 'chai';
import createAction, { CREATE, CreateAction, isCreateAction } from './create.js';
import { Interface, validate } from '../model/interface.js';
import { getOrm } from '../../orm.js';
import { rootReducer } from '../../reducer.js';
import { name } from '../common.js';

describe(`${name}/actions/create.ts`, () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    describe('unit', () => {
        it('create', () => {
            const expected: CreateAction = {
                type: CREATE,
                payload: { ...item },
                meta: {
                    uuid: '',
                },
            };
            assert.isTrue(isCreateAction(expected));
            assert.deepEqual(createAction(item, ''), expected);
        });

        it('create', async () => {
            const initialState = getOrm().getEmptyState();
            const action = createAction(item);

            //Redux State
            const expectedState = {
                '@@_______REDUX_ORM_STATE_FLAG': true,
                [name]: {
                    items: ['John-Doe'],
                    itemsById: {
                        'John-Doe': { firstName: 'John', lastName: 'Doe', age: 42, id: 'John-Doe' },
                    },
                    indexes: {},
                    meta: { maxId: NaN },
                },
                Parent: { items: [], itemsById: {}, indexes: {}, meta: {} },
            };

            const state = rootReducer(initialState, action);
            assert.deepEqual(expectedState, state);
        });
    });
});
