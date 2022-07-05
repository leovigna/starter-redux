import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { useByIdSingle } from '../index.js';
import { Pet } from '../model/interface.js';
import { getDB, StarterReduxDexie } from '../model/db.js';

//eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const jsdom = require('mocha-jsdom');

describe('pet/hooks/useByIdSingle.test.tsx', () => {
    jsdom({ url: 'http://localhost' });

    const item: Pet = { id: 1, name: 'Flocon', age: 10, type: 'dog' };
    let db: StarterReduxDexie;

    before(async () => {
        db = getDB({ fake: true });
    });

    it('useByIdSingle', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useByIdSingle(1));

        await db.pets.add(item);
        await waitForNextUpdate();

        assert.deepEqual(result.current, item);
        assert.equal(result.all.length, 2);
    });

    afterEach(async () => {
        await db.pets.clear();
    });
});
