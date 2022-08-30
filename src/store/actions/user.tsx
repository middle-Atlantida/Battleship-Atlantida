import { IUser } from '../reducers/user';

export const action = {
    SET_USER: 'SET_USER',
};

export function setUser(userInfo: IUser) {
    return { type: action.SET_USER, user: userInfo };
}
