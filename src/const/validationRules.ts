export const REQUIRE_TEXT = '* Обязательно';
export const PASSWORDS_MUST_MATCH_TEXT = 'Пароли должны совпадать.';
export const PASSWORDS_MUST_DIFFER_TEXT = 'Новый пароль должен отличаться от старого.';

export const NAME_RULES = {
    regexp: /^[A-ZА-Я][a-zа-я.-]*$/,
    error: 'Первая буква должна быть прописной, без пробелов, цифр и специальных символов.',
};

export const LOGIN_RULES = {
    regexp: /^(?!^[0-9]+$)^[a-z0-9-_]{3,20}$/,
    error: '3-20 символов, может содержать цифры, дефис и символ подчеркивания.',
};

export const EMAIL_RULES = {
    regexp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Некорректный email.',
};

export const PASSWORD_RULES = {
    regexp: /(?=^.{8,40}$)(?=.*[A-Z])(?=.*[0-9]).*$/,
    error: '8-40 символов, минимум одна заглавная буква и цифра.',
};

export const PHONE_RULES = {
    regexp: /^[+]?[0-9]{10,15}$/,
    error: '10-15 цифр, может начинаться с +.',
};
