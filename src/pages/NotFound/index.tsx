import { ErrorLayout } from 'components/ErrorLayout';

export const NotFound = () => (
    <ErrorLayout title="404" text={'Ошибка!\nК сожалению, запрашиваемая страница не найдена.'} />
);
