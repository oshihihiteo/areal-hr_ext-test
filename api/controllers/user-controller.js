const Users = require("../models/users-model");
const Changelog = require("./changelog-controller");
const userSchema = require("../validationSchemas/user-schema");
const formatJoiErrors = require("../config/validation/joi-validation");
const argon2 = require("argon2");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.getAll();
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении списка пользователей", error });
  }
};

exports.getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await Users.getById(id);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при получении пользователя", error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = req.body.userData;
    await userSchema.validateAsync(user, { abortEarly: false });

    user.password = await argon2.hash(user.password);
    const userId = await Users.create(user);
    res.status(201).json({ message: "Пользователь создан", id: userId });

    const changelog = {
      object_type_id: 7,
      object_id: userId,
      changed_fields: { ...user, password: "***" }, // скрываем пароль
    };
    await Changelog.createChangelog(req.user.id, changelog);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }
    res
      .status(500)
      .json({ message: "Ошибка при создании пользователя", error });
  }
};

exports.editUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = req.body.userData;
    await userSchema.validateAsync(user, {
      context: { id },
      abortEarly: false,
    });

    if (user.password) {
      user.password = await argon2.hash(user.password);
    }

    await Users.edit(id, user);
    res.status(200).json({ message: "Пользователь изменён" });

    const changelog = {
      object_type_id: 7,
      object_id: id,
      changed_fields: { ...user, password: "***" },
    };
    await Changelog.editChangelog(req.user.id, changelog);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        status: "error",
        errors: formatJoiErrors(error),
      });
    }
    res
      .status(500)
      .json({ message: "Ошибка при редактировании пользователя", error });
  }
};

exports.deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await Users.getById(id);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    await Users.delete(id);
    res.status(200).json({ message: "Пользователь удалён" });

    const changelog = {
      object_type_id: 7,
      object_id: id,
      changed_fields: null,
    };
    await Changelog.deleteChangelog(req.user.id, changelog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка при удалении пользователя", error });
  }
};

exports.limitUserAccess = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await Users.limitAccess(id);
    res.status(200).json({ message: "Права доступа пользователя ограничены" });

    const changelog = {
      object_type_id: 7,
      object_id: id,
      changed_fields: { role_id: 3 },
    };
    await Changelog.editChangelog(req.user.id, changelog);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при ограничении доступа", error });
  }
};
