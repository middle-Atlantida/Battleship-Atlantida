export type IForum = {
    id: number;
    title: string;
    topicCount: number;
    replies: number;
    topics: ITopic[];
};

export type ITopic = {
    id: number;
    title: string;
    replyCount: number;
    replies: IReply[];
}

export type IReply = {
    userName: string;
    userAvatar: string;
    content: string;
}

export const forumsData: IForum[] = [
    {
        id: 0,
        title: 'Новые игры',
        topicCount: 222,
        replies: 345,
        topics: [
            {
                id: 0,
                title: 'Очень интересная тема',
                replyCount: 345,
                replies: [
                    {
                        userName: 'Max_fox',
                        userAvatar: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
                        content: 'Omg this game is awesome',
                    },
                    {
                        userName: 'Kira',
                        userAvatar: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
                        content: 'Battleship is a “zero-sum game”, meaning a victory for one player will imply a loss for the other.',
                    },
                    {
                        userName: 'Max_fox',
                        userAvatar: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
                        content: 'Omg this game is awesome',
                    },
                    {
                        userName: 'Max_fox',
                        userAvatar: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
                        content: 'Omg this game is awesome',
                    },
                    {
                        userName: 'Sanka',
                        userAvatar: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
                        content: 'Shooting at the center of the grid maximizes your chances of hitting a ship. Separating the grid into even and odd                     squares, as if you were playing on a chessboard, and targeting only one type (even or odd) of square, also reduces the number of turns for a potential hit, since ships cover at least two squares.',
                    },
                    {
                        userName: 'Sanka',
                        userAvatar: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
                        content: 'Shooting at the center of the grid maximizes your chances of hitting a ship. Separating the grid into even and odd                     squares, as if you were playing on a chessboard, and targeting only one type (even or odd) of square, also reduces the number of turns for a potential hit, since ships cover at least two squares.',
                    },
                    {
                        userName: 'Sanka',
                        userAvatar: 'https://img.freepik.com/premium-vector/illustration-of-a-young-stylish-man-cartoon-handsome-bearded-man-hipster-profile-avatar_15870-758.jpg?w=2000',
                        content: 'Shooting at the center of the grid maximizes your chances of hitting a ship. Separating the grid into even and odd                     squares, as if you were playing on a chessboard, and targeting only one type (even or odd) of square, also reduces the number of turns for a potential hit, since ships cover at least two squares.',
                    },
                ],
            },
            {
                id: 1,
                title: 'Не очень интересная тема',
                replyCount: 14,
                replies: [],
            },
        ],
    },
    {
        id: 1,
        title: 'Геймдизайнеры',
        topicCount: 5,
        replies: 14,
        topics: [

        ],
    },
    {
        id: 2,
        title: 'Технологии',
        topicCount: 590,
        replies: 895,
        topics: [

        ],
    },
];
