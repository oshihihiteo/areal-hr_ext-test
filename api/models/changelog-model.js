const client = require("../config/db");

class ChangelogModel {
  static async getAll() {
    const result = await client.query(`
            SELECT c.id,
                   c.date_and_time,
                   u.lastname,
                   u.firstname,
                   u.patronymic,
                   ot.name,
                   c.object_id,
                   c.changed_fields,
                   c.created_at,
                   c.updated_at,
                   c.deleted_at
            FROM changelog c
                     LEFT JOIN object_types ot ON c.object_type_id = ot.id
                     LEFT JOIN users u ON c.user_id = u.id
        `);
    return result.rows;
  }

  static async createLog(userId, data) {
    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO changelog
                 VALUES (DEFAULT, now(), $1, $2, $3, $4, now(), null, null)
                 RETURNING id`,
        [userId, data.object_type_id, data.object_id, data.changed_fields],
      );

      await client.query("COMMIT");
      return result.rows[0].id;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async editLog(userId, data) {
    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO changelog
                 VALUES (DEFAULT, now(), $1, $2, $3, $4, null, now(), null)
                 RETURNING id`,
        [userId, data.object_type_id, data.object_id, data.changed_fields],
      );

      await client.query("COMMIT");
      return result.rows[0].id;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async deleteLog(userId, data) {
    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO changelog
                 VALUES (DEFAULT, now(), $1, $2, $3, $4, null, null, now())
                 RETURNING id`,
        [userId, data.object_type_id, data.object_id, data.changed_fields],
      );

      await client.query("COMMIT");
      return result.rows[0].id;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }
}

module.exports = ChangelogModel;
