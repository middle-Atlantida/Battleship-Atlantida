import React, { useEffect } from 'react';
import { Forums } from 'pages/Forums';
import { Leaderboard } from 'pages/Leaderboard';
import { MainMenu } from 'pages/MainMenu';
import { NotFound } from 'pages/NotFound';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { Route, Routes } from 'react-router-dom';
import { Settings } from 'pages/Settings';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Topic } from 'pages/Topic';
import { Topics } from 'pages/Topics';
import { init } from 'store/actions/user';
import { store } from 'store';
import { useAppDispatch } from 'utils/hooks';

export const routes = {
    main: '/',
    login: '/login',
    registration: '/registration',
    game: '/game',
    settings: '/settings',
    leaderboard: '/leaderboard',
    forum: '/forums',
    notfound: '*',
};

export const Root = () => {
    const dispatch = useAppDispatch();

    useEffect(() => () => {
        const initializeStore = async () => {
            try {
                await dispatch(init());
            } catch (e: unknown) {
                console.log('Error while initialization:', e);
            } finally {
                console.log('Store is initialized:\n', store.getState());
            }
        };
        initializeStore();
    }, []);

    return (
        <Routes>
            <Route path={routes.main} element={
                <ProtectedRoute>
                    <MainMenu />
                </ProtectedRoute>
            } />
            <Route path={routes.login} element={<SignIn />} />
            <Route path={routes.registration} element={<SignUp />} />
            <Route path={routes.game} element={
                <ProtectedRoute>
                    <SignUp />
                </ProtectedRoute>
            } />
            <Route path={routes.settings} element={
                <ProtectedRoute>
                    <Settings/>
                </ProtectedRoute>
            } />
            <Route path={routes.leaderboard} element={
                <ProtectedRoute>
                    <Leaderboard />
                </ProtectedRoute>
            } />
            <Route path={routes.forum}>
                <Route index element={
                    <ProtectedRoute>
                        <Forums />
                    </ProtectedRoute>
                } />
                <Route path=":forumId">
                    <Route index element={
                        <ProtectedRoute>
                            <Topics />
                        </ProtectedRoute>
                    } />
                    <Route path=":topicId" element={
                        <ProtectedRoute>
                            <Topic />
                        </ProtectedRoute>
                    } />
                </Route>

            </Route>
            <Route path={routes.notfound} element={
                <NotFound />
            } />
        </Routes>
    );
};
