import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { rmSync, existsSync } from 'fs';
import { useByIdSingle } from '../index.js';
import { Pet } from '../model/interface.js';
import { getDB, StarterReduxDexie } from '../model/db.js';

//eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const jsdom = require('mocha-jsdom');

describe('pet/hooks/useByIdSingle.test.tsx', () => {
    jsdom({ url: 'http://localhost' });

    const item: Pet = { id: 1, name: 'Flocon', age: 10, type: 'dog' };
    let db: StarterReduxDexie;

    const sqliteDB = ['__sysdb__.sqlite', 'D_^Starter^Redux.sqlite'];

    before(async () => {
        sqliteDB.forEach((p) => existsSync(p) && rmSync(p));
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

    after(() => {
        sqliteDB.forEach((p) => existsSync(p) && rmSync(p));
    });
});
