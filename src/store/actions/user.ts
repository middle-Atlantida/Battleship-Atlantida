import { AuthAPI } from 'api/auth';
import { AppThunk } from 'store';
import { IUser, IUserState } from 'store/reducers/user';

type PropType<T, K extends keyof T> = T[K];

export const actions = {
    INIT_USER: 'INIT_USER',
    SET_USER: 'SET_USER',
    SET_ERROR_USER: 'SET_ERROR_USER',
};

const initUserAction = (isInitialized: PropType<IUserState, 'isInitialized'>) => ({
    type: actions.INIT_USER,
    payload: { isInitialized },
});

const setUserAction = (user: PropType<IUserState, 'user'>) => ({
    type: actions.SET_USER,
    payload: { user, error: null },
});

const setErrorAction = (error: PropType<IUserState, 'error'>) => ({
    type: actions.SET_ERROR_USER,
    payload: { user: null, error },
});

export const setUser = (user: PropType<IUserState, 'user'>): AppThunk => async dispatch => {
    await dispatch(setUserAction(user));
    return Promise.resolve();
};

export const getUser = (): AppThunk => async dispatch => {
    try {
        const user = await AuthAPI.me() as IUser;
        await dispatch(setUser(user));
        return Promise.resolve(user);
    } catch (error: unknown) {
        const { message } = error as Error;
        await dispatch(setErrorAction(message));
        return Promise.reject(error);
    }
};

export const logoutUser = (): AppThunk => async dispatch => {
    await dispatch(setUser(null));
    return Promise.resolve();
};

export const init = (): AppThunk => async dispatch => {
    try {
        const user = await dispatch(getUser());
        return Promise.resolve(user);
    } catch (error: unknown) {
        const { message } = error as Error;
        return Promise.reject(message);
    } finally {
        await dispatch(initUserAction(true));
    }
};
