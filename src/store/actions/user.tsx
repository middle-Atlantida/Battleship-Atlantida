import { IUser } from '../reducers/user';

export const actions = {
    SET_USER: 'SET_USER',
};

export function setUser(userInfo: IUser) {
    return { type: actions.SET_USER, user: userInfo };
}
