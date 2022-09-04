import { actions } from '../actions/user';
import { IUser } from '../../api/user';

export function user(state: IUser | object = {}, { type, user }: any = {}) {
    switch (type) {
        case actions.SET_USER:
            return { ...state, user };
        case actions.GET_USER:
            return state;
        default:
            return state;
    }
}
