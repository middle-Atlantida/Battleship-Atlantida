type IUser = {
    'id': number,
    'first_name': string,
    'second_name': string,
    'display_name': string,
    'login': string,
    'email': string,
    'phone': string,
    'avatar': string
};

export function userReducer(state: IUser | object = {}, { type, user }: any = {}) {
    switch (type) {
        case 'SET_USER':
            return { ...state, user };
        default:
            return state;
    }
}

export function setUser(userInfo: IUser) {
    return { type: 'SET_USER', user: userInfo };
}
