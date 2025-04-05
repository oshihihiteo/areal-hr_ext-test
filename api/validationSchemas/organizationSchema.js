const Joi = require('joi');
const Organizations = require("../models/organizations-model");

async function checkOrganizationExists(organizationName) {
    const existingOrganization = await Organizations.findByName(organizationName);
    return existingOrganization !== null;
}

const organizationSchema = Joi.object({
    name: Joi.string().min(2).max(255).required()
        .external(async (value, helpers) => {
            const isOrganizationNameTaken = await checkOrganizationExists(value);
            if (isOrganizationNameTaken) {
                return helpers.message('Организация с таким названием уже существует');
            }
            return value;
        }),
    comment: Joi.string(),
});

module.exports = organizationSchema;
