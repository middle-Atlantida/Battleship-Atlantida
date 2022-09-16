import { actions } from 'store/actions/user';

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

export type IUserState = {
    user: IUser | null,
    error: string | null,
    isInitialized: boolean
}

const initialState: IUserState = {
    user: null,
    error: null,
    isInitialized: false,
};

export function userReducer(
    state = initialState,
    action: {
        type: string,
        payload: {
            user: IUser,
            error: string,
            isInitialized: boolean
        }
    },
) {
    switch (action.type) {
        case actions.INIT_USER:
            return {
                ...state,
                isInitialized: action.payload.isInitialized,
            };
        case actions.SET_USER:
            return {
                ...state,
                user: action.payload.user,
                error: action.payload.error,
            };
        case actions.SET_ERROR_USER:
            return {
                ...state,
                user: action.payload.user,
                error: action.payload.error,
            };

        default:
            return state;
    }
}
