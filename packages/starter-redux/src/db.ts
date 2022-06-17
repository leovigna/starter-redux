// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { REDUX_ROOT } from './common.js';
import isClient from './utils/isClient.js';
import { settings as ParentSettings } from './parent/model/ormDB.js';
import { settings as ChildSettings } from './child/model/ormDB.js';

const settings = {
    name: REDUX_ROOT,
    version: 1,
    tables: [ParentSettings, ChildSettings],
};

let db: Connector;
export async function getDB() {
    if (db) return db;

    if (!isClient()) {
        require('fake-indexeddb/auto');
        console.debug('Running in NodeJS Context. Setting up fake-indexeddb');
    }

    db = new Connector(settings);
    return db;
}

export default getDB;
