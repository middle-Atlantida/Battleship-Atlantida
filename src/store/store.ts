import { legacy_createStore as createStore } from 'redux';

export function configureStore(initialState = {}) {
    return createStore({}, initialState);
}
