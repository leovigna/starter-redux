import { combineReducers, createStore as createReduxStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { REDUX_ROOT } from './common.js';
import { rootReducer } from './reducer.js';
import { rootSaga } from './saga.js';

const reducers = combineReducers({
    [REDUX_ROOT]: rootReducer,
});

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(reducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};

export type StoreType = ReturnType<typeof createStore>;
export type DispatchType = StoreType['dispatch'];

export default createStore();
