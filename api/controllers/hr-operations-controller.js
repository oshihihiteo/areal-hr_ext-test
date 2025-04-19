const HR_operations = require("../models/hr-operations-model");
const Changelog = require("./changelog-controller");
const hrOperationSchema = require("../validationSchemas/hr-operations-schema");
const formatJoiErrors = require("../config/validation/joi-validation");

exports.getAllHrOperations = async (req, res) => {
  try {
    const hr_operations = await HR_operations.getAll();
    res.status(200).json({ hr_operations });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при получении списка кадровых операций.",
        error: error,
      });
  }
};

exports.createHrOperation = async (req, res) => {
  try {
    const hrOperation = req.body.hrOperationData;
    const { error, value } = await hrOperationSchema.validateAsync(
      hrOperation,
      { abortEarly: false },
    );
    const hrOperationId = await HR_operations.create(hrOperation);
    res.status(200).json({ message: "Кадровая операция добавлен." });

    const changelog = {
      object_type_id: 5,
      object_id: hrOperationId,
      changed_fields: hrOperation,
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
      .json({ message: "Ошибка при добавлении кадровой операции: ", error });
  }
};

exports.deleteHrOperation = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const hr_operation = await HR_operations.delete(id);
    res.status(200).json({ message: "Кадровая операция удалена." });

    const changelog = {
      object_type_id: 5,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteChangelog(changelog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при удалении кадровой операции: ", error });
  }
};

exports.editHrOperation = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const hrOperation = req.body.hrOperationData;
    const { error, value } = await hrOperationSchema.validateAsync(
      hrOperation,
      { abortEarly: false },
    );
    await HR_operations.edit(id, hrOperation);
    res.status(200).json({ message: "Данные кадровой операции изменены." });

    const changelog = {
      object_type_id: 5,
      object_id: id,
      changed_fields: hrOperation,
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
    res
      .status(500)
      .json({ message: "Ошибка при изменении кадровой операции: ", error });
  }
};
