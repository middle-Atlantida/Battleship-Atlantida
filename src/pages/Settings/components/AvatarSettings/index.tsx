import React from 'react';
import sailor from 'img/sailor.svg';
import {
    Button,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Image } from 'components/Image';
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

interface ISettingsProfileFormikValues {
    firstName: string;
    secondName: string;
    email: string;
    phone: string;
    login: string;
}

interface ISettingsPasswordFormikValues {
    oldPassword: string;
    newPassword: string;
    repeatePassword: string;
}
interface ISettingsAvatarFormikValues {
    avatar: string;
}

interface IField {
    id: keyof ISettingsProfileFormikValues
        | keyof ISettingsPasswordFormikValues
        | keyof ISettingsAvatarFormikValues;
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
});

export const Settings = () => {
    const formik: FormikProps<ISettingsProfileFormikValues> = useFormik({
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
                <Typography variant="h1" className={cn(css.title)}>Регистрация</Typography>
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
                    <Button type="submit" variant="contained" className={cn(css.button)}>Создать аккаунт</Button>
                </Stack>
            </Stack>
        </div>
    );
};
