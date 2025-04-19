const client = require("../config/db");

class HrOperationsModel {
  static async getAll() {
    const result = await client.query(`SELECT ho.id,
                                                  e.id    AS employee_id,
                                                  e.lastname,
                                                  e.firstname,
                                                  e.patronymic,
                                                  e.birth_date,
                                                  p.id    AS position_id,
                                                  p.name  AS position_name,
                                                  d.id    AS department_id,
                                                  d.name  AS department_name,
                                                  ac.id   AS action_id,
                                                  ac.name AS action_name,
                                                  ho.salary,
                                                  ho.created_at
                                           FROM employees e
                                                    LEFT JOIN public.hr_operations ho ON e.id = ho.employee_id
                                                    JOIN actions ac on ho.action_id = ac.id
                                                    JOIN departments d ON ho.department_id = d.id
                                                    JOIN positions p ON ho.position_id = p.id;`);
    return result.rows;
  }

  static async findByEmployee(id) {
    const result = await client.query(
      "SELECT * FROM hr_operations WHERE id = $1",
      [id],
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await client.query(
      "SELECT * FROM hr_operations WHERE id = $1",
      [id],
    );
    return result.rows[0] || null;
  }

  static async create(data) {
    const result = await client.query(
      `INSERT INTO hr_operations
             VALUES (DEFAULT, $1, $2, $3, $4, $5, now())
             RETURNING id`,
      [
        data.employee_id,
        data.action_id,
        data.salary,
        data.position_id,
        data.department_id,
      ],
    );
    return result.rows[0].id;
  }

  static async edit(id, data) {
    await client.query(
      `UPDATE hr_operations
             SET employee_id   = $2,
                 action_id     = $3,
                 salary        = $4,
                 position_id = $5,
                 department_id = $6
             WHERE id = $1`,
      [
        id,
        data.employee_id,
        data.action_id,
        data.salary,
        data.position_id,
        data.department_id,
      ],
    );
  }

  static async delete(id) {
    await client.query("DELETE FROM hr_operations WHERE id = $1", [id]);
  }
}

module.exports = HrOperationsModel;
