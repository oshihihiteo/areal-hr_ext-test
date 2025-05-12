const Positions = require("../models/positions-model");
const Changelog = require("./changelog-controller");
const positionSchema = require("../validationSchemas/position-schema");
const formatJoiErrors = require("../config/validation/joi-validation");

exports.getAllPositions = async (req, res) => {
  try {
    const positions = await Positions.getAll();
    res.status(200).json({ positions });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении списка должностей",
      error,
    });
  }
};

exports.getPositionById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const position = await Positions.getById(id);
    if (!position) {
      return res.status(404).json({ message: "Должность не найдена" });
    }
    res.status(200).json({ position });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении должности",
      error,
    });
  }
};

exports.createPosition = async (req, res) => {
  try {
    const position = req.body.positionData;
    await positionSchema.validateAsync(position, { abortEarly: false });

    const positionId = await Positions.create(position);
    res.status(201).json({ message: "Должность добавлена", id: positionId });

    const changelog = {
      object_type_id: 1,
      object_id: positionId,
      changed_fields: position,
    };
    await Changelog.createChangelog(req.user.id, changelog);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }
    res.status(500).json({
      message: "Ошибка при добавлении должности",
      error,
    });
  }
};

exports.editPosition = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const position = req.body.positionData;
    await positionSchema.validateAsync(position, {
      context: { id },
      abortEarly: false,
    });

    await Positions.edit(id, position);
    res.status(200).json({ message: "Должность изменена" });

    const changelog = {
      object_type_id: 1,
      object_id: id,
      changed_fields: position,
    };
    await Changelog.editChangelog(req.user.id, changelog);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }
    res.status(500).json({
      message: "Ошибка при редактировании должности",
      error,
    });
  }
};

exports.deletePosition = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const position = await Positions.getById(id);
    if (!position) {
      return res.status(404).json({ message: "Должность не найдена" });
    }

    await Positions.delete(id);
    res.status(200).json({ message: "Должность удалена" });

    const changelog = {
      object_type_id: 1,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteChangelog(req.user.id, changelog);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при удалении должности",
      error,
    });
  }
};
