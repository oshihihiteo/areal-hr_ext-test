const Users = require("../models/users-model");
const Changelog = require("./changelog-controller");
const userSchema = require("../validationSchemas/user-schema");
const formatJoiErrors = require("../config/validation/joi-validation");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении списка пользователей.", error });
  }
};

exports.getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await Users.getById(id);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при получении пользователя: ", error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = req.body.userData;
    const { error, value } = await userSchema.validateAsync(user, {
      context: {},
      abortEarly: false,
    });
    user.password = await bcrypt.hash(user.password, 10);
    const userId = await Users.create(user);
    res.status(200).json({ message: "Пользователь создан." });

    const changelog = {
      object_type_id: 1,
      object_id: userId,
      changed_fields: user,
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
    return res.status(500).json({
      message: "Ошибка при создании пользователя",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await Users.getById(id);
    await Users.delete(id);
    res.status(200).json({ message: "Пользователь удален." });
    const changelog = {
      object_type_id: 7,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteChangelog(changelog);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ошибка при удалении пользователя: ", error });
  }
};

exports.editUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = req.body.userData;
    const { error, value } = await userSchema.validateAsync(user, {
      context: { id },
      abortEarly: false,
    });
    user.password = await bcrypt.hash(user.password, 10);
    await Users.edit(id, user);
    res.status(200).json({ message: "Пользователь изменен." });

    const changelog = {
      object_type_id: 7,
      object_id: id,
      changed_fields: user,
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
    return res.status(500).json({
      message: "Ошибка при редактировании пользователя",
      error: error.message,
    });
  }
};

exports.limitUserAccess = async (req, res) => {
  const id = parseInt(req.params.id);
  try {

    await Users.limitAccess(id);
    res.status(200).json({ message: "Права доступа пользователя изменены." });

    const changelog = {
      object_type_id: 7,
      object_id: id,
      changed_fields: "Доступ ограничен",
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
    return res.status(500).json({
      message: "Ошибка при редактировании пользователя",
      error: error.message,
    });
  }
};