const client = require("../config/db");

class PositionsModel {
    static async getAll() {
        const result = await client.query("SELECT * FROM positions");
        return result.rows;
    }

    static async getById(id) {
        const result = await client.query(
            "SELECT * FROM positions WHERE id = $1",
            [id]
        );
        return result.rows[0] || null;
    }

    static async create(positionData) {
        const result = await client.query(
            "INSERT INTO positions (name) VALUES ($1) RETURNING id",
            [positionData.name]
        );
        return result.rows[0].id;
    }

    static async delete(id) {
        await client.query("DELETE FROM positions WHERE id = $1", [id]);
    }

    static async edit(id, positionData) {
        await client.query(
            "UPDATE positions SET name = $2 WHERE id = $1",
            [id, positionData.name]
        );
    }

    static async findByName(positionName, id) {
        const query = `
            SELECT * FROM positions 
            WHERE name = $1 
            AND ($2::int IS NULL OR id != $2)`;
        const params = [positionName, id];
        const result = await client.query(query, params);
        return result.rows[0] || null;
    }
}

module.exports = PositionsModel;
