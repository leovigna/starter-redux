/**
 * Pets
 * @module Pet
 */

export * from './model/index.js';

import CRUDModel from './crud.js';

const model = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga: CRUDModel.sagas.crudRootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
    },
};

export default model;
