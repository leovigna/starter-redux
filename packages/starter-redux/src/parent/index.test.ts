import { assert } from 'chai';
import { getId, validate } from './model/index.js';
import { createAction } from './actions/index.js';
import { selectByIdSingle } from './selectors/index.js';
import { name } from './common.js';
import { createStore, StoreType } from '../store.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}.integration`, () => {
    const item = {
        firstName: 'John',
        lastName: 'Doe',
        age: 42,
    };
    const id = getId(item);
    const itemWithId = validate(item);

    let store: StoreType;

    beforeEach(() => {
        indexedDB = new FDBFactory();
        store = createStore();
    });

    describe('selectors', () => {
        it('selectByIdSingle', () => {
            store.dispatch(createAction(item));
            const selected1 = selectByIdSingle(store.getState(), id);
            assert.deepEqual(selected1, itemWithId);
        });
    });
});
