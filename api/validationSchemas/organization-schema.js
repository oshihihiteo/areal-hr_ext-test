const Joi = require('joi');
const Organizations = require("../models/organizations-model");

async function checkOrganizationExists(organizationName, id = null) {
    const existingOrganizations = await Organizations.findByName(organizationName, id);
    return existingOrganizations !== null;
}

const organizationSchema = Joi.object({
    name: Joi.string().min(2).max(255).required().messages({
        'string.base': 'Название должно быть строкой',
        'string.empty': 'Название не может быть пустым',
        'string.min': 'Название должно содержать минимум 2 символа',
        'string.max': 'Название должно содержать не более 255 символов',
        'any.required': 'Название обязательно для заполнения'
    }).external(async (value, helpers) => {
        const {id = null} = helpers?.prefs?.context || {};
        const isTaken = await checkOrganizationExists(value, id);
        if (isTaken) {
            throw new Joi.ValidationError(
                'Организация с таким названием уже существует',
                [
                    {
                        message: 'Организация с таким названием уже существует',
                        path: ['name'],
                        type: 'any.unique',
                        context: {
                            label: 'name',
                            key: 'name',
                        },
                    },
                ],
                { name: 'SomeOrganizationName' }
            );
        }
        return value;
    }),
    comment: Joi.string().allow(null).messages({
        'string.base': 'Комментарий должен быть строкой',
        'string.empty': 'Комментарий не может быть пустой строкой',
    })
});

module.exports = organizationSchema;
