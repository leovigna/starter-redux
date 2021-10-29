import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { name } from '../common';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';
import { useByIdSingle, useByIdMany } from '../hooks';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    const john = { firstName: 'John', lastName: 'Doe', age: 42 };
    const johnId = 'John-Doe';
    const johnWithId = { id: johnId, ...john };

    let wrapper: any;

    beforeEach(() => {
        store = createStore();
        store.dispatch(create(john));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    it('useByIdSingle', async () => {
        const { result } = renderHook(() => useByIdSingle(johnId), {
            wrapper,
        });

        assert.deepEqual(result.current, johnWithId);
        assert.equal(result.all.length, 1);
    });

    it('useByIdMany', async () => {
        const { result } = renderHook(() => useByIdMany([johnId]), {
            wrapper,
        });

        assert.deepEqual(result.current, [johnWithId]);
        assert.equal(result.all.length, 1);
    });
});
