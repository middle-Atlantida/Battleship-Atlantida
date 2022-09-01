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

export function userReducer(
    state: IUser | object,
    { type, user }: { type: string, user: IUser },
) {
    switch (type) {
        case actions.SET_USER:
            return { ...state, user };
        default:
            return state;
    }
}
