import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { rootReducer } from 'store/reducers';

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
