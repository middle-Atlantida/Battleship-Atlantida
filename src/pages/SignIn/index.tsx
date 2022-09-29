import React, { useState } from 'react';

import {
    Button, FormHelperText, Link, Stack, TextField, Typography,
} from '@mui/material';
import cn from 'classnames';
import { FormikProps, useFormik } from 'formik';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { AuthAPI } from 'api/auth';
import { Image } from 'components/Image';
import {
    LOGIN_RULES,
    PASSWORD_RULES,
    REQUIRE_TEXT,
} from 'const/validationRules';
import { useAppDispatch, useRedirectIfAuthenticated } from 'hooks';
import sailor from 'img/sailor.svg';
import { routes } from 'src/Root';
import { getUser, oAuth } from 'store/actions/user';
import { setError } from 'utils/setError';

import css from './SignIn.css';

interface ISignInFormikValues {
    login: string;
    password: string;
}

interface IField {
    id: keyof ISignInFormikValues;
    title: string;
    type: string;
}

const fields: IField[] = [
    {
        id: 'login',
        title: 'Логин',
        type: 'text',
    },
    {
        id: 'password',
        title: 'Пароль',
        type: 'password',
    },
];

const initialValues = {
    login: '',
    password: '',
};

const validationSchema = Yup.object({
    login: Yup.string()
        .matches(LOGIN_RULES.regexp, LOGIN_RULES.error)
        .required(REQUIRE_TEXT),
    password: Yup.string()
        .matches(PASSWORD_RULES.regexp, PASSWORD_RULES.error)
        .required(REQUIRE_TEXT),
});

export const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useRedirectIfAuthenticated(routes.main);

    const formik: FormikProps<ISignInFormikValues> = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            try {
                const data: unknown = await AuthAPI.signin(values);
                if (data) {
                    await dispatch(getUser());
                    navigate(routes.main);
                }
                setErrorMessage('Incorrect response');
            } catch (error) {
                setError(error, setErrorMessage);
            }
        },
    });

    const oAuthBtn = () => {
        dispatch(oAuth());
    };

    return (
        <main>
            <div className={cn(css.container)}>
                <Image src={sailor} alt="Sailor" height={600}/>
                <Stack
                    component="form"
                    onSubmit={formik.handleSubmit}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    sx={{ width: '251px' }}
                >
                    <Typography variant="h1" className={cn(css.title)}>
                        Вход
                    </Typography>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={1}
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
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
                        <Button type="submit" variant="contained" className={cn(css.button)}>
                            Авторизация
                        </Button>
                        <Link
                            color="primary"
                            className={cn(css.link)}
                            component={RouteLink}
                            to={routes.signUp}
                        >
                            Нет аккаунта? Зарегистрироваться
                        </Link>
                    </Stack>

                    <Button type="button" variant="contained" onClick={oAuthBtn}>
                        Войти через Яндекс
                    </Button>
                </Stack>
            </div>
        </main>
    );
};
