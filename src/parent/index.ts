export * from './model';
export * from './actions';
export * from './selectors';
export * from './reducer';
export * from './sagas';
export * from './hooks';

import * as Model from './model';
import * as Actions from './actions';
import * as Selectors from './selectors';
import * as Hooks from './hooks';

export default {
    ...Model,
    ...Actions,
    ...Selectors,
    ...Hooks,
};
