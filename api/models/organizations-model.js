const client = require("../config/db");

class OrganizationsModel {
    static async getAll() {
        const result = await client.query("SELECT * FROM organizations");
        return result.rows;
    }

    static async getById(id) {
        const result = await client.query(
            "SELECT * FROM organizations WHERE id = $1",
            [id]
        );
        return result.rows[0] || null;
    }

    static async create(organizationData) {
        const result = await client.query(
            "INSERT INTO organizations VALUES (DEFAULT, $1, $2) RETURNING id",
            [organizationData.name,
            organizationData.comment]
        );
        return result.rows[0].id;
    }

    static async delete(id) {
        await client.query("DELETE FROM organizations WHERE id = $1", [id]);
    }

    static async edit(id, organizationData) {
        await client.query(
            "UPDATE organizations SET name = $2, comment = $3 WHERE id = $1",
            [id,
            organizationData.name,
            organizationData.comment]
        );
    }
}

module.exports = OrganizationsModel;
