const Departments = require("../models/departments-model");
const departmentSchema = require("../validationSchemas/departmentSchema");
const Changelog = require("./changelog-controller");

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Departments.getAll();
        res.status(200).json({departments});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка отделов.", error: error});
    }
};

exports.getDepartmentById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const department = await Departments.getById(id);
        res.status(200).json({ department });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении отделов: ", error });
    }
};

exports.createDepartment = async (req, res) => {
    const { error } = departmentSchema.validate(req.body.departmentData);
    if (error) {
        return res.status(400).json({ message: 'Ошибка валидации данных: ' + error.details[0].message });
    }
    try {
        const department = await Departments.create(req.body.departmentData);
        res.status(200).json({ message: "Отдел добавлен." });

        const changelog = {
            object_type_id: 2,
            object_id: department,
            changed_fields: req.body.departmentData
        };
        await Changelog.createChangelog(changelog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при добавлении отдела: ", error });
    }
};

exports.deleteDepartment = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const department = await Departments.delete(id);
        res.status(200).json({ message: "Отдел удалён." });
        const changelog = {
            object_type_id: 2,
            object_id: id,
            changed_fields: null
        };
        await Changelog.deleteChangelog(changelog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении отдела: ", error });
    }
};

exports.editDepartment = async (req, res) => {
    const id = parseInt(req.params.id);
    const { error } = departmentSchema.validate(req.body.departmentData);
    if (error) {
        return res.status(400).json({ message: 'Ошибка валидации данных: ' + error.details[0].message });
    }
    try {
        const department = await Departments.edit(id, req.body.departmentData
        );
        res.status(200).json({ message: "Данные отдела изменены." });

        const changelog = {
            object_type_id: 2,
            object_id: id,
            changed_fields: req.body.departmentData
        };
        await Changelog.editChangelog(changelog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении отдела: ", error });
    }
};
