// db.ts
import Dexie, { Table } from 'dexie';
//@ts-ignore
import setGlobalVars from 'indexeddbshim';
import { REDUX_ROOT } from './common.js';
import { Pet, PetIndex } from './pet/model/index.js';

import isClient from './utils/isClient.js';

export class Web3ReduxDexie extends Dexie {
    Pet!: Table<Pet>;

    constructor() {
        super(REDUX_ROOT);
        this.version(1).stores({
            Pet: PetIndex,
        });
    }
}

let db: Web3ReduxDexie;
interface GetDBOptions {
    fake: boolean;
}

export function setDB(newDb: Web3ReduxDexie) {
    db = newDb;
}

export function getDB(options?: GetDBOptions) {
    if (db) return db;
    db = createDB(options);
    return db;
}

export function createDB(options?: GetDBOptions) {
    if (!isClient() || options?.fake) {
        console.debug('Creating Dexie with fake-indexeddb');
        const shim: any = {};
        //@ts-ignore
        //global.window = global; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
        setGlobalVars(shim, { checkOrigin: false }); // See signature below
        const { indexedDB, IDBKeyRange } = shim;
        Dexie.dependencies.indexedDB = indexedDB;
        Dexie.dependencies.IDBKeyRange = IDBKeyRange;
    } else {
        console.debug('Creating Dexie with real indexeddb');
    }
    return new Web3ReduxDexie();
}

export default getDB;
