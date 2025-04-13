const Joi = require('joi');

const employeeSchema = Joi.object({
    lastname: Joi.string().max(255).required().messages({
        'string.base': 'Фамилия должна быть строкой',
        'string.empty': 'Фамилия не может быть пустой',
        'string.max': 'Фамилия не может превышать 255 символов',
        'any.required': 'Фамилия обязательна для заполнения'
    }),
    firstname: Joi.string().max(255).required().messages({
        'string.base': 'Имя должно быть строкой',
        'string.empty': 'Имя не может быть пустым',
        'string.max': 'Имя не может превышать 255 символов',
        'any.required': 'Имя обязательно для заполнения'
    }),
    patronymic: Joi.string().allow(null).max(255).messages({
        'string.base': 'Отчество должно быть строкой',
        'string.empty': 'Отчество не может быть пустым',
        'string.max': 'Отчество не может превышать 255 символов'
    }),
    birth_date: Joi.date().raw().required().messages({
        'date.base': 'Дата рождения должна быть корректной датой',
        'any.required': 'Дата рождения обязательна для заполнения'
    }),
    address_region: Joi.string().max(255).required().messages({
        'string.base': 'Регион должен быть строкой',
        'string.empty': 'Регион не может быть пустым',
        'string.max': 'Регион не может превышать 255 символов',
        'any.required': 'Регион обязателен для заполнения'
    }),
    address_settlement: Joi.string().min(2).max(255).required().messages({
        'string.base': 'Населённый пункт должен быть строкой',
        'string.empty': 'Населённый пункт не может быть пустым',
        'string.min': 'Населённый пункт должен содержать не менее 2 символов',
        'string.max': 'Населённый пункт не может превышать 255 символов',
        'any.required': 'Населённый пункт обязателен для заполнения'
    }),
    address_street: Joi.string().min(2).max(255).required().messages({
        'string.base': 'Улица должна быть строкой',
        'string.empty': 'Улица не может быть пустой',
        'string.min': 'Улица должна содержать не менее 2 символов',
        'string.max': 'Улица не может превышать 255 символов',
        'any.required': 'Улица обязательна для заполнения'
    }),
    address_house: Joi.string().min(1).max(255).required().messages({
        'string.base': 'Дом должен быть строкой',
        'string.empty': 'Дом не может быть пустым',
        'string.min': 'Дом должен содержать не менее 1 символа',
        'string.max': 'Дом не может превышать 255 символов',
        'any.required': 'Дом обязателен для заполнения'
    }),
    address_building: Joi.string().allow(null).min(1).max(255).messages({
        'string.base': 'Строение должно быть строкой',
        'string.min': 'Строение должно содержать не менее 1 символа',
        'string.max': 'Строение не может превышать 255 символов'
    }),
    address_apartment: Joi.number().allow(null).min(0).messages({
        'number.base': 'Квартира должна быть числом',
        'number.min': 'Квартира не может быть отрицательной'
    }),
    passport_series: Joi.string().length(4).required().messages({
        'string.base': 'Серия паспорта должна быть строкой',
        'string.empty': 'Серия паспорта не может быть пустой',
        'string.length': 'Серия паспорта должна состоять из 4 символов',
        'any.required': 'Серия паспорта обязательна для заполнения'
    }),
    passport_number: Joi.string().length(6).required().messages({
        'string.base': 'Номер паспорта должен быть строкой',
        'string.empty': 'Номер паспорта не может быть пустым',
        'string.length': 'Номер паспорта должен состоять из 6 символов',
        'any.required': 'Номер паспорта обязателен для заполнения'
    }),
    passport_issued_date: Joi.date().raw().required().messages({
        'date.base': 'Дата выдачи паспорта должна быть корректной датой',
        'any.required': 'Дата выдачи паспорта обязательна для заполнения'
    }),
    passport_unit_code: Joi.string().length(7).required().messages({
        'string.base': 'Код подразделения должен быть строкой',
        'string.empty': 'Код подразделения не может быть пустым',
        'string.length': 'Код подразделения должен состоять из 7 символов',
        'any.required': 'Код подразделения обязателен для заполнения'
    }),
    passport_issued_by: Joi.string().max(255).required().messages({
        'string.base': 'Поле "кем выдан паспорт" должно быть строкой',
        'string.empty': 'Поле "кем выдан паспорт" не может быть пустым',
        'string.max': 'Поле "кем выдан паспорт" не может превышать 255 символов',
        'any.required': 'Поле "кем выдан паспорт" обязательно для заполнения'
    }),
});

module.exports = employeeSchema;
