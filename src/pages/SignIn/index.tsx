import React from 'react';
import sailor from 'img/sailor.svg';
import {
    Button,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Image } from 'components/Image';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
    LOGIN_RULES,
    PASSWORD_RULES,
} from 'const/validationRules';
import cn from 'classnames';
import css from './SignIn.module.css';

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
        .required('* Обязательно'),
    password: Yup.string()
        .matches(PASSWORD_RULES.regexp, PASSWORD_RULES.error)
        .required('* Обязательно'),
});

export const SignIn = () => {
    const formik: FormikProps<ISignInFormikValues> = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            console.log(values);
            // TODO call signup
        },
    });

    return (
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
                <Typography variant="h1" className={cn(css.title)}>Вход</Typography>
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
                    <Button type="submit" variant="contained" className={cn(css.button)}>Авторизация</Button>
                    <Link href="#" color="primary" className={cn(css.link)}>Нет аккаунта? Зарегистрироваться</Link>
                </Stack>
            </Stack>
        </div>
    );
};
