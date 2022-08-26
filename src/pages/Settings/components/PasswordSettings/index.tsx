import React from 'react';
import {
    Button,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import {
    PASSWORD_RULES,
    REQUIRE_TEXT,
} from 'const/validationRules';
import cn from 'classnames';
import css from './PasswordSettings.css';

interface ISettingsPasswordFormikValues {
    oldPassword: string;
    newPassword: string;
    repeatePassword: string;
}

interface IField {
    id: keyof ISettingsPasswordFormikValues;
    title: string;
    type: string;
}

const fields: IField[] = [
    {
        id: 'oldPassword',
        title: 'Старый пароль',
        type: 'password',
    },
    {
        id: 'newPassword',
        title: 'Новый пароль',
        type: 'password',
    },
    {
        id: 'repeatePassword',
        title: 'Повторите пароль',
        type: 'password',
    },
];

const initialValues = {
    oldPassword: '',
    newPassword: '',
    repeatePassword: '',
};

const validationSchema = Yup.object({
    oldPassword: Yup.string()
        .matches(PASSWORD_RULES.regexp, PASSWORD_RULES.error)
        .required(REQUIRE_TEXT),
    newPassword: Yup.string()
        .matches(PASSWORD_RULES.regexp, PASSWORD_RULES.error)
        .required(REQUIRE_TEXT),
    repeatePassword: Yup.string()
        .matches(PASSWORD_RULES.regexp, PASSWORD_RULES.error)
        .required(REQUIRE_TEXT),
});

export const PasswordSettings = () => {
    const formik: FormikProps<ISettingsPasswordFormikValues> = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            // eslint-disable-next-line no-console
            console.log(values);
            // TODO call signup
        },
    });

    return (
        <div className={css.container}>
            <Stack
                component="form"
                onSubmit={formik.handleSubmit}
                spacing={3}
                sx={{ gap: '50px' }}
            >
                <Typography variant="h2" className={cn(css.title)}>Поменять пароль</Typography>
                <Stack
                    direction="column"
                    spacing={1}
                    sx={{ margin: '0 !important' }}
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
                <Button type="submit" variant="contained" className={cn(css.button)}>Сохранить</Button>
            </Stack>
        </div>
    );
};
