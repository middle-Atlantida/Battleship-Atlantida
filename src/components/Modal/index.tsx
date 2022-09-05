import React from 'react';

import {
    Modal as MuiModal,
} from '@mui/material';
import cn from 'classnames';

import css from './Modal.css';

type IHeaderProps = {
    open: boolean;
    onClose: () => void;
    modalClassName?: string | undefined;
    children?: React.ReactNode;
};

export const Modal = ({
    open, onClose, modalClassName, children,
}: IHeaderProps) => (
    <MuiModal
        open={open}
        onClose={onClose}
        classes={{ root: cn(css.modal, modalClassName) }}
    >
        <>
            {children}
        </>
    </MuiModal>
);
