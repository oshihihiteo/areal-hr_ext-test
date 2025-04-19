function formatJoiErrors(error) {
  return error.details.map((detail) => ({
    field: detail.path.join("."),
    message: detail.message,
  }));
}

module.exports = formatJoiErrors;
