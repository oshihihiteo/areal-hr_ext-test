const HR_operations = require("../models/hr-operations-model");
const Changelog = require("./changelog-controller");

exports.getAllHrOperations = async (req, res) => {
    try {
        const hr_operations = await HR_operations.getAll();
        res.status(200).json({hr_operations});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка кадровых операций.", error: error});
    }
};

exports.createHrOperation = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const hr_operation = await HR_operations.create(req.body.hrOperationData);
        res.status(200).json({ message: "Кадровая операция добавлен." });

        const changelog = {
            object_type_id: 5,
            object_id: hr_operation,
            changed_fields: req.body.hrOperationData
        };
        await Changelog.createChangelog(changelog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при добавлении кадровой операции: ", error });
    }
};

exports.deleteHrOperation = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const hr_operation = await HR_operations.delete(id);
        res.status(200).json({ message: "Кадровая операция удалена." });

        const changelog = {
            object_type_id: 5,
            object_id: id,
            changed_fields: null
        };
        await Changelog.deleteChangelog(changelog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении кадровой операции: ", error });
    }
};

exports.editHrOperation = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const hr_operation = await HR_operations.edit(id, req.body.hrOperationData
        );
        res.status(200).json({ message: "Данные кадровой операции изменены." });

        const changelog = {
            object_type_id: 5,
            object_id: id,
            changed_fields: req.body.hrOperationData
        };
        await Changelog.editChangelog(changelog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении кадровой операции: ", error });
    }
};
