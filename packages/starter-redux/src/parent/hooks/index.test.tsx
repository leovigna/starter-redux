import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import { createAction } from '../actions/index.js';
import { useByIdSingle, useByIdMany } from '../hooks/index.js';
import { Interface, getId } from '../model/interface.js';

//eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const jsdom = require('mocha-jsdom');
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}.hooks`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;

    const item: Interface = { firstName: 'John', lastName: 'Doe', age: 42 };
    const id = getId(item);
    const itemWithId: Interface = { id, ...item };

    let wrapper: any;

    beforeEach(() => {
        indexedDB = new FDBFactory();

        store = createStore();
        store.dispatch(createAction(item));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    it('useByIdSingle', async () => {
        const { result } = renderHook(() => useByIdSingle(id), {
            wrapper,
        });

        assert.deepEqual(result.current, itemWithId);
        assert.equal(result.all.length, 1);
    });

    it('useByIdMany', async () => {
        const { result } = renderHook(() => useByIdMany([id]), {
            wrapper,
        });

        assert.deepEqual(result.current, [itemWithId]);
        assert.equal(result.all.length, 1);
    });
});
