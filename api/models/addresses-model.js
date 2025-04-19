const client = require("../config/db");

class AddressesModel {
  static async getById(id) {
    const result = await client.query("SELECT * FROM addresses WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  static async create(data) {
    const result = await client.query(
      `INSERT INTO addresses
             VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
             RETURNING id`,
      [
        data.region,
        data.settlement,
        data.street,
        data.house,
        data.building,
        data.apartment,
      ],
    );
    return result.rows[0].id;
  }

  static async edit(id, data) {
    await client.query(
      `UPDATE addresses
             SET region = $2,
                 settlement = $3,
                 street = $4,
                 house      = $5,
                 building   = $6,
                 apartment  = $7
             WHERE id = $1`,
      [
        id,
        data.region,
        data.settlement,
        data.street,
        data.house,
        data.building,
        data.apartment,
      ],
    );
  }

  static async delete(id) {
    await client.query("DELETE FROM addresses WHERE id = $1", [id]);
  }
}

module.exports = AddressesModel;
