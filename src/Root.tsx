import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from 'components/ProtectedRoute';
import { useToggleFullScreen, useAppDispatch } from 'hooks';
import { Forums } from 'pages/Forums';
import { Game } from 'pages/Game';
import { Leaderboard } from 'pages/Leaderboard';
import { MainMenu } from 'pages/MainMenu';
import { NotFound } from 'pages/NotFound';
import { Settings } from 'pages/Settings';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Topic } from 'pages/Topic';
import { Topics } from 'pages/Topics';
import { store } from 'store';
import { init } from 'store/actions/user';
import { consoleLog } from 'utils/consoleLog';

export const routes = {
    main: '/',
    signIn: '/sign-in',
    signUp: '/sign-up',
    game: '/game',
    settings: '/settings',
    leaderboard: '/leaderboard',
    forums: '/forums',
    notfound: '*',
};

export const Root = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initializeStore = async () => {
            try {
                await dispatch(init());
            } catch (err) {
                consoleLog('Error while initialization:', err);
            } finally {
                consoleLog('Store is initialized:\n', store.getState());
            }
        };
        initializeStore();
    }, [dispatch]);

    // TODO перенести хук в игру
    useToggleFullScreen();

    return (
        <Routes>
            <Route path={routes.main} element={
                <ProtectedRoute>
                    <MainMenu/>
                </ProtectedRoute>
            }/>
            <Route path={routes.signIn} element={<SignIn/>}/>
            <Route path={routes.signUp} element={<SignUp/>}/>
            <Route path={routes.game} element={
                <ProtectedRoute>
                    <Game/>
                </ProtectedRoute>
            }/>
            <Route path={routes.settings} element={
                <ProtectedRoute>
                    <Settings/>
                </ProtectedRoute>
            }/>
            <Route path={routes.leaderboard} element={
                <ProtectedRoute>
                    <Leaderboard/>
                </ProtectedRoute>
            }/>
            <Route path={routes.forums}>
                <Route index element={
                    <ProtectedRoute>
                        <Forums/>
                    </ProtectedRoute>
                }/>
                <Route path=":forumId">
                    <Route index element={
                        <ProtectedRoute>
                            <Topics/>
                        </ProtectedRoute>
                    }/>
                    <Route path=":topicId" element={
                        <ProtectedRoute>
                            <Topic/>
                        </ProtectedRoute>
                    }/>
                </Route>

            </Route>
            <Route path={routes.notfound} element={
                <NotFound/>
            }/>
        </Routes>
    );
};
