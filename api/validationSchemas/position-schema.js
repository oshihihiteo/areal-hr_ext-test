const Joi = require("joi");
const Positions = require("../models/positions-model");

async function checkPositionExists(positionName, id = null) {
  const existingPosition = await Positions.findByName(positionName, id);
  return existingPosition !== null;
}

const positionSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .required()
    .messages({
      "string.base": "Название должно быть строкой",
      "string.empty": "Название не может быть пустым",
      "string.min": "Название должно содержать минимум 2 символа",
      "string.max": "Название должно содержать не более 255 символов",
      "any.required": "Название обязательно для заполнения",
    })
    .external(async (value, helpers) => {
      const { id = null } = helpers?.prefs?.context || {};
      const isTaken = await checkPositionExists(value, id);
      if (isTaken) {
        throw new Joi.ValidationError(
          "Должность с таким названием уже существует",
          [
            {
              message: "Должность с таким названием уже существует",
              path: ["name"],
              type: "any.unique",
              context: {
                label: "name",
                key: "name",
              },
            },
          ],
          { name: "SomePositionName" },
        );
      }
      return value;
    }),
});

module.exports = positionSchema;
