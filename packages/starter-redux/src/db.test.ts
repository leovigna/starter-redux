// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { settings as ParentSettings } from './parent/model/ormDB.js';
import { settings as ChildSettings } from './child/model/ormDB.js';
import { REDUX_ROOT } from './common.js';
import isClient from './utils/isClient.js';

const settings = {
    name: REDUX_ROOT,
    version: 1,
    tables: [ParentSettings, ChildSettings],
};

describe('db.ts', () => {
    describe('getDB', () => {
        it('', async () => {
            if (!isClient()) {
                require('fake-indexeddb/auto');
                console.debug('Running in NodeJS Context. Setting up fake-indexeddb');
            }

            const db = new Connector(settings);
            await db.connect();
        });
    });
});
