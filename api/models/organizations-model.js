const client = require("../config/db");

class OrganizationsModel {
  static async getAll() {
    const result = await client.query("SELECT * FROM organizations");
    return result.rows;
  }

  static async getById(id) {
    const result = await client.query(
      "SELECT * FROM organizations WHERE id = $1",
      [id],
    );
    return result.rows[0] || null;
  }

  static async create(data) {
    const result = await client.query(
      "INSERT INTO organizations (name, comment) VALUES ($1, $2) RETURNING id",
      [data.name, data.comment],
    );
    return result.rows[0].id;
  }

  static async edit(id, data) {
    await client.query(
      "UPDATE organizations SET name = $2, comment = $3 WHERE id = $1",
      [id, data.name, data.comment],
    );
  }

  static async delete(id) {
    await client.query("DELETE FROM organizations WHERE id = $1", [id]);
  }

  static async findByName(name, id = null) {
    const result = await client.query(
      `SELECT *
             FROM organizations
             WHERE name = $1
               AND ($2::int IS NULL OR id != $2)`,
      [name, id],
    );
    return result.rows[0] || null;
  }
}

module.exports = OrganizationsModel;
