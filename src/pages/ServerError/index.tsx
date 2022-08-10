import React from 'react';
import { ErrorLayout } from 'components/ErrorLayout';

export const ServerError = () => (
    <ErrorLayout
        title="500"
        text={'Внутренняя ошибка сервера.\nМы о ней знаем и скоро ее исправим!'}
    />
);
