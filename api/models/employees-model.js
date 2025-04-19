const client = require("../config/db");

class EmployeesModel {
    static async getAll() {
        const result = await client.query(`
            SELECT e.id,
                   e.lastname,
                   e.firstname,
                   e.patronymic,
                   e.birth_date,
                   pd.series      AS passport_series,
                   pd.number      AS passport_number,
                   pd.issued_date AS passport_issued_date,
                   pd.unit_code   AS passport_unit_code,
                   pd.issued_by   AS passport_issued_by,
                   a.region       AS address_region,
                   a.settlement   AS address_settlement,
                   a.street       AS address_street,
                   a.house        AS address_house,
                   a.building     AS address_building,
                   a.apartment    AS address_apartment,
                   p.id           AS position_id,
                   p.name         AS position_name,
                   d.id           AS department_id,
                   d.name         AS department_name,
                   ac.id          AS action_id,
                   ac.name        AS action_name,
                   ho.salary      AS last_salary,
                   ho.created_at  AS last_operation_date,
                   ho.position_id,
                   ho.department_id,
                   ho.action_id
            FROM employees e
                     JOIN passport_data pd ON e.passport_data_id = pd.id
                     JOIN addresses a ON e.address_id = a.id
                     LEFT JOIN (SELECT DISTINCT ON (employee_id) *
                                FROM hr_operations
                                ORDER BY employee_id, created_at DESC) ho ON e.id = ho.employee_id
                     LEFT JOIN actions ac ON ho.action_id = ac.id
                     LEFT JOIN departments d ON ho.department_id = d.id
                     LEFT JOIN positions p ON ho.position_id = p.id;

        `);
        return result.rows;
    }


    static async getById(id) {
        const result = await client.query(`SELECT e.id AS employee_id,
  e.lastname, e.firstname, e.patronymic, e.birth_date, p.id, 
  p.series AS passport_series,
  p.number AS passport_number,
  p.issued_date AS passport_issued_date,
  p.unit_code AS passport_unit_code,
  p.issued_by AS passport_issued_by,
  a.region AS address_region,
  a.settlement AS address_settlement,
  a.street AS address_street,
  a.house AS address_house,
  a.building AS address_building,
  a.apartment AS address_apartment,
  f.name AS file_name, f.file AS file_path
FROM employees e
JOIN passport_data p ON e.passport_data_id = p.id
JOIN addresses a ON e.address_id = a.id 
LEFT JOIN files f ON f.employee_id = e.id WHERE e.id = $1`, [id]);
        return result.rows[0] || null;
    }

    static async create(data) {
        const result = await client.query(
            `INSERT INTO employees VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id`,
            [data.lastname, data.firstname, data.patronymic, data.birth_date, data.passport_data_id, data.address_id]
        );
        return result.rows[0].id;
    }

    static async edit(id, data) {
        await client.query(
            `UPDATE employees SET lastname = $2, firstname = $3, patronymic = $4, 
             birth_date = $5 WHERE id = $1`,
            [id, data.lastname, data.firstname, data.patronymic, data.birth_date]
        );
    }

    static async delete(id) {
        await client.query("DELETE FROM employees WHERE id = $1", [id]);
    }
}

module.exports = EmployeesModel;
