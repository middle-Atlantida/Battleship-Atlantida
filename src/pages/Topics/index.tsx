import { Header } from 'components/Header';
import { forumsData, ITopic } from 'const/mockForumsData';
import { routes } from 'pages/Root';
import React from 'react';
import { useParams } from 'react-router';
import { Button, Link } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';
import cn from 'classnames';
import { PageWithHeader } from 'components/PageWithHeader';
import css from './Topics.module.css';

export const Topics = () => {
    const { forumId } = useParams();
    const forum = forumsData.find(f => f.id === Number(forumId));

    return (
        <>
            <PageWithHeader
                headerTitle={forum?.title ?? ''}
                headerBackText='К форумам'
                headerBackLink={routes.forum}
                headerChildren={
                    <Button
                        type="submit"
                        variant="contained"
                        className={cn(css.button)}
                    >
                        Создать тему
                    </Button>
                }
            >
                <ul className={css.tableRow}>
                    <li>Темы</li>
                    <li>Ответы</li>
                </ul>
                {forum?.topics && forum.topics.map(({
                    id, title, replyCount,
                }: ITopic, index: number) => (
                    <ul className={css.tableRow} key={`topic${index}`}>
                        <li>
                            <Link
                                color="primary"
                                component={RouteLink}
                                to={`${id}`}
                            >
                                {title}
                            </Link>
                        </li>
                        <li>{replyCount}</li>
                    </ul>
                ))}
            </PageWithHeader>
        </>
    );
};
