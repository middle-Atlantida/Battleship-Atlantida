import { Dispatch } from '@reduxjs/toolkit';
import { AuthAPI } from '../../api/auth';
import { IUser } from '../reducers/user';

export const actions = {
    GET_USER_INITIAL: 'GET_USER_INITIAL',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
};

const getUserInitial = () => ({
    type: actions.GET_USER_INITIAL,
});

const getUserComplete = (user: IUser) => ({
    type: actions.GET_USER_SUCCESS,
    user,
});

export const getUser = () => async (dispatch: Dispatch) => {
    dispatch({ type: actions.GET_USER_INITIAL });
    try {
        const user = await AuthAPI.me();
        dispatch({ type: actions.GET_USER_SUCCESS, user });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error);
        }
    }
};
