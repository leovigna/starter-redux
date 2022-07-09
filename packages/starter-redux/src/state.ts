import { Pet } from './pet/model/index.js';

export interface StateRoot {
    reduxStarter: State;
}

/**
 * Redux State Interface for the `web3Redux` slice.
 */
export interface State {
    /** Redux ORM */
    ['@@_______REDUX_ORM_STATE_FLAG']: boolean;
    /** Networks indexed by id */
    Pet: {
        items: string[];
        itemsById: { [id: string]: Pet };
    };
}

export default State;
