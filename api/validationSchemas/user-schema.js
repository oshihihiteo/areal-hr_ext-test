const Joi = require("joi");
const Users = require("../models/users-model");

async function checkLoginIsUsed(login, id = null) {
    const existingLogin = await Users.findByLogin(login, id);
    return existingLogin !== null;
}

const userSchema = Joi.object({
    role_id: Joi.any(),
    lastname: Joi.string().max(255).required().messages({
        "string.base": "Фамилия должна быть строкой",
        "string.empty": "Фамилия не может быть пустой",
        "string.max": "Фамилия не может превышать 255 символов",
        "any.required": "Фамилия обязательна для заполнения",
    }),
    firstname: Joi.string().max(255).required().messages({
        "string.base": "Имя должно быть строкой",
        "string.empty": "Имя не может быть пустым",
        "string.max": "Имя не может превышать 255 символов",
        "any.required": "Имя обязательно для заполнения",
    }),
    patronymic: Joi.string().allow(null).max(255).messages({
        "string.base": "Отчество должно быть строкой",
        "string.empty": "Отчество не может быть пустым",
        "string.max": "Отчество не может превышать 255 символов",
    }),
    login: Joi.string().max(255).required().messages({
        "string.base": "Логин должен быть строкой",
        "string.empty": "Логин не может быть пустым",
        "string.max": "Логин не может превышать 255 символов",
        "any.required": "Логин обязателен для заполнения",
    }).external(async (value, helpers) => {
        const { id = null } = helpers?.prefs?.context || {};
        const isTaken = await checkLoginIsUsed(value, id);
        if (isTaken) {
            throw new Joi.ValidationError(
                "Пользователь с таким логином уже существует",
                [
                    {
                        message: "Пользователь с таким логином уже существует",
                        path: ["login"],
                        type: "any.unique",
                        context: {
                            label: "login",
                            key: "login",
                        },
                    },
                ],
                { name: "SomeLogin" },
            );
        }
        return value;
    }),
    password: Joi.string().min(6).max(255).required().messages({
        "string.base": "Пароль должен быть строкой",
        "string.empty": "Пароль не может быть пустым",
        "string.min": "Пароль должен содержать не менее 6 символов",
        "string.max": "Пароль не может превышать 255 символов",
        "any.required": "Пароль обязателен для заполнения",
    }),
});

module.exports = userSchema;
