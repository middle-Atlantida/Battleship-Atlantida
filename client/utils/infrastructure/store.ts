import {
    bindActionCreators,
    combineReducers,
    Action,
    Reducer,
} from 'redux';
import {ThunkAction} from 'redux-thunk';
import configureStore from "../../store";
import {BaseStore, reducers} from "../../reducers";
import routerReducer from '../../reducers/router';

export interface Indexed<T = any> {
    [x: string]: T;
}

export type Assign<T, K> = Pick<T, Exclude<keyof T, keyof K>> & K;

const state = (window as any).__PRELOADED_STATE__;
delete (window as any).__PRELOADED_STATE__;

const {store: reduxStore, history} = configureStore(reducers, state, {isLogger: true});

export function hasReducer(key: string): boolean {
    return !!reducers[key];
}

export function rootReducerFactory<E>(extention: E = ({} as E)) {
    const finalHash = {
        ...reducers,
        ...extention,
        router: routerReducer(history),
    };
    return combineReducers(finalHash);
}

const recombineStoreWith = <E extends Indexed<Reducer>>(extention: E) => {
    // Нужно для избежания ошибки во время HMR
    if (Object.keys(extention).every(hasReducer)) {
        return;
    }

    reduxStore.replaceReducer(rootReducerFactory(extention) as any);
    reduxStore.dispatch({type: '@@redux/RECOMBINE'});
};

function bindActions<A extends Indexed>(actions: A): A {
    return Object.keys(actions).reduce((result, key) => {
        const subObj = actions[key];

        return {
            ...result,
            [key]: typeof subObj === 'function'
                ? bindActionCreators(subObj, reduxStore.dispatch)
                : bindActions(subObj),
        };
    }, {} as A);
}

export type CommonStore = ReturnType<typeof reduxStore.getState> & BaseStore;
export type ExtendedState<S> = Assign<CommonStore, S>;
export type CommonThunkAction<T, R> = ThunkAction<null, T, R, Action>;

function getStore<T extends CommonStore>(): T {
    return reduxStore.getState() as T;
}

export {
    history,
    getStore,
    reduxStore,
};

export default {
    ...reduxStore,
    bindActions,
    recombineStoreWith,
};
