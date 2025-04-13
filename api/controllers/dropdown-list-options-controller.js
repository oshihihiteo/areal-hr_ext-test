const DropdownListOptions = require("../models/dropdown-list-options-model");

exports.getPositionsNames = async (req, res) => {
    try {
        const positions = await DropdownListOptions.getPositionsNames();
        res.status(200).json({positions});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка должностей.", error});
    }
};
exports.getDepartmentsNames = async (req, res) => {
    try {
        const departments = await DropdownListOptions.getDepartmentsNames();
        res.status(200).json({departments});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка отделов.", error});
    }
};
exports.getOrganizationsNames = async (req, res) => {
    try {
        const organizations = await DropdownListOptions.getOrganizationsNames();
        res.status(200).json({organizations});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка организаций.", error});
    }
};
exports.getActionsNames = async (req, res) => {
    try {
        const actions = await DropdownListOptions.getActionsNames();
        res.status(200).json({actions});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка действий.", error});
    }
};
exports.getEmployeesWithDepartmentsAndPositions = async (req, res) => {
    try {
        const employeesWithDepartmentsAndPositions = await DropdownListOptions.getEmployeesWithDepartmentAndPosition();
        res.status(200).json({employeesWithDepartmentsAndPositions});
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении списка сотрудников.", error});
    }
};