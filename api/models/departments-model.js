const pool = require("../config/db");

exports.getAll = async () => {
    const result = await pool.query("SELECT * FROM departments");
    return result.rows;
};

exports.getById = async (id) => {
    const result = await pool.query("SELECT * FROM departments WHERE id = $1", [id]);
    return result.rows[0];
};

exports.create = async (departmentData, client) => {
    const result = await client.query(
        "INSERT INTO departments (name, organization_id, parent_id, comment) VALUES ($1, $2, $3, $4) RETURNING id",
        [
            departmentData.name,
            departmentData.organization_id,
            departmentData.parent_id,
            departmentData.comment,
        ]
    );
    return result.rows[0].id;
};

exports.delete = async (id, client) => {
    await client.query("DELETE FROM departments WHERE id = $1", [id]);
};

exports.edit = async (id, departmentData, client) => {
    await client.query(
        `UPDATE departments
         SET name            = $2,
             organization_id = $3,
             parent_id       = $4,
             comment         = $5
         WHERE id = $1`,
        [
            id,
            departmentData.name,
            departmentData.organization_id,
            departmentData.parent_id,
            departmentData.comment,
        ]
    );
};
