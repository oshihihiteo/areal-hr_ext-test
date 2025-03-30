const Departments = require("../models/departments-model");

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
    const { departmentData } = req.body;

    try {
        const department = await Departments.create(
            departmentData
        );
        res.status(200).json({ message: "Отдел добавлен." });
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении отдела: ", error });
    }
};

exports.editDepartment = async (req, res) => {
    const id = parseInt(req.params.id);
    const {departmentData } = req.body;

    try {
        const department = await Departments.edit(id, departmentData
        );
        res.status(200).json({ message: "Данные отдела изменены." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении отдела: ", error });
    }
};
