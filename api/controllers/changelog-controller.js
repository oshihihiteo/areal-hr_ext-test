const Changelog = require("../models/changelog-model");

exports.getChangelog = async (req, res) => {
  try {
    const changelog = await Changelog.getAll();
    res.status(200).json({ changelog });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Ошибка при получении истории изменений.",
        error: error,
      });
  }
};

exports.createChangelog = async (changelogData) => {
  try {
    const changelog = await Changelog.createLog(null, changelogData);
  } catch (error) {
    console.error(error);
  }
};

exports.editChangelog = async (changelogData) => {
  try {
    const changelog = await Changelog.editLog(null, changelogData);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteChangelog = async (changelogData) => {
  try {
    const changelog = await Changelog.deleteLog(null, changelogData);
  } catch (error) {
    console.error(error);
  }
};
