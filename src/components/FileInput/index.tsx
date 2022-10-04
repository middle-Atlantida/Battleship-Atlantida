import { InputHTMLAttributes } from 'react';

import { Typography } from '@mui/material';
import classNames from 'classnames';

import UploadFile from 'img/uploadFile.svg';

import css from './FileInput.css';

type IFileInputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label?: string;
};

export const FileInput = ({ id, label = '', ...inputProps }: IFileInputProps) => (
    <div className={css.container}>
        <label className={css.label} htmlFor={id}>
            <UploadFile className={classNames(css.uploadLogo)} />
            <Typography variant="body1">{label}</Typography>
        </label>
        <input className={css.input} type="file" id={id} {...inputProps} />
    </div>
);
