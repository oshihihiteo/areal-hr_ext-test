const Departments = require("../models/departments-model");
const departmentSchema = require("../validationSchemas/department-schema");
const Changelog = require("../models/changelog-model");
const formatJoiErrors = require("../config/validation/joi-validation");
const pool = require("../config/db");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Departments.getAll();
    res.status(200).json({ departments });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении списка отделов.", error: error });
  }
};

exports.getDepartmentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const department = await Departments.getById(id);
    res.status(200).json({ department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении отдела: ", error });
  }
};

exports.createDepartment = async (req, res) => {
  const client = await pool.connect();
  try {
    const department = req.body.departmentData;

    const { error, value } = await departmentSchema.validateAsync(department, {
      abortEarly: false,
    });

    await client.query("BEGIN");

    const departmentId = await Departments.create(department, client);

    const changelog = {
      object_type_id: 2,
      object_id: departmentId,
      changed_fields: department,
    };
    await Changelog.createLog(req.user.id, changelog, client);

    await client.query("COMMIT");

    res.status(200).json({ message: "Отдел добавлен." });
  } catch (error) {
    await client.query("ROLLBACK");

    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }

    console.error(error);
    res.status(500).json({ message: "Ошибка при добавлении отдела.", error });
  } finally {
    client.release();
  }
};

exports.deleteDepartment = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);

  try {
    await client.query("BEGIN");

    await Departments.delete(id, client);

    const changelog = {
      object_type_id: 2,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteLog(req.user.id, changelog, client);

    await client.query("COMMIT");

    res.status(200).json({ message: "Отдел удалён." });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении отдела: ", error });
  } finally {
    client.release();
  }
};

exports.editDepartment = async (req, res) => {
  const client = await pool.connect();
  const id = parseInt(req.params.id);

  try {
    const department = req.body.departmentData;

    const { error, value } = await departmentSchema.validateAsync(department, {
      abortEarly: false,
    });

    await client.query("BEGIN");

    await Departments.edit(id, department, client);

    const changelog = {
      object_type_id: 2,
      object_id: id,
      changed_fields: department,
    };
    await Changelog.editLog(req.user.id, changelog, client);

    await client.query("COMMIT");

    res.status(200).json({ message: "Данные отдела изменены." });
  } catch (error) {
    await client.query("ROLLBACK");

    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }

    console.error(error);
    res.status(500).json({ message: "Ошибка при изменении отдела.", error });
  } finally {
    client.release();
  }
};
