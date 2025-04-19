const Joi = require("joi");

const departmentSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().messages({
    "string.base": "Название должно быть строкой",
    "string.empty": "Название не может быть пустым",
    "string.min": "Название должно содержать минимум 2 символа",
    "string.max": "Название должно содержать не более 255 символов",
    "any.required": "Название обязательно для заполнения",
  }),
  organization_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID организации должен быть числом",
    "any.required": "ID организации обязательно для заполнения",
  }),
  parent_id: Joi.number().integer().positive().allow(null).messages({
    "number.base": "ID родительского отдела должен быть числом или null",
  }),
  comment: Joi.string().allow(null).messages({
    "string.base": "Комментарий должен быть строкой",
    "string.empty": "Комментарий не может быть пустой строкой",
  }),
});

module.exports = departmentSchema;
