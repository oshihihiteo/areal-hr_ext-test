const Employees = require("../models/employees-model");
const Changelog = require("./changelog-controller");
const employeeSchema = require("../validationSchemas/employee-schema");
const formatJoiErrors = require("../config/validation/joi-validation");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.getAll();
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении списка сотрудников.",
      error: error,
    });
  }
};

exports.getEmployeeById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const employee = await Employees.getById(id);
    res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при получении сотрудника: ", error });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = req.body.employeeData;
    const { error, value } = await employeeSchema.validateAsync(employee, {
      abortEarly: false,
    });
    const employeeId = await Employees.create(employee);
    res.status(200).json({ message: "Сотрудник добавлен." });
    const changelog = {
      object_type_id: 4,
      object_id: employeeId,
      changed_fields: employee,
    };
    await Changelog.createChangelog(req.user.id, changelog);
  } catch (error) {
    if (error.isJoi) {
      return res
        .status(400)
        .json({ status: "error", errors: formatJoiErrors(error) });
    }
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при добавлении сотрудника", error });
  }
};

exports.deleteEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const employee = Employees.getById(id);
    await Employees.delete(employee.address_id, employee.passport_data_id, id);
    res.status(200).json({ message: "Сотрудник удалён." });

    const changelog = {
      object_type_id: 4,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteChangelog(req.user.id, changelog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при удалении сотрудника: ", error });
  }
};

exports.editEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const employee = await Employees.getById(id);
    const data = req.body.employeeData;
    const { error, value } = await employeeSchema.validateAsync(data, {
      abortEarly: false,
    });
    await Employees.edit(employee.address_id, employee.passport_data_id, id, data);
    res.status(200).json({ message: "Данные сотрудника изменены." });

    const changelog = {
      object_type_id: 4,
      object_id: id,
      changed_fields: data,
    };
    await Changelog.editChangelog(req.user.id, changelog);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Ошибка при изменении сотрудника", error });
  }
};
