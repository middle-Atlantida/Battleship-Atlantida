import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

export function configureStore(initialState = {}) {
    return createStore(reducers, initialState, applyMiddleware(thunk));
}
