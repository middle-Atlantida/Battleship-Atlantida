const NAME_RULES = {
    regexp: /^[A-ZА-Я][a-zа-я.-]*$/,
    error: 'Первая буква должна быть прописной, без пробелов, цифр и специальных символов.',
};

const LOGIN_RULES = {
    regexp: /^(?!^[0-9]+$)^[a-z0-9-_]{3,20}$/,
    error: '3-20 символов, может содержать цифры, дефис и символ подчеркивания.',
};

const EMAIL_RULES = {
    regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Некорректный email.',
};

const PASSWORD_RULES = {
    regexp: /(?=^.{8,40}$)(?=.*[A-Z])(?=.*[0-9]).*$/,
    error: '8-40 символов, минимум одна заглавная буква и цифра.',
};

const PHONE_RULES = {
    regexp: /^[+]?[0-9]{10,15}$/,
    error: '10-15 цифр, может начинаться с +.',
};

export {
    NAME_RULES,
    LOGIN_RULES,
    EMAIL_RULES,
    PASSWORD_RULES,
    PHONE_RULES,
};
