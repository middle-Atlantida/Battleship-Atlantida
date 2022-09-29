import React, { useCallback, useState } from 'react';

import {
    Button,
    FormHelperText,
    Link,
    Stack,
    TextField,
} from '@mui/material';
import cn from 'classnames';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

import { UserAPI } from 'api/user';
import { Image } from 'components/Image';
import { Modal } from 'components/Modal';
import { PageWithHeader } from 'components/PageWithHeader';
import {
    EMAIL_RULES,
    LOGIN_RULES,
    NAME_RULES,
    PHONE_RULES,
    REQUIRE_TEXT,
} from 'const/validationRules';
import avatar from 'img/avatar.svg';
import { routes } from 'src/Root';
import { setError } from 'utils/setError';

import { AvatarSettings } from './components/AvatarSettings';
import { PasswordSettings } from './components/PasswordSettings';
import css from './Settings.css';

interface ISettingsProfileFormikValues {
    firstName: string;
    secondName: string;
    displayName: string;
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
        id: 'displayName',
        title: 'Никнейм',
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

// TODO initial values - user info
const initialValues = {
    firstName: '',
    secondName: '',
    displayName: '',
    email: '',
    phone: '',
    login: '',
};

const validationSchema = Yup.object({
    firstName: Yup.string().matches(NAME_RULES.regexp, NAME_RULES.error).required(REQUIRE_TEXT),
    secondName: Yup.string().matches(NAME_RULES.regexp, NAME_RULES.error).required(REQUIRE_TEXT),
    displayName: Yup.string().matches(NAME_RULES.regexp, NAME_RULES.error).required(REQUIRE_TEXT),
    email: Yup.string().matches(EMAIL_RULES.regexp, EMAIL_RULES.error).required(REQUIRE_TEXT),
    phone: Yup.string().matches(PHONE_RULES.regexp, PHONE_RULES.error).required(REQUIRE_TEXT),
    login: Yup.string().matches(LOGIN_RULES.regexp, LOGIN_RULES.error).required(REQUIRE_TEXT),
});

const MODAL_VARIANTS = {
    avatar: 'avatar',
    password: 'password',
};

export const Settings = () => {
    const [open, setOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isResultOK, setIsResultOK] = useState(false);

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
        onSubmit: async values => {
            const {
                // eslint-disable-next-line camelcase
                firstName: first_name,
                // eslint-disable-next-line camelcase
                secondName: second_name,
                // eslint-disable-next-line camelcase
                displayName: display_name,
                ...rest
            } = values;

            try {
                const data = await UserAPI.profile({
                    first_name,
                    second_name,
                    display_name,
                    ...rest,
                });
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
        <>
            <PageWithHeader headerTitle="Настройки" headerBackLink={routes.main}>
                <div className={css.container}>
                    <Image
                        className={css.avatar}
                        src={avatar}
                        alt="Avatar"
                        width={116}
                        onClick={handleOpenAvatar}
                    />
                    <Stack
                        component="form"
                        onSubmit={formik.handleSubmit}
                        direction="column"
                        spacing={3}
                        sx={{ width: 1 }}
                    >
                        <Stack direction="column" spacing={2}>
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
                            <Link
                                color="primary"
                                className={cn(css.link)}
                                onClick={handleOpenPassword}
                            >
                                Поменять пароль
                            </Link>
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            sx={{ paddingTop: '26px' }}
                        >
                            {errorMessage && (
                                <FormHelperText error={!!errorMessage}>
                                    {errorMessage}
                                </FormHelperText>
                            )}
                            {isResultOK && (
                                <FormHelperText>Данные профиля изменены.</FormHelperText>
                            )}
                            <Button type="submit" variant="contained" className={cn(css.button)}>
                                Сохранить
                            </Button>
                        </Stack>
                    </Stack>
                </div>
                <Modal open={open} onClose={handleClose}>
                    {currentModal === MODAL_VARIANTS.avatar ? (
                        <AvatarSettings />
                    ) : (
                        <PasswordSettings />
                    )}
                </Modal>
            </PageWithHeader>
        </>
    );
};
