const Positions = require("../models/positions-model");
const Changelog = require("./changelog-controller");
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
        const position = await Positions.create(req.body.positionData);
        res.status(200).json({ message: "Должность добавлена." });

        const changelog = {
            object_type_id: 1,
            object_id: position,
            changed_fields: req.body.positionData
        };
        await Changelog.createChangelog(changelog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при добавлении должности: ", error });
    }
};

exports.deletePosition = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const position = await Positions.getById(id);
        await Positions.delete(id);
        res.status(200).json({ message: "Должность удалена." });
        const changelog = {
            object_type_id: 1,
            object_id: id,
            changed_fields: null
        };
        await Changelog.deleteChangelog(changelog);
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

        const changelog = {
            object_type_id: 1,
            object_id: id,
            changed_fields: req.body.positionData
        };
        await Changelog.editChangelog(changelog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении должности: ", error });
    }
};
