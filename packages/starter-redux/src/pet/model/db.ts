// db.ts
import Dexie, { Table } from 'dexie';
//@ts-ignore
import setGlobalVars from 'indexeddbshim';
import { PetIndex, Pet } from './interface.js';
import isClient from '../../utils/isClient.js';

export class StarterReduxDexie extends Dexie {
    pets!: Table<Pet>;

    constructor() {
        super('StarterRedux');
        this.version(1).stores({
            pets: PetIndex, // Primary key and indexed props
        });
    }
}

let db: StarterReduxDexie;
interface GetDBOptions {
    fake: boolean;
}
export function getDB(options?: GetDBOptions) {
    if (db) return db;

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
    db = new StarterReduxDexie();
    return db;
}
