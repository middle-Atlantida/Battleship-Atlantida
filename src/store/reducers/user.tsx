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
    state: IUser | object = {},
    action: {
        type: string, payload: {
            user: IUser
        }
    },
) {
    switch (action.type) {
        case actions.GET_USER_INITIAL:
            return { ...state };
        case actions.GET_USER_SUCCESS:
            return { ...state, user: action };
        default:
            return state;
    }
}
