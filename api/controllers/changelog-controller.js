const Changelog = require("../models/changelog-model");

exports.getChangelog = async (req, res) => {
  try {
    const changelog = await Changelog.getAll();
    res.status(200).json({ changelog });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при получении истории изменений.",
      error: error,
    });
  }
};

exports.createChangelog = async (userId, changelogData) => {
  try {
    const changelog = await Changelog.createLog(userId, changelogData);
  } catch (error) {
    console.error(error);
  }
};

exports.editChangelog = async (userId, changelogData) => {
  try {
    const changelog = await Changelog.editLog(userId, changelogData);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteChangelog = async (userId, changelogData) => {
  try {
    const changelog = await Changelog.deleteLog(userId, changelogData);
  } catch (error) {
    console.error(error);
  }
};
