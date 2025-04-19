const client = require("../config/db");

class RolesModel {
  static async getAll() {
    const result = await client.query("SELECT * FROM roles");
    return result.rows;
  }

  static async getById(id) {
    const result = await client.query("SELECT * FROM roles WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  static async create(data) {
    const result = await client.query(
      `INSERT INTO roles (name)
             VALUES ($1)
             RETURNING id`,
      [data.name],
    );
    return result.rows[0].id;
  }

  static async edit(id, data) {
    await client.query("UPDATE roles SET name = $2 WHERE id = $1", [
      id,
      data.name,
    ]);
  }

  static async delete(id) {
    await client.query("DELETE FROM roles WHERE id = $1", [id]);
  }
}

module.exports = RolesModel;
