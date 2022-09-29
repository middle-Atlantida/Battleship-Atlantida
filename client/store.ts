import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory, createMemoryHistory} from 'history';
import isServer from "./utils/serverSide/isServerEnvCheker";
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
    Middleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

interface StoreOptions {
    isLogger: boolean;
    router?: {
        initialEntries: string[];
    };
}

function configureStore(reducers = {}, initialState = {}, options?: StoreOptions) {
    const {router} = options || ({} as StoreOptions);

    const history = !isServer
        ? createBrowserHistory()
        : createMemoryHistory({initialEntries: router?.initialEntries || ['/']});

    const middlewares: Middleware[] = [
        thunkMiddleware,
        routerMiddleware(history),
    ];

    const store = createStore(
        combineReducers({
            ...reducers
        }),
        initialState,
        compose(applyMiddleware(...middlewares)),
    );
    store.dispatch({type: '@@redux/INIT'});

    if ((module as any).hot) {
        (module as any).hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return {store, history};
}

export default configureStore;
