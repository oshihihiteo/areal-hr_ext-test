const client = require("../config/db");

class UsersModel {
  static async getAll() {
    const result = await client.query(
      `SELECT id, role_id, lastname, firstname, patronymic, login
             FROM users`,
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
    return result.rows[0].id;
  }

  static async edit(id, data) {
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
  }

  static async delete(id) {
    await client.query("DELETE FROM users WHERE id = $1", [id]);
  }

  static async limitAccess(id) {
    await client.query(
      `UPDATE users
             SET role_id = 3
             WHERE id = $1`,
      [id],
    );
  }

  static async findByLogin(login, id = null) {
    const result = await client.query(
      `SELECT *
             FROM users
             WHERE login = $1
               AND ($2::int IS NULL OR id != $2)`,
      [login, id],
    );
    return result.rows[0] || null;
  }
}

module.exports = UsersModel;
