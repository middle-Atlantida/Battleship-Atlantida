import React from 'react';
import { Header } from 'components/Header';
import css from './PageWithHeader.css';

type IPageWithHeaderProps = {
    headerTitle?: string;
    headerBackText?: string;
    headerBackLink?: string;
    headerChildren?: React.ReactNode;
    children?: React.ReactNode;
}

export const PageWithHeader = ({
    children, headerTitle, headerBackText, headerBackLink, headerChildren,
}: IPageWithHeaderProps) => (
    <>
        <Header
            title={headerTitle}
            backText={headerBackText}
            backLink={headerBackLink}
        >
            {headerChildren}
        </Header>
        <main>
            <div className={css.container}>
                {children}
            </div>
        </main>
    </>
);
