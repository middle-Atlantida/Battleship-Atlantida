import React from 'react';
import cn from 'classnames';
import Header from 'components/Header';
import css from './Leaderboard.module.css';

type ILeaderProfile = {
    urlImg: string;
    nickname: string;
    score: string;
};

const leadersInfo: ILeaderProfile[] = [
    {
        urlImg: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
        nickname: 'Max_Fox',
        score: '60000',
    },
    {
        urlImg: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
        nickname: 'Mr_Fox',
        score: '30000',
    },
];

const Leaderboard = () => (
    <>
        <Header title={'Таблица лидеров'}/>
        <main className={cn(css.container)}>
            <ul className={css.leaderBoardTable}>
                <li>#</li>
                <li className={css.profileInfo}>Игрок</li>
                <li>Счёт</li>
            </ul>
            {leadersInfo.map(({ urlImg, nickname, score }: ILeaderProfile, index: number) => (
                <ul className={css.leaderBoardTable} key={`leaderProfile${index}`}>
                    <li className={css.rowNumber}>{index + 1}</li>
                    <li className={css.profileInfo}>
                        <img
                            src={urlImg}
                            alt="avatar" className={css.profileImg}/>
                        {nickname}
                    </li>
                    <li>{score}</li>
                </ul>
            ))}
        </main>
    </>
);

export default Leaderboard;
