import { RootState } from 'store';
import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
    const user = useAppSelector((state: RootState) => state.userReducer.user);
    return !!user;
};
