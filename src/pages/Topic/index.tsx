import cn from 'classnames';
import React from 'react';
import { useParams } from 'react-router';
import { Button } from '@mui/material';
import { ForumMessage } from 'components/ForumMessage';
import { forumsData, IReply } from 'const/mockForumsData';
import { PageWithHeader } from 'components/PageWithHeader';
import { routes } from 'src/Root';
import css from './Topic.module.css';

export const Topic = () => {
    const { forumId, topicId } = useParams();
    const forum = forumsData.find(f => f.id === Number(forumId));
    const topic = forum?.topics.find(t => t.id === Number(topicId));

    return (
        <>
            <PageWithHeader
                headerTitle={topic?.title ?? ''}
                headerBackText={forum?.title ?? ''}
                headerBackLink={`${routes.forum}/${forumId}`}
            >
                <div className={cn(css.container)}>
                    <div className={css.repliesList}>
                        {topic?.replies && topic?.replies.map(({
                            userName, userAvatar, content,
                        }: IReply, index: number) => (
                            <ForumMessage key={`reply${index}`} userName={userName} userAvatar={userAvatar} content={content}/>
                        ))}
                    </div>
                    <form className={css.sendMessageForm}>
                        <input className={cn(css.input)} placeholder={'Начни писать...'}/>
                        <Button type="submit" variant="contained" className={cn(css.button)}>
                        Отправить
                        </Button>
                    </form>
                </div>
            </PageWithHeader>
        </>
    );
};
