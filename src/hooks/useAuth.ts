import { RootState } from 'store';
import { IUser } from 'store/reducers/user';

import { useAppSelector } from './useAppSelector';

export const useAuth = async () => {
    const user: IUser = useAppSelector((state: RootState) => state.userReducer.user) as IUser;
    return !!user.id;
};
