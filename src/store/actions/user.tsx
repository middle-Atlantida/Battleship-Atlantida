import { IUser } from '../../api/user';

export const actions = {
    SET_USER: 'SET_USER',
    GET_USER: 'GET_USER',
};

export function setUser(userInfo: IUser) {
    return { type: actions.SET_USER, user: userInfo };
}

export function getUser() {
    return { type: actions.GET_USER };
}
