const Joi = require('joi');
const Files = require("../models/files-model");

async function checkFileExists(fileName, id = null) {
    const existingFile = await Files.findByName(fileName, id);
    return existingFile !== null;
}

const fileSchema = Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
        'string.base': 'Название должно быть строкой',
        'string.empty': 'Название не может быть пустым',
        'string.min': 'Название должно содержать минимум 2 символа',
        'string.max': 'Название должно содержать не более 255 символов',
        'any.required': 'Название обязательно для заполнения'
    }).external(async (value, helpers) => {
        const { id = null } = helpers?.prefs?.context || {};
        const isTaken = await checkFileExists(value, id);
        if (isTaken) {
            throw new Joi.ValidationError(
                'Файл с таким названием уже существует',
                [
                    {
                        message: 'Файл с таким названием уже существует',
                        path: ['name'],
                        type: 'any.unique',
                        context: {
                            label: 'name',
                            key: 'name',
                        },
                    },
                ],
                { name: 'SomeFileName' }
            );
        }
        return value;
    }),
    employee_id: Joi.number().min(0).required().messages({
        'number.base': 'ID сотрудника должен быть числом',
        'any.required': 'ID сотрудника обязательно для заполнения'
    }),
    file: Joi.any()
});

module.exports = fileSchema;
