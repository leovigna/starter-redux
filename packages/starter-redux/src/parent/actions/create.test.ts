import { assert } from 'chai';
import createAction from './create.js';
import { Interface, validate } from '../model/interface.js';
import { getOrm } from '../../orm.js';
import { rootReducer } from '../../reducer.js';

describe('Parent/actions/create.ts', () => {
    const item: Interface = validate({ firstName: 'John', lastName: 'Doe', age: 42 });

    describe('unit', () => {
        it('create', async () => {
            const initialState = getOrm().getEmptyState();
            const action = createAction(item);

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

            const state = rootReducer(initialState, action);
            assert.deepEqual(expectedState, state);
        });
    });
});
