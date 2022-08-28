import * as Yup from 'yup';
import cn from 'classnames';
import React, { useState } from 'react';
import { UserAPI } from 'api/user';
import { FormikProps, useFormik } from 'formik';
import {
    Button,
    FormHelperText,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {
    PASSWORDS_MUST_DIFFER_TEXT,
    PASSWORDS_MUST_MATCH_TEXT,
    PASSWORD_RULES,
    REQUIRE_TEXT,
} from 'const/validationRules';
import css from './PasswordSettings.css';

interface ISettingsPasswordFormikValues {
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
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
        id: 'repeatPassword',
        title: 'Повторите пароль',
        type: 'password',
    },
];

const initialValues = {
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
};

const validationSchema = Yup.object({
    oldPassword: Yup.string()
        .matches(PASSWORD_RULES.regexp, PASSWORD_RULES.error)
        .required(REQUIRE_TEXT),
    newPassword: Yup.string()
        .matches(PASSWORD_RULES.regexp, PASSWORD_RULES.error)
        .notOneOf([Yup.ref('oldPassword')], PASSWORDS_MUST_DIFFER_TEXT)
        .required(REQUIRE_TEXT),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], PASSWORDS_MUST_MATCH_TEXT)
        .required(REQUIRE_TEXT),
});

export const PasswordSettings = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isResultOK, setIsResultOK] = useState(false);

    const formik: FormikProps<ISettingsPasswordFormikValues> = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            const { oldPassword, newPassword } = values;

            try {
                const data = await UserAPI.password({ oldPassword, newPassword });
                if (data) {
                    setErrorMessage('');
                    setIsResultOK(true);
                }
            } catch (error) {
                if (error instanceof Error) { setErrorMessage(error.message); }
            }
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
                    justifyContent="center"
                    alignItems="center"
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
                    {
                        errorMessage
                        && <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
                    }
                    {
                        isResultOK
                        && <FormHelperText>Пароль изменён.</FormHelperText>
                    }
                </Stack>
                <Button type="submit" variant="contained" className={cn(css.button)}>Сохранить</Button>
            </Stack>
        </div>
    );
};
