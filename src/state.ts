import { Parent } from './parent/model/index.js';

export interface StateRoot {
    reduxStarter: State;
}

/**
 * Redux State Interface for the `web3Redux` slice.
 */
export interface State {
    /** Redux ORM */
    ['@@_______REDUX_ORM_STATE_FLAG']: boolean;
    /** Redux Persist */
    ['_persist']: { version: number; rehydrated: boolean };
    /** Networks indexed by id */
    Parent: {
        items: string[];
        itemsById: { [networkId: string]: Parent };
    };
}

export default State;
