const Joi = require("joi");

const hrOperationSchema = Joi.object({
  employee_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID сотрудника должен быть числом",
    "number.integer": "ID сотрудника должен быть целым числом",
    "number.positive": "ID сотрудника должен быть положительным числом",
    "any.required": "ID сотрудника обязателен для заполнения",
  }),
  action_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID действия должен быть числом",
    "number.integer": "ID действия должен быть целым числом",
    "number.positive": "ID действия должен быть положительным числом",
    "any.required": "ID действия обязателен для заполнения",
  }),
  salary: Joi.number().min(0).required().messages({
    "number.base": "Зарплата должна быть числом",
    "number.min": "Зарплата не может быть отрицательной",
    "any.required": "Зарплата обязательна для заполнения",
  }),
  position_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID должности должен быть числом",
    "number.integer": "ID должности должен быть целым числом",
    "number.positive": "ID должности должен быть положительным числом",
    "any.required": "ID должности обязателен для заполнения",
  }),
  department_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID отдела должен быть числом",
    "number.integer": "ID отдела должен быть целым числом",
    "number.positive": "ID отдела должен быть положительным числом",
    "any.required": "ID отдела обязателен для заполнения",
  }),
});

module.exports = hrOperationSchema;
