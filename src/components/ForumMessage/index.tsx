import React from 'react';
import { Image } from 'components/Image';
import css from './ForumMessage.module.css';

export type ForumMessageProps = {
    userName: string;
    userAvatar: string;
    content: string;
}

export const ForumMessage = ({ userName, userAvatar, content }: ForumMessageProps) => (
    <div className={css.container}>
        <div className={css.header}>
            <Image src={userAvatar} alt="avatar" className={css.profileImg} />
            {userName}
        </div>
        {content}
    </div>
);
