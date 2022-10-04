import { useState, useEffect } from 'react';

import { ListItemText, Typography } from '@mui/material';
import classNames from 'classnames';

import { LeaderboardAPI } from 'api/leaderboard';
import { Image } from 'components/Image';
import { PageWithHeader } from 'components/PageWithHeader';
import { routes } from 'src/Root';

import css from './Leaderboard.css';

type ILeaderProfile = {
    urlImg: string;
    nickname: string;
    score: string;
};

export const Leaderboard = () => {
    const [leadersInfo, setLeadersInfo] = useState<ILeaderProfile[]>([]);

    const getLeaderboard = async () => {
        try {
            const data = {
                ratingFieldName: 'score',
                cursor: 0,
                limit: 0,
            };
            // eslint-disable-next-line max-len
            const leaderboardList: ILeaderProfile[] | unknown =
                await LeaderboardAPI.leaderboardUsers(data);
            if (leaderboardList && Array.isArray(leaderboardList)) {
                setLeadersInfo(leaderboardList);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error}`);
            }
        }
    };

    useEffect(
        () => () => {
            getLeaderboard().then();
        },
        [],
    );

    return (
        <>
            <PageWithHeader headerTitle="Таблица лидеров" headerBackLink={routes.main}>
                <ul className={css.tableRow}>
                    <ListItemText>
                        <Typography variant="body1" fontWeight="bold">
                            #
                        </Typography>
                    </ListItemText>

                    <ListItemText>
                        <Typography
                            variant="body1"
                            fontWeight="bold"
                            className={classNames(css.profileInfo)}
                        >
                            Игрок
                        </Typography>
                    </ListItemText>

                    <ListItemText>
                        <Typography variant="body1" textAlign="end" fontWeight="bold">
                            Счёт
                        </Typography>
                    </ListItemText>
                </ul>
                {leadersInfo.map(({ urlImg, nickname, score }: ILeaderProfile, index: number) => (
                    <ul className={css.tableRow} key={`leaderProfile${index}`}>
                        <ListItemText>
                            <Typography
                                variant="body1"
                                fontWeight="bold"
                                className={classNames(css.rowNumber)}
                            >
                                {index + 1}
                            </Typography>
                        </ListItemText>

                        <ListItemText className={classNames(css.profileInfo)}>
                            <Image src={urlImg} alt="avatar" className={css.profileImg} />

                            <Typography variant="body1">{nickname}</Typography>
                        </ListItemText>

                        <ListItemText>
                            <Typography variant="body1" textAlign="end">
                                {score}
                            </Typography>
                        </ListItemText>
                    </ul>
                ))}
            </PageWithHeader>
        </>
    );
};
