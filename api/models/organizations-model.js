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

  static async create(organizationData) {
    try {
      await client.query("BEGIN");

      const result = await client.query(
        "INSERT INTO organizations VALUES (DEFAULT, $1, $2) RETURNING id",
        [organizationData.name, organizationData.comment],
      );

      await client.query("COMMIT");
      return result.rows[0].id;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async delete(id) {
    try {
      await client.query("BEGIN");

      await client.query("DELETE FROM organizations WHERE id = $1", [id]);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async edit(id, organizationData) {
    try {
      await client.query("BEGIN");

      await client.query(
        "UPDATE organizations SET name = $2, comment = $3 WHERE id = $1",
        [id, organizationData.name, organizationData.comment],
      );

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async findByName(organizationName, id) {
    const query = `
            SELECT *
            FROM organizations
            WHERE name = $1
              AND ($2::int IS NULL OR id != $2)`;
    const params = [organizationName, id];
    const result = await client.query(query, params);
    return result.rows[0] || null;
  }
}

module.exports = OrganizationsModel;
