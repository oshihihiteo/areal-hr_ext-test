const client = require("../config/db");

class ObjectTypesModel {
    static async getAll() {
        const result = await client.query("SELECT * FROM object_types");
        return result.rows;
    }

    static async getById(id) {
        const result = await client.query("SELECT * FROM object_types WHERE id = $1", [id]);
        return result.rows[0] || null;
    }

    static async create(data) {
        const result = await client.query(
            `INSERT INTO object_types VALUES (DEFAULT, $1) RETURNING id`,
            [data.name]
        );
        return result.rows[0].id;
    }

    static async edit(id, data) {
        await client.query("UPDATE object_types SET name = $2 WHERE id = $1", [id, data.name]);
    }

    static async delete(id) {
        await client.query("DELETE FROM object_types WHERE id = $1", [id]);
    }
}

module.exports = ObjectTypesModel;
