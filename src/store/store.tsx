import { legacy_createStore as createStore } from 'redux';
import { reducers } from './reducers';

export function storeReducers(initialState = {}) {
    return createStore(reducers, initialState);
}
