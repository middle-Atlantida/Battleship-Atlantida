import React, { useState, useEffect } from 'react';
import { Image } from 'components/Image';
import { PageWithHeader } from 'components/PageWithHeader';
import { routes } from 'src/Root';
import css from './Leaderboard.css';
import { LeaderboardAPI } from '../../api/leaderboard';

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
            const leaderboardList: ILeaderProfile[] | unknown = await LeaderboardAPI.leaderboardUsers(data);
            if (leaderboardList && Array.isArray(leaderboardList)) {
                setLeadersInfo(leaderboardList);
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error}`);
            }
        }
    };

    useEffect(() => () => {
        getLeaderboard().then();
    }, []);

    return (
        <>
            <PageWithHeader
                headerTitle='Таблица лидеров'
                headerBackLink={routes.main}
            >
                <ul className={css.tableRow}>
                    <li>#</li>
                    <li className={css.profileInfo}>Игрок</li>
                    <li>Счёт</li>
                </ul>
                {leadersInfo.map(
                    ({ urlImg, nickname, score }: ILeaderProfile, index: number) => (
                        <ul className={css.tableRow} key={`leaderProfile${index}`}>
                            <li className={css.rowNumber}>{index + 1}</li>
                            <li className={css.profileInfo}>
                                <Image src={urlImg} alt="avatar" className={css.profileImg} />
                                {nickname}
                            </li>
                            <li>{score}</li>
                        </ul>
                    ),
                )}
            </PageWithHeader>
        </>
    );
};
