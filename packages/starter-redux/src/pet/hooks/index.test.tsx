import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { name } from '../common.js';

import { createStore, StoreType } from '../../store.js';
import { pet0 } from '../data.js';
import PetCRUD from '../crud.js';

describe(`${name}/hooks/useByIdSingle.test.tsx`, () => {
    let store: StoreType;

    let wrapper: any;

    beforeEach(() => {
        store = createStore();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useGet', () => {
        it('(id)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => PetCRUD.hooks.useGet('0'), {
                wrapper,
            });

            store.dispatch(PetCRUD.actions.create(pet0));
            await waitForNextUpdate();

            const current = result.current;
            assert.deepEqual(current, pet0, 'result.current');
        });
    });
});
