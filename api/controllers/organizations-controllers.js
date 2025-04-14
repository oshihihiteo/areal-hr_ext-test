const Organizations = require("../models/organizations-model");
const organizationSchema = require('../validationSchemas/organization-schema');
const Changelog = require("./changelog-controller");
const formatJoiErrors = require('../config/validation/joi-validation')

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
        const organization = req.body.organizationData;
        const {error, value} = await organizationSchema.validateAsync(organization, {context: {}, abortEarly: false });
        const organizationId = await Organizations.create(organization);
        res.status(200).json({message: "Организация добавлена."});

        const changelog = {
            object_type_id: 3,
            object_id: organizationId,
            changed_fields: req.body.organizationData
        };
        await Changelog.createChangelog(changelog);
    } catch (error){
        if (error.isJoi){
            return res.status(400).json({
                status: 'error',
                errors: formatJoiErrors(error)
            });
        }
        console.error(error);
        res.status(500).json({ message: "Ошибка при добавлении организации: ", error });
    }
};

exports.deleteOrganization = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await Organizations.delete(id);
        res.status(200).json({ message: "Организация удалена." });
        const changelog = {
            object_type_id: 3,
            object_id: id,
            changed_fields: null
        };
        await Changelog.deleteChangelog(changelog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении организации: ", error });
    }
};

exports.editOrganization = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const organization = req.body.organizationData;
        const {error, value} = await organizationSchema.validateAsync(organization, {context: {id}, abortEarly: false });
        await Organizations.edit(id, organization);
        res.status(200).json({message: "Организация изменена."});

        const changelog = {
            object_type_id: 3,
            object_id: id,
            changed_fields: req.body.organizationData
        };
        await Changelog.createChangelog(changelog);
    } catch (error){
        if (error.isJoi){
            return res.status(400).json({
                status: 'error',
                errors: formatJoiErrors(error)
            });
        }
        console.error(error);
        res.status(500).json({ message: "Ошибка при редактировании организации: ", error });
    }
};
