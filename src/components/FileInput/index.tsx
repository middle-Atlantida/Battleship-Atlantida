import React, { InputHTMLAttributes } from 'react';

import { Image } from 'components/Image';
import uploadFile from 'img/uploadFile.svg';

import css from './FileInput.css';

type IFileInputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label?: string;
};

export const FileInput = ({ id, label = '', ...inputProps }: IFileInputProps) => (
    <div className={css.container}>
        <label className={css.label} htmlFor={id}>
            <Image className={css.uploadLogo} src={uploadFile} alt="upload" width={24} />
            <span>{label}</span>
        </label>
        <input className={css.input} type="file" id={id} {...inputProps} />
    </div>
);
