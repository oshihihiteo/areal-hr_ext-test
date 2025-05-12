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
    const result = await client.query(
      `INSERT INTO files (employee_id, name, file)
             VALUES ($1, $2, $3)
             RETURNING id`,
      [data.employee_id, data.name, data.file],
    );
    return result.rows[0].id;
  }

  static async edit(id, data) {
    await client.query(
      `UPDATE files
             SET employee_id = $2,
                 name        = $3,
                 file        = $4
             WHERE id = $1`,
      [id, data.employee_id, data.name, data.file],
    );
  }

  static async delete(id) {
    await client.query("DELETE FROM files WHERE id = $1", [id]);
  }

  static async findByName(fileName, id) {
    const result = await client.query(
      `
                SELECT *
                FROM files
                WHERE name = $1
                  AND ($2::int IS NULL OR id != $2)`,
      [fileName, id],
    );
    return result.rows[0] || null;
  }
}

module.exports = FilesModel;
