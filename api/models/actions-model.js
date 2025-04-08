const client = require("../config/db");

class ActionsModel {
    static async getAll() {
        const result = await client.query("SELECT * FROM actions");
        return result.rows;
    }

    static async getById(id) {
        const result = await client.query("SELECT * FROM actions WHERE id = $1", [id]);
        return result.rows[0] || null;
    }

    static async create(data) {
        const result = await client.query(
            `INSERT INTO actions VALUES (DEFAULT, $1) RETURNING id`,
            [data.name]
        );
        return result.rows[0].id;
    }

    static async delete(id) {
        await client.query("DELETE FROM actions WHERE id = $1", [id]);
    }
}

module.exports = ActionsModel;
