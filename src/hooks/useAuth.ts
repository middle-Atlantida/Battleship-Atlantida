import { RootState } from 'store';
import { getUser } from 'store/actions/user';
import { IUser } from 'store/reducers/user';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useAuth = async () => {
    const dispatch = useAppDispatch();
    let user: IUser = useAppSelector((state: RootState) => state.userReducer.user) as IUser;
    if (!user) {
        try {
            user = (await dispatch(getUser())) as unknown as IUser;
        } catch (error) {
            console.log(error);
        }
    }
    return !!user;
};
