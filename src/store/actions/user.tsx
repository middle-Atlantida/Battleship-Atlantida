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

export const getUserForOAuth = async () => {
    try {
        const id = await AuthAPI.oauthId();
        await AuthAPI.oauthAuth({ code: id.service_id, redirect_uri: 'https://limitless-taiga-49611.herokuapp.com' });
        getUser();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error);
        }
    }
};
