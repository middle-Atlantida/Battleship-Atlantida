import { Button, Link, ListItemText, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { Link as RouteLink } from 'react-router-dom';

import { PageWithHeader } from 'components/PageWithHeader';
import { forumsData, ITopic } from 'const/mockForumsData';
import { routes } from 'src/Root';

import css from './Topics.module.css';

export const Topics = () => {
    const { forumId } = useParams();
    const forum = forumsData.find(f => f.id === Number(forumId));

    return (
        <>
            <PageWithHeader
                headerTitle={forum?.title ?? ''}
                headerBackText="К форумам"
                headerBackLink={routes.forums}
                headerChildren={
                    <Button type="submit" variant="outlined" className={css.button ?? ''}>
                        Создать тему
                    </Button>
                }
            >
                <ul className={css.tableRow}>
                    <ListItemText>
                        <Typography variant="body1" fontWeight="bold">
                            Темы
                        </Typography>
                    </ListItemText>

                    <ListItemText>
                        <Typography variant="body1" textAlign="end" fontWeight="bold">
                            Ответы
                        </Typography>
                    </ListItemText>
                </ul>
                {forum?.topics &&
                    forum.topics.map(({ id, title, replyCount }: ITopic, index: number) => (
                        <ul className={css.tableRow} key={`topic${index}`}>
                            <ListItemText>
                                <Link color="primary" component={RouteLink} to={`${id}`}>
                                    {title}
                                </Link>
                            </ListItemText>

                            <ListItemText>
                                <Typography variant="body1" textAlign="end">
                                    {replyCount}
                                </Typography>
                            </ListItemText>
                        </ul>
                    ))}
            </PageWithHeader>
        </>
    );
};
