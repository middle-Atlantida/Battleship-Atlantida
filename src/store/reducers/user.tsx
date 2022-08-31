import { actions } from '../actions/user';

export type IUser = {
    'id': number,
    'first_name': string,
    'second_name': string,
    'display_name': string,
    'login': string,
    'email': string,
    'phone': string,
    'avatar': string
};

export function user(state: IUser | object = {}, { type, user }: any = {}) {
    switch (type) {
        case actions.SET_USER:
            return { ...state, user };
        default:
            return state;
    }
}
