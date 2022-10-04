import { Link, ListItemText, Typography } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';

import { PageWithHeader } from 'components/PageWithHeader';
import { forumsData, IForum } from 'const/mockForumsData';
import { routes } from 'src/Root';

import css from './Forums.css';

export const Forums = () => (
    <>
        <PageWithHeader headerTitle="Форумы" headerBackLink={routes.main}>
            <ul className={css.tableRow}>
                <ListItemText>
                    <Typography variant="body1" fontWeight="bold">
                        Форумы
                    </Typography>
                </ListItemText>

                <ListItemText>
                    <Typography variant="body1" fontWeight="bold" textAlign="center">
                        Темы
                    </Typography>
                </ListItemText>

                <ListItemText>
                    <Typography variant="body1" fontWeight="bold" textAlign="end">
                        Ответы
                    </Typography>
                </ListItemText>
            </ul>
            {forumsData.map(({ id, title, topicCount, replies }: IForum, index: number) => (
                <ul className={css.tableRow} key={`forum${index}`}>
                    <ListItemText>
                        <Link color="primary" component={RouteLink} to={`${id}`}>
                            {title}
                        </Link>
                    </ListItemText>

                    <ListItemText>
                        <Typography variant="body1" textAlign="center">
                            {topicCount}
                        </Typography>
                    </ListItemText>

                    <ListItemText>
                        <Typography variant="body1" textAlign="end">
                            {replies}
                        </Typography>
                    </ListItemText>
                </ul>
            ))}
        </PageWithHeader>
    </>
);
