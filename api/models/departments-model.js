const client = require("../config/db");

class DepartmentsModel {
    static async getAll() {
        const result = await client.query("SELECT * FROM departments");
        return result.rows;
    }

    static async getById(id) {
        const result = await client.query(
            "SELECT * FROM departments WHERE id = $1",
            [id]
        );
        return result.rows[0] || null;
    }

    static async create(departmentData) {
        const result = await client.query(
            "INSERT INTO departments VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id",
            [departmentData.name,
            departmentData.organization_id,
            departmentData.parent_id,
            departmentData.comment]
        );
        return result.rows[0].id;
    }

    static async delete(id) {
        await client.query("DELETE FROM departments WHERE id = $1", [id]);
    }

    static async edit(id, departmentData) {
        await client.query(
            `UPDATE departments SET name = $2, organization_id = $3, 
                       parent_id = $4, comment = $5 WHERE id = $1`,
            [id,
            departmentData.name,
            departmentData.organization_id,
            departmentData.parent_id,
            departmentData.comment]
        );
    }
}

module.exports = DepartmentsModel;
