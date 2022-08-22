import React from 'react';
import { Image } from 'components/Image';
import uploadFile from 'img/uploadFile.svg';
import css from './FileInput.css';

type IFileInputProps = {
    id?: string;
};

export const FileInput = ({ id }: IFileInputProps) => (
    <div className={css.container}>
        <label className={css.label} htmlFor={id}>
            <Image className={css.uploadLogo} src={uploadFile} alt="upload" width={24} />
            <span>Загрузить фото</span>
        </label>
        <input className={css.input} type="file" id={id} />
    </div>
);
