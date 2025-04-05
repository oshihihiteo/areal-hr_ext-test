const Organizations = require("../models/organizations-model");
const Joi = require('joi');
const organizationSchema = require('../validationSchemas/organizationSchema');

exports.getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organizations.getAll();
        res.status(200).json({organizations});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка организаций.", error: error});
    }
};

exports.getOrganizationById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const organization = await Organizations.getById(id);
        res.status(200).json({ organization });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении организации: ", error });
    }
};

exports.createOrganization = async (req, res) => {
    try {
        await organizationSchema.validateAsync(req.body.organizationData);
    }catch (error) {
        return res.status(400).json({
            message: 'Ошибка валидации данных: ' + (error.details?.[0]?.message || error.message)
        });
    }
    try {
        await Organizations.create(req.body.organizationData
        );
        res.status(200).json({ message: "Организация добавлена." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при добавлении организации: ", error });
    }
};

exports.deleteOrganization = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await Organizations.delete(id);
        res.status(200).json({ message: "Организация удалена." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении организации: ", error });
    }
};

exports.editOrganization = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await organizationSchema.validateAsync(req.body.organizationData);
    } catch (error) {
        return res.status(400).json({
            message: 'Ошибка валидации данных: ' + (error.details?.[0]?.message || error.message)
        });
    }
    try {
        await Organizations.edit(id,req.body.organizationData);
        res.status(200).json({ message: "Данные организации изменены." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении организации: ", error });
    }
};
