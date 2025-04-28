const Departments = require("../models/departments-model");
const departmentSchema = require("../validationSchemas/department-schema");
const Changelog = require("./changelog-controller");
const formatJoiErrors = require("../config/validation/joi-validation");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Departments.getAll();
    res.status(200).json({ departments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении списка отделов.", error: error });
  }
};

exports.getDepartmentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const department = await Departments.getById(id);
    res.status(200).json({ department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении отделов: ", error });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const department = req.body.departmentData;
    const { error, value } = await departmentSchema.validateAsync(department, {
      abortEarly: false,
    });
    const departmentId = await Departments.create(department);
    res.status(200).json({ message: "Отдел добавлен." });

    const changelog = {
      object_type_id: 2,
      object_id: departmentId,
      changed_fields: department,
    };
    await Changelog.createChangelog(req.user.id, changelog);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Ошибка при добавлении отдела: ", error });
  }
};

exports.deleteDepartment = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const department = await Departments.delete(id);
    res.status(200).json({ message: "Отдел удалён." });
    const changelog = {
      object_type_id: 2,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteChangelog(req.user.id, changelog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении отдела: ", error });
  }
};

exports.editDepartment = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const department = req.body.departmentData;
    const { error, value } = await departmentSchema.validateAsync(department, {
      abortEarly: false,
    });
    await Departments.edit(id, department);
    res.status(200).json({ message: "Данные отдела изменены." });

    const changelog = {
      object_type_id: 2,
      object_id: id,
      changed_fields: department,
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
    res.status(500).json({ message: "Ошибка при изменении отдела: ", error });
  }
};
