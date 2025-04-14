const FilesModel = require("../models/files-model");
const Changelog = require("./changelog-controller");
const fileSchema = require("../validationSchemas/files-schema")

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
const formatJoiErrors = require("../config/validation/joi-validation");

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
        const file = {
            name: req.body.name,
            employee_id: req.body.employee_id,
            file: req.file.filename
        }
        const {error, value} = await fileSchema.validateAsync(file, {abortEarly: false});
        const fileId = await FilesModel.create(file);
        res.status(201).json({ message: "Файл создан" });

        const changelog = {
            object_type_id: 6,
            object_id: fileId,
            changed_fields: file
        };
        await Changelog.createChangelog(changelog);
    } catch (error) {
        if (error.isJoi){
            return res.status(400).json({
                status: 'error',
                errors: formatJoiErrors(error)
            });
        }
        console.error(error);
        res.status(500).json({ message: "Ошибка при создании файла", error });
    }
};


exports.editFile = async (req, res) => {
        const id = parseInt(req.params.id);
    try {
        const file = {
            name: req.body.name,
            employee_id: req.body.employee_id,
            file: req.file.filename
        }
        const {error, value} = await fileSchema.validateAsync(file, {abortEarly: false});
        await FilesModel.edit(id, file);
        res.status(201).json({ message: "Файл изменён"});

        const changelog = {
            object_type_id: 6,
            object_id: id,
            changed_fields: file
        };
        await Changelog.editChangelog(changelog);
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({
                message: 'Ошибка валидации данных: ' + (error.details?.[0]?.message || error.message)
            });
        }
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
