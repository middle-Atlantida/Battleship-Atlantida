import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute } from 'components/ProtectedRoute';
import SignUp from 'pages/SignUp';

export const Root = () => (
    <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/login" element={<SignUp/>}/>
        <Route path="/registration" element={<SignUp/>}/>
        <Route path="/menu" element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path="/game" element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path="/settings" element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path="/leaderboard" element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path="/forum" element={
            <ProtectedRoute>
                <SignUp/>
            </ProtectedRoute>
        }/>
        <Route path="*" element={<Navigate to="/menu" replace />} />
    </Routes>
);
