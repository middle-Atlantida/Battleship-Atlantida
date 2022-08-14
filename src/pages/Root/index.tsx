import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { SignUp } from 'pages/SignUp';
import { SignIn } from 'pages/SignIn';
import { MainPage } from 'pages/MainPage';
import { NotFound } from '../NotFound';

export const routes = {
    main: '/',
    login: '/login',
    registration: '/registration',
    game: '/game',
    settings: '/settings',
    leaderboard: '/leaderboard',
    forum: '/forum',
    notfound: '*',
};

export const Root = () => (
    <Routes>
        <Route path="/" element={
            <ProtectedRoute>
                <MainPage/>
            </ProtectedRoute>
        }/>
        <Route path={routes.login} element={<SignIn/>}/>
        <Route path={routes.registration} element={<SignUp/>}/>
        <Route path={routes.game} element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path={routes.settings} element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path={routes.leaderboard} element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path={routes.forum} element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path={routes.notfound} element={
            <NotFound/>
        }/>
    </Routes>
);
