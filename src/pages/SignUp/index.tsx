import React, { useState } from 'react';
import sailor from 'img/sailor.svg';
import {
    Button,
    FormHelperText,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Image } from 'components/Image';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import {
    NAME_RULES,
    LOGIN_RULES,
    EMAIL_RULES,
    PASSWORD_RULES,
    PHONE_RULES,
    REQUIRE_TEXT,
} from 'const/validationRules';
import cn from 'classnames';
import { routes } from 'pages/Root';
import { signup } from 'api/auth';
import axios from 'axios';
import { configureStore } from 'store/store';
import { setUser } from 'store/actions/user';
import css from './SignUp.css';

interface ISignUpFormikValues {
    firstName: string;
    secondName: string;
    email: string;
    phone: string;
    login: string;
    password: string;
}

interface IField {
    id: keyof ISignUpFormikValues;
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
        id: 'email',
        title: 'Email',
        type: 'email',
    },
    {
        id: 'phone',
        title: 'Телефон',
        type: 'phone',
    },
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
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    login: '',
    password: '',
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
    password: Yup.string()
        .matches(PASSWORD_RULES.regexp, PASSWORD_RULES.error)
        .required(REQUIRE_TEXT),
});

export const SignUp = () => {
    const store = configureStore();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const formik: FormikProps<ISignUpFormikValues> = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            // eslint-disable-next-line camelcase
            const { firstName: first_name, secondName: second_name, ...rest } = values;

            try {
                const res = await signup({ first_name, second_name, ...rest });
                if (res.status === 200) {
                    // TODO router push to main page
                    store.dispatch(setUser(JSON.parse(res.data)));
                    navigate(routes.main);
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const { message } = err;
                    setErrorMessage(message);
                }
            }
        },
    });

    return (
        <main>
            <div className={cn(css.container)}>
                <Image src={sailor} alt="Sailor" height={600} />
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
                        Регистрация
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
                            Создать аккаунт
                        </Button>
                        <Link
                            color="primary"
                            className={cn(css.link)}
                            component={RouteLink}
                            to={routes.login}
                        >
                            Войти
                        </Link>
                    </Stack>
                </Stack>
            </div>
        </main>
    );
};
