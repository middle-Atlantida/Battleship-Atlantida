import React, { ChangeEvent, useState } from 'react';
import {
    Stack,
    Typography,
    Button,
} from '@mui/material';
import { Image } from 'components/Image';
import { FileInput } from 'components/FileInput';
import { useFormik, FormikProps } from 'formik';
import cn from 'classnames';

import avatar from 'img/avatar.svg';

import css from './AvatarSettings.css';

interface ISettingsAvatarFormikValues {
    avatar: string;
}

interface IField {
    id: keyof ISettingsAvatarFormikValues;
    title: string;
}

const field: IField = {
    id: 'avatar',
    title: 'Загрузить фото',
};

const initialValues = {
    avatar: '',
};

export const AvatarSettings = () => {
    const { id, title } = field;

    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imagePreviewSrc, setImagePreviewSrc] = useState('');

    const showImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.item(0);
        if (selectedFile) {
            if (['image/jpeg', 'image/png', 'image/svg+xml'].includes(selectedFile.type)) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(selectedFile);
                fileReader.addEventListener('load', event => {
                    const result = event.target?.result?.toString() ?? '';
                    setImagePreviewSrc(result);
                    setIsImageSelected(true);
                });
            }
        } else {
            setIsImageSelected(false);
        }
    };

    const formik: FormikProps<ISettingsAvatarFormikValues> = useFormik({
        initialValues,
        onSubmit: values => {
            // eslint-disable-next-line no-console
            console.log(values);
            // TODO call signup
        },
    });

    return (
        <div className={cn(css.container)}>
            <Typography variant="h1" className={cn(css.title)}>Поменять фото профиля</Typography>

            {
                isImageSelected
                    ? <Image className={css.avatar} src={imagePreviewSrc} alt="Avatar" width={116} />
                    : <Image className={css.avatar} src={avatar} alt="Avatar" width={116} />
            }

            <Stack
                component="form"
                onSubmit={formik.handleSubmit}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                sx={{ gap: '50px' }}
            >
                <FileInput
                    id={id}
                    label={title}
                    value={formik.values[id]}
                    onChange={e => { formik.handleChange(e); showImagePreview(e); }}
                    onBlur={formik.handleBlur}/>
                <Button type="submit" variant="contained" className={cn(css.button)}>Сохранить</Button>
            </Stack>
        </div>
    );
};
