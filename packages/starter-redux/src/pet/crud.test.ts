import { assert } from 'chai';

import { pet0 } from './data.js';
import PetCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';

describe('pet/crud.test.js', () => {
    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
        });

        it('create', async () => {
            store.dispatch(PetCRUD.actions.create(pet0));

            //Redux ORM
            const pet0Redux = PetCRUD.selectors.selectByIdSingle(store.getState(), pet0.id);
            assert.deepEqual(pet0Redux, pet0);

            //Dexie
            const pet0Dexie = await PetCRUD.db.get(pet0.id);
            assert.deepEqual(pet0Dexie, pet0);
        });
    });
});
