import { legacy_createStore as createStore } from 'redux';

import { rootReducer } from './reducers';

export function configureStore(initialState = {}) {
    return createStore(rootReducer, initialState);
}
