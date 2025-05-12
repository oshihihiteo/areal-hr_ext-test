const Employees = require("../models/employees-model");
const Changelog = require("../models/changelog-model");
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
  const client = await require("../config/db").connect();
  try {
    const employee = req.body.employeeData;
    const { error } = await employeeSchema.validateAsync(employee, {
      abortEarly: false,
    });

    await client.query("BEGIN");

    const employeeId = await Employees.create(employee, client);

    const changelog = {
      object_type_id: 4,
      object_id: employeeId,
      changed_fields: employee,
    };
    await Changelog.createLog(req.user.id, changelog, client);

    await client.query("COMMIT");

    res.status(200).json({ message: "Сотрудник добавлен." });
  } catch (error) {
    await client.query("ROLLBACK");

    if (error.isJoi) {
      return res
        .status(400)
        .json({ status: "error", errors: formatJoiErrors(error) });
    }
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при добавлении сотрудника", error });
  } finally {
    client.release();
  }
};

exports.deleteEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  const client = await require("../config/db").connect();
  try {
    await client.query("BEGIN");

    const employee = await Employees.getById(id);
    await Employees.delete(
      employee.address_id,
      employee.passport_data_id,
      id,
      client,
    );

    const changelog = {
      object_type_id: 4,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteLog(req.user.id, changelog, client);

    await client.query("COMMIT");

    res.status(200).json({ message: "Сотрудник удалён." });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при удалении сотрудника: ", error });
  } finally {
    client.release();
  }
};

exports.editEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  const client = await require("../config/db").connect();
  try {
    const employee = await Employees.getById(id);
    const data = req.body.employeeData;

    const { error } = await employeeSchema.validateAsync(data, {
      abortEarly: false,
    });

    await client.query("BEGIN");

    await Employees.edit(
      employee.address_id,
      employee.passport_data_id,
      id,
      data,
      client,
    );

    const changelog = {
      object_type_id: 4,
      object_id: id,
      changed_fields: data,
    };
    await Changelog.editLog(req.user.id, changelog, client);

    await client.query("COMMIT");

    res.status(200).json({ message: "Данные сотрудника изменены." });
  } catch (error) {
    await client.query("ROLLBACK");

    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Ошибка при изменении сотрудника", error });
  } finally {
    client.release();
  }
};
