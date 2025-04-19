const client = require("../config/db");

class DropdownListOptionsModel {
  static async getDepartmentsNames() {
    const result = await client.query(`
            SELECT id, name
            FROM departments`);
    return result.rows;
  }

  static async getOrganizationsNames() {
    const result = await client.query(`
            SELECT id, name
            FROM organizations`);
    return result.rows;
  }

  static async getPositionsNames() {
    const result = await client.query(`
            SELECT id, name
            FROM positions`);
    return result.rows;
  }

  static async getActionsNames() {
    const result = await client.query(`
            SELECT id, name
            FROM actions`);
    return result.rows;
  }

  static async getEmployeesWithDepartmentAndPosition() {
    const result = await client.query(`
            SELECT e.id,
                   e.lastname,
                   e.firstname,
                   e.patronymic,
                   p.name AS position_name,
                   d.name AS department_name
            FROM employees e
                     LEFT JOIN (SELECT DISTINCT ON (employee_id) *
                                FROM hr_operations
                                ORDER BY employee_id, created_at DESC) ho ON e.id = ho.employee_id
                     LEFT JOIN departments d ON ho.department_id = d.id
                     LEFT JOIN positions p ON ho.position_id = p.id`);
    return result.rows;
  }
}

module.exports = DropdownListOptionsModel;
