import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { SignUp } from 'pages/SignUp';
import { SignIn } from 'pages/SignIn';
import { MainMenu } from 'pages/MainMenu';
import { NotFound } from 'pages/NotFound';
import { Leaderboard } from 'pages/Leaderboard';
import { Forums } from 'pages/Forums';
import { Topics } from 'pages/Topics';
import { Topic } from 'pages/Topic';
import { Settings } from '../Settings';

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

export const Root = () => (
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
