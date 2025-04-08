const client = require("../config/db");

class UsersModel {
    static async getAll() {
        const result = await client.query("SELECT * FROM users");
        return result.rows;
    }

    static async getById(id) {
        const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0] || null;
    }

    static async create(data) {
        const result = await client.query(
            `INSERT INTO users (role_id, lastname, firstname, patronymic, login, password)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [data.role_id, data.lastname, data.firstname, data.patronymic, data.login, data.password]
        );
        return result.rows[0].id;
    }

    static async edit(id, data) {
        await client.query(
            `UPDATE users SET role_id = $2, lastname = $3, firstname = $4, patronymic = $5,
             login = $6, password = $7 WHERE id = $1`,
            [id, data.role_id, data.lastname, data.firstname, data.patronymic, data.login, data.password]
        );
    }

    static async delete(id) {
        await client.query("DELETE FROM users WHERE id = $1", [id]);
    }
}

module.exports = UsersModel;
