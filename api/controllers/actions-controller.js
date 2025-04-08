const Actions = require("../models/actions-model");

exports.getAllActions = async (req, res) => {
    try {
        const actions = await Actions.getAll();
        res.status(200).json({actions});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка должностей.", error});
    }
};