const Employees = require("../models/employees-model");
const Addresses = require("../models/addresses-model");
const PassportData = require("../models/passport-data-model");
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

    const addressData = {
      region: employee.address_region,
      settlement: employee.address_settlement,
      street: employee.address_street,
      house: employee.address_house,
      building: employee.address_building,
      apartment: employee.address_apartment,
    };
    const addressId = await Addresses.create(addressData);

    const passportData = {
      series: employee.passport_series,
      number: employee.passport_number,
      issued_date: employee.passport_issued_date,
      unit_code: employee.passport_unit_code,
      issued_by: employee.passport_issued_by,
    };
    const passportDataId = await PassportData.create(passportData);

    const employeeData = {
      lastname: employee.lastname,
      firstname: employee.firstname,
      patronymic: employee.patronymic,
      birth_date: employee.birth_date,
      passport_data_id: passportDataId,
      address_id: addressId,
    };
    const employeeId = await Employees.create(employeeData);
    res.status(200).json({ message: "Сотрудник добавлен." });

    const changelog = {
      object_type_id: 4,
      object_id: employeeId,
      changed_fields: employee,
    };
    await Changelog.createChangelog(changelog);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
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
    await Employees.delete(id);
    await Addresses.delete(employee.address_id);
    await PassportData.delete(employee.passport_data_id);
    res.status(200).json({ message: "Сотрудник удалён." });

    const changelog = {
      object_type_id: 4,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteChangelog(changelog);
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

    const addressData = {
      region: data.address_region,
      settlement: data.address_settlement,
      street: data.address_street,
      house: data.address_house,
      building: data.address_building,
      apartment: data.address_apartment,
    };
    await Addresses.edit(employee.address_id, addressData);

    const passportData = {
      series: data.passport_series,
      number: data.passport_number,
      issued_date: data.passport_issued_date,
      unit_code: data.passport_unit_code,
      issued_by: data.passport_issued_by,
    };
    await PassportData.edit(employee.passport_data_id, passportData);

    const employeeData = {
      lastname: data.lastname,
      firstname: data.firstname,
      patronymic: data.patronymic,
      birth_date: data.birth_date,
    };
    await Employees.edit(id, employeeData);
    res.status(200).json({ message: "Данные сотрудника изменены." });

    const changelog = {
      object_type_id: 4,
      object_id: id,
      changed_fields: data,
    };
    await Changelog.editChangelog(changelog);
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
