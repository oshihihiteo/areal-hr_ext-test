const Joi = require('joi');
const Positions = require("../models/positions-model");

async function checkPositionExists(positionName) {
    const existingPosition = await Positions.findByName(positionName);
    return existingPosition !== null;
}

const positionSchema = Joi.object({
    name: Joi.string().min(2).max(255).required()
        .external(async (value, helpers) => {
            const isPositionNameTaken = await checkPositionExists(value);
            if (isPositionNameTaken) {
                return helpers.message('Должность с таким названием уже существует');
            }
            return value;
        }),
});

module.exports = positionSchema;
