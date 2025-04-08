const FilesModel = require("../models/files-model");
const Changelog = require("./changelog-controller");

exports.getAllFiles = async (req, res) => {
    try {
        const files = await FilesModel.getAll();
        res.status(200).json({files});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении файлов", error });
    }
};

exports.getAllEmployeeFiles = async (req, res) => {
    const id = parseInt(req.params.employeeId);
    try {
        const files = await FilesModel.findByEmployee(id);
        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении файлов", error });
    }
};

exports.getFileById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const file = await FilesModel.getById(id);
        if (!file) {
            return res.status(404).json({ message: "Файл не найден" });
        }
        res.status(200).json(file);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении файла", error });
    }
};

const path = require("path");

exports.getRawFileById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const file = await FilesModel.getById(id);

        if (!file) {
            return res.status(404).json({ message: "Файл не найден" });
        }

        const filePath = path.resolve(__dirname, "../../files", file.file);
        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении файла", error });
    }
};


exports.createFile = async (req, res) => {
    try {
        const fileData = {
            name: req.body.name,
            employee_id: req.body.employee_id,
            file: req.file.filename
        }
        const id = await FilesModel.create(fileData);
        res.status(201).json({ message: "Файл создан", id });

        const changelog = {
            object_type_id: 6,
            object_id: id,
            changed_fields: fileData
        };
        await Changelog.createChangelog(changelog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании файла", error });
    }
};


exports.editFile = async (req, res) => {
        const id = parseInt(req.params.id);
    try {
        const fileData = {
            name: req.body.name,
            employee_id: req.body.employee_id,
            file: req.file.filename
        }
        const file = await FilesModel.edit(id, fileData);
        res.status(201).json({ message: "Файл изменён"});

        const changelog = {
            object_type_id: 6,
            object_id: id,
            changed_fields: fileData
        };
        await Changelog.editChangelog(changelog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении файла", error });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await FilesModel.delete(id);
        res.status(200).json({ message: "Файл удалён" });

        const changelog = {
            object_type_id: 6,
            object_id: id,
            changed_fields: null
        };
        await Changelog.deleteChangelog(changelog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении файла", error });
    }
};
