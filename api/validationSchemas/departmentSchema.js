const Joi = require('joi');

const departmentSchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    organization_id: Joi.number().required(),
    parent_id: Joi.number().allow(null),
    comment: Joi.string(),
});

module.exports = departmentSchema;