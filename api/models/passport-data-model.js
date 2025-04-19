const client = require("../config/db");

class PassportDataModel {
  static async getById(id) {
    const result = await client.query(
      "SELECT * FROM passport_data WHERE id = $1",
      [id],
    );
    return result.rows[0] || null;
  }

  static async create(passportData) {
    const result = await client.query(
      `INSERT INTO passport_data
             VALUES (DEFAULT, $1, $2, $3, $4, $5)
             RETURNING id`,
      [
        passportData.series,
        passportData.number,
        passportData.issued_date,
        passportData.unit_code,
        passportData.issued_by,
      ],
    );
    return result.rows[0].id;
  }

  static async edit(id, passportData) {
    await client.query(
      `UPDATE passport_data
             SET series = $2,
                 number = $3,
                 issued_date = $4,
                 unit_code   = $5,
                 issued_by   = $6
             WHERE id = $1`,
      [
        id,
        passportData.series,
        passportData.number,
        passportData.issued_date,
        passportData.unit_code,
        passportData.issued_by,
      ],
    );
  }

  static async delete(id) {
    await client.query("DELETE FROM passport_data WHERE id = $1", [id]);
  }
}

module.exports = PassportDataModel;
