import { Typography } from '@mui/material';

import { Image } from 'components/Image';

import css from './ForumMessage.css';

export type ForumMessageProps = {
    userName: string;
    userAvatar: string;
    content: string;
};

export const ForumMessage = ({ userName, userAvatar, content }: ForumMessageProps) => (
    <div className={css.container}>
        <div className={css.header}>
            <Image src={userAvatar} alt="avatar" className={css.profileImg} />
            <Typography variant="body1" fontWeight="bold">
                {userName}
            </Typography>
        </div>
        <Typography variant="body2">{content}</Typography>
    </div>
);
