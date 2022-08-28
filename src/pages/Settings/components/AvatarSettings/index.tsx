import avatarSvg from 'img/avatar.svg';
import axios from 'axios';
import cn from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { ApiError } from 'api/axiosClient';
import { changeAvatar } from 'api/user';
import { FileInput } from 'components/FileInput';
import { FormikProps, useFormik } from 'formik';
import { Image } from 'components/Image';
import {
    Stack,
    Typography,
    Button,
    FormHelperText,
} from '@mui/material';
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

    const [errorMessage, setErrorMessage] = useState('');
    const [isResultOK, setIsResultOK] = useState(false);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [imagePreviewSrc, setImagePreviewSrc] = useState('');
    const [selectedFile, setSelectedFile] = useState<File>();

    const showImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0) ?? undefined;
        setIsResultOK(false);

        if (file) {
            if (['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.addEventListener('load', event => {
                    const result = event.target?.result?.toString() ?? '';
                    setImagePreviewSrc(result);
                    setIsImageSelected(true);
                    setSelectedFile(file);
                });
            }
        } else {
            setIsImageSelected(false);
        }
    };

    const formik: FormikProps<ISettingsAvatarFormikValues> = useFormik({
        initialValues,
        onSubmit: async () => {
            if (!selectedFile) { return; }

            const formData = new FormData();
            formData.append('avatar', selectedFile);

            try {
                const res = await changeAvatar(formData);
                if (res.status === 200) {
                    setErrorMessage('');
                    setIsResultOK(true);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const reason = (err as ApiError).response.data.reason ?? '';
                    setErrorMessage(reason);
                }
            }
        },
    });

    return (
        <div className={cn(css.container)}>
            <Typography variant="h1" className={cn(css.title)}>Поменять фото профиля</Typography>

            {
                isImageSelected
                    ? <Image className={css.avatar} src={imagePreviewSrc} alt="Avatar" width={116} />
                    : <Image className={css.avatar} src={avatarSvg} alt="Avatar" width={116} />
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
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{ margin: '0 !important' }}
                >
                    <FileInput
                        id={id}
                        label={title}
                        value={formik.values[id]}
                        onChange={e => { formik.handleChange(e); showImagePreview(e); }}
                        onBlur={formik.handleBlur}
                    />
                    {
                        errorMessage
                        && <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
                    }
                    {
                        isResultOK
                        && <FormHelperText>Аватар изменён.</FormHelperText>
                    }
                </Stack>
                <Button type="submit" variant="contained" className={cn(css.button)}>Сохранить</Button>
            </Stack>
        </div>
    );
};
