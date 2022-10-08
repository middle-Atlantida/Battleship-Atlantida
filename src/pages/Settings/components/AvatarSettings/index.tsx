import { ChangeEvent, useState } from 'react';

import { Stack, Typography, Button, FormHelperText, Paper } from '@mui/material';
import cn from 'classnames';
import { FormikProps, useFormik } from 'formik';

import { UserAPI } from 'api/user';
import { FileInput } from 'components/FileInput';
import { Image } from 'components/Image';
import AvatarIcon from 'img/avatar.png';
import { setError } from 'utils/setError';

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
            if (!selectedFile) {
                return;
            }

            const formData = new FormData();
            formData.append('avatar', selectedFile);

            try {
                const data = await UserAPI.avatar(formData);
                if (data) {
                    setErrorMessage('');
                    setIsResultOK(true);
                }
            } catch (error) {
                setError(error, setErrorMessage);
            }
        },
    });

    return (
        <Paper className={cn(css.container)}>
            <Typography variant="h1" className={cn(css.title)} color="text.primary">
                Поменять фото профиля
            </Typography>

            {isImageSelected ? (
                <Image className={css.avatar} src={imagePreviewSrc} alt="Avatar" width={116} />
            ) : (
                <Image className={css.avatar} src={AvatarIcon} alt="Avatar" width={116} />
            )}

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
                        onChange={e => {
                            formik.handleChange(e);
                            showImagePreview(e);
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {errorMessage && (
                        <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
                    )}
                    {isResultOK && <FormHelperText>Аватар изменён.</FormHelperText>}
                </Stack>
                <Button type="submit" variant="contained" className={cn(css.button)}>
                    Сохранить
                </Button>
            </Stack>
        </Paper>
    );
};
