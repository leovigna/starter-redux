// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { REDUX_ROOT } from './common.js';
import isClient from './utils/isClient.js';
import { settings as ParentSettings } from './parent/model/ormDB.js';

if (!isClient()) {
    require('fake-indexeddb/auto');
    console.debug('Running in NodeJS Context. Setting up fake-indexeddb');
}

const settings = {
    name: REDUX_ROOT,
    version: 1, //version of database
    tables: [ParentSettings],
};

export const db = new Connector(settings);

export default db;
