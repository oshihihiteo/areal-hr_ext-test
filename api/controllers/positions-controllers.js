const Positions = require("../models/positions-model");

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
    const { positionData } = req.body;

    try {
        const position = await Positions.create(
            positionData
        );
        res.status(200).json({ message: "Должность добавлена." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при добавлении должности: ", error });
    }
};

exports.deletePosition = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const position = await Positions.delete(id);
        res.status(200).json({ message: "Должность удалена." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении должности: ", error });
    }
};

exports.editPosition = async (req, res) => {
    const id = parseInt(req.params.id);
    const {positionData } = req.body;

    try {
        const organization = await Positions.edit(id, positionData);
        res.status(200).json({ message: "Данные должности изменены." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении должности: ", error });
    }
};
