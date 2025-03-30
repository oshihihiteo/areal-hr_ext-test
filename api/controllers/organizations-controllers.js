const Organizations = require("../models/organizations-model");

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
    const { organizationData } = req.body;

    try {
        const organization = await Organizations.create(
            organizationData
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
        const organization = await Organizations.delete(id);
        res.status(200).json({ message: "Организация удалена." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении организации: ", error });
    }
};

exports.editOrganization = async (req, res) => {
    const id = parseInt(req.params.id);
    const {organizationData } = req.body;

    try {
        const organization = await Organizations.edit(id,organizationData
        );
        res.status(200).json({ message: "Данные организации изменены." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при изменении организации: ", error });
    }
};
