import { LEADERBOARD_URL, LEADERBOARD_USERS_URL } from '../const/apiConstants';
import { axiosClient } from './axiosClient';

export interface IUserAddLeaderboard {
    data: {
        urlImg: string,
        nickname: string,
        score: number,
    },
    ratingFieldName: string,
    teamName: string
}

export interface ILeaderBoard {
    ratingFieldName: string,
    cursor: number,
    limit: number,
}

export const LeaderboardAPI = {
    toLeaderboard: (data: IUserAddLeaderboard) => axiosClient.post(LEADERBOARD_URL, data),
    leaderboardUsers: async (data: ILeaderBoard) => axiosClient.post(LEADERBOARD_USERS_URL, data),
};
