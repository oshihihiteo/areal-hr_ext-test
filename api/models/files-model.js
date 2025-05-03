const client = require("../config/db");

class FilesModel {
  static async getAll() {
    const result = await client.query(`
            SELECT f.id,
                   f.name,
                   f.file,
                   f.employee_id,
                   e.lastname,
                   e.firstname,
                   e.patronymic
            FROM files f
                     JOIN employees e ON f.employee_id = e.id`);
    return result.rows;
  }

  static async findByEmployee(id) {
    const result = await client.query(
      "SELECT * FROM files WHERE employee_id = $1",
      [id],
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await client.query("SELECT * FROM files WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  static async create(data) {
    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO files
                 VALUES (DEFAULT, $1, $2, $3)
                 RETURNING id`,
        [data.employee_id, data.name, data.file],
      );

      await client.query("COMMIT");
      return result.rows[0].id;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async edit(id, data) {
    try {
      await client.query("BEGIN");

      await client.query(
        `UPDATE files
                 SET employee_id = $2,
                     name        = $3,
                     file        = $4
                 WHERE id = $1`,
        [id, data.employee_id, data.name, data.file],
      );

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async delete(id) {
    try {
      await client.query("BEGIN");

      await client.query("DELETE FROM files WHERE id = $1", [id]);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async findByName(fileName, id) {
    const query = `
            SELECT *
            FROM files
            WHERE name = $1
              AND ($2::int IS NULL OR id != $2)`;
    const params = [fileName, id];
    const result = await client.query(query, params);
    return result.rows[0] || null;
  }
}

module.exports = FilesModel;
