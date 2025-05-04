const client = require("../config/db");

class UsersModel {
  static async getAll() {
    const result = await client.query(
      "SELECT id, role_id, lastname, firstname, patronymic, login FROM users",
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  static async create(data) {
    try {
      await client.query("BEGIN");

      const result = await client.query(
        `INSERT INTO users (role_id, lastname, firstname, patronymic, login, password)
                 VALUES (2, $1, $2, $3, $4, $5)
                 RETURNING id`,
        [
          data.lastname,
          data.firstname,
          data.patronymic,
          data.login,
          data.password,
        ],
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
        `UPDATE users
                 SET lastname   = $2,
                     firstname  = $3,
                     patronymic = $4,
                     login      = $5,
                     password   = $6
                 WHERE id = $1`,
        [
          id,
          data.lastname,
          data.firstname,
          data.patronymic,
          data.login,
          data.password,
        ],
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

      await client.query("DELETE FROM users WHERE id = $1", [id]);

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async limitAccess(id) {
    try {
      await client.query("BEGIN");

      await client.query(
        `UPDATE users
                 SET role_id = 3
                 WHERE id = $1`,
        [id],
      );

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }

  static async findByLogin(login, id) {
    const query = `
            SELECT *
            FROM users
            WHERE login = $1
              AND ($2::int IS NULL OR id != $2)`;
    const params = [login, id];
    const result = await client.query(query, params);
    return result.rows[0] || null;
  }

  static async createAdmin(data) {
    try {
      await client.query("BEGIN");

      const result = await client.query(
          `INSERT INTO users (role_id, lastname, firstname, patronymic, login, password)
                 VALUES (1, $1, $2, $3, $4, $5)
                 RETURNING id`,
          [
            data.lastname,
            data.firstname,
            data.patronymic,
            data.login,
            data.password,
          ],
      );

      await client.query("COMMIT");
      return result.rows[0].id;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }
}

module.exports = UsersModel;
