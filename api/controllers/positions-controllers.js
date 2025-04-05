const Positions = require("../models/positions-model");
const Joi = require('joi');
const positionSchema = require('../validationSchemas/positionShema');

exports.getAllPositions = async (req, res) => {
    try {
        const positions = await Positions.getAll();
        res.status(200).json({positions});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка должностей.", error});
    }
};

exports.getPositionById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const position = await Positions.getById(id);
        res.status(200).json({ position });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении должности: ", error });
    }
};

exports.createPosition = async (req, res) => {
    try {
        await positionSchema.validateAsync(req.body.positionData);
    } catch (error) {
        return res.status(400).json({
            message: 'Ошибка валидации данных: ' + (error.details?.[0]?.message || error.message)
        });
    }
    try {
        await Positions.create(req.body.positionData);
        res.status(200).json({ message: "Должность добавлена." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при добавлении должности: ", error });
    }
};

exports.deletePosition = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await Positions.delete(id);
        res.status(200).json({ message: "Должность удалена." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении должности: ", error });
    }
};

exports.editPosition = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await positionSchema.validateAsync(req.body.positionData);
    } catch (error) {
        return res.status(400).json({
            message: 'Ошибка валидации данных: ' + (error.details?.[0]?.message || error.message)
        });
    }
    try {
        await Positions.edit(id, req.body.positionData);
        res.status(200).json({ message: "Данные должности изменены." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении должности: ", error });
    }
};
