import React from 'react';
import {
    Stack,
    Typography,
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

    const formik: FormikProps<ISettingsAvatarFormikValues> = useFormik({
        initialValues,
        onSubmit: values => {
            console.log(values);
            // TODO call signup
        },
    });

    return (
        <div className={cn(css.container)}>
            <Typography variant="h1" className={cn(css.title)}>Поменять фото профиля</Typography>
            <Image className={css.avatar} src={avatar} alt="Avatar" width={116} />
            <Stack
                component="form"
                onSubmit={formik.handleSubmit}
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <FileInput id={id} name={id} label={title} value={formik.values[id]} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            </Stack>
        </div>
    );
};
