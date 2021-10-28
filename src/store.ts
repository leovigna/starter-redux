import { combineReducers, createStore as createReduxStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { REDUX_ROOT } from './common';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';

const reducers = combineReducers({
    [REDUX_ROOT]: rootReducer,
});

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(reducers, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default createStore();
