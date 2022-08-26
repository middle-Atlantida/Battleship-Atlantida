import React, { useCallback, useState } from 'react';
import avatar from 'img/avatar.svg';
import {
    Button,
    Stack,
    TextField,
    Link,
} from '@mui/material';
import { Image } from 'components/Image';
import { Header } from 'components/Header';
import { Modal } from 'components/Modal';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
    NAME_RULES,
    LOGIN_RULES,
    EMAIL_RULES,
    PHONE_RULES,
    REQUIRE_TEXT,
} from 'const/validationRules';
import cn from 'classnames';
import css from './Settings.css';
import { PasswordSettings } from './components/PasswordSettings';
import { AvatarSettings } from './components/AvatarSettings';

interface ISettingsProfileFormikValues {
    firstName: string;
    secondName: string;
    email: string;
    phone: string;
    login: string;
}
interface IField {
    id: keyof ISettingsProfileFormikValues;
    title: string;
    type: string;
}

const fields: IField[] = [
    {
        id: 'firstName',
        title: 'Имя',
        type: 'text',
    },
    {
        id: 'secondName',
        title: 'Фамилия',
        type: 'text',
    },
    {
        id: 'login',
        title: 'Логин',
        type: 'text',
    },
    {
        id: 'email',
        title: 'Email',
        type: 'email',
    },
    {
        id: 'phone',
        title: 'Телефон',
        type: 'phone',
    },
];

const initialValues = {
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    login: '',
};

const validationSchema = Yup.object({
    firstName: Yup.string()
        .matches(NAME_RULES.regexp, NAME_RULES.error)
        .required(REQUIRE_TEXT),
    secondName: Yup.string()
        .matches(NAME_RULES.regexp, NAME_RULES.error)
        .required(REQUIRE_TEXT),
    email: Yup.string()
        .matches(EMAIL_RULES.regexp, EMAIL_RULES.error)
        .required(REQUIRE_TEXT),
    phone: Yup.string()
        .matches(PHONE_RULES.regexp, PHONE_RULES.error)
        .required(REQUIRE_TEXT),
    login: Yup.string()
        .matches(LOGIN_RULES.regexp, LOGIN_RULES.error)
        .required(REQUIRE_TEXT),
});

const MODAL_VARIANTS = {
    avatar: 'avatar',
    password: 'password',
};

export const Settings = () => {
    const [open, setOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState('');

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleOpenAvatar = useCallback(() => {
        setCurrentModal(MODAL_VARIANTS.avatar);
        handleOpen();
    }, [handleOpen]);

    const handleOpenPassword = useCallback(() => {
        setCurrentModal(MODAL_VARIANTS.password);
        handleOpen();
    }, [handleOpen]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const formik: FormikProps<ISettingsProfileFormikValues> = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            // eslint-disable-next-line no-console
            console.log(values);
            // TODO call change Profile
        },
    });

    return (
        <>
            <Header title='Настройки' />
            <div className={css.container}>
                <Image className={css.avatar} src={avatar} alt="Avatar" width={116} onClick={handleOpenAvatar} />
                <Stack
                    component="form"
                    onSubmit={formik.handleSubmit}
                    direction="column"
                    spacing={3}
                    sx={{ width: '750px' }}
                >
                    {fields.map(({ id, title, type }: IField) => (
                        <TextField
                            key={id}
                            id={id}
                            name={id}
                            label={title}
                            value={formik.values[id]}
                            type={type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={!!formik.touched[id] && !!formik.errors[id]}
                            helperText={
                                !!formik.touched[id] && !!formik.errors[id]
                                    ? formik.errors[id]
                                    : null
                            }
                            variant="standard"
                        />
                    ))}
                    <Link color="primary" className={cn(css.link)} onClick={handleOpenPassword}>Поменять пароль</Link>
                    <Button type="submit" variant="contained" className={cn(css.button)}>Сохранить</Button>
                </Stack>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                {currentModal === MODAL_VARIANTS.avatar ? <AvatarSettings/> : <PasswordSettings/>}
            </Modal>
        </>
    );
};
