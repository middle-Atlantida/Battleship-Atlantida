import React from 'react';

import { Link } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';

import { PageWithHeader } from 'components/PageWithHeader';
import { forumsData, IForum } from 'const/mockForumsData';
import { routes } from 'src/Root';

import css from './Forums.css';

export const Forums = () => (
    <>
        <PageWithHeader headerTitle="Форумы" headerBackLink={routes.main}>
            <ul className={css.tableRow}>
                <li>Форумы</li>
                <li>Темы</li>
                <li>Ответы</li>
            </ul>
            {forumsData.map(({ id, title, topicCount, replies }: IForum, index: number) => (
                <ul className={css.tableRow} key={`forum${index}`}>
                    <li>
                        <Link color="primary" component={RouteLink} to={`${id}`}>
                            {title}
                        </Link>
                    </li>
                    <li>{topicCount}</li>
                    <li>{replies}</li>
                </ul>
            ))}
        </PageWithHeader>
    </>
);
