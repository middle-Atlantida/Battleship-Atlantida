import React from 'react';
import { Header } from 'components/Header';
import { routes } from 'pages/Root';
import cn from 'classnames';
import { Image } from 'components/Image';
import { PageWithHeader } from 'components/PageWithHeader';
import css from './Leaderboard.css';

type ILeaderProfile = {
  urlImg: string;
  nickname: string;
  score: string;
};

const leadersInfo: ILeaderProfile[] = [
    {
        urlImg:
      'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
        nickname: 'Max_Fox',
        score: '60000',
    },
    {
        urlImg:
      'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
        nickname: 'Mr_Fox',
        score: '30000',
    },
];

export const Leaderboard = () => (
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
