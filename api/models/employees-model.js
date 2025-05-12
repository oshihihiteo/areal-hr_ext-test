const client = require("../config/db");

class EmployeesModel {
  static async getAll() {
    const result = await client.query(`SELECT * FROM employees`);
    return result.rows;
  }

  static async getById(id) {
    const result = await client.query(`SELECT * FROM employees e WHERE e.id = $1`, [id]);
    return result.rows[0] || null;
  }

  static async create(data, client) {
    try {
      const addressResult = await client.query(
        `INSERT INTO addresses
                 VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
                 RETURNING id`,
        [
          data.address_region,
          data.address_settlement,
          data.address_street,
          data.address_house,
          data.address_building,
          data.address_apartment,
        ],
      );

      const passportResult = await client.query(
        `INSERT INTO passport_data
                 VALUES (DEFAULT, $1, $2, $3, $4, $5)
                 RETURNING id`,
        [
          data.passport_series,
          data.passport_number,
          data.passport_issued_date,
          data.passport_unit_code,
          data.passport_issued_by,
        ],
      );

      const result = await client.query(
        `INSERT INTO employees
                 VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
                 RETURNING id`,
        [
          data.lastname,
          data.firstname,
          data.patronymic,
          data.birth_date,
          passportResult.rows[0].id,
          addressResult.rows[0].id,
        ],
      );

      return result.rows[0].id;
    } catch (err) {
      throw err;
    }
  }

  static async edit(addressId, passportId, employeeId, data, client) {
    try {
      await client.query(
        `UPDATE addresses
                 SET region=$2,
                     settlement=$3,
                     street=$4,
                     house=$5,
                     building=$6,
                     apartment=$7
                 WHERE id = $1`,
        [
          addressId,
          data.address_region,
          data.address_settlement,
          data.address_street,
          data.address_house,
          data.address_building,
          data.address_apartment,
        ],
      );

      await client.query(
        `UPDATE passport_data
                 SET series=$2,
                     number=$3,
                     issued_date=$4,
                     unit_code=$5,
                     issued_by=$6
                 WHERE id = $1`,
        [
          passportId,
          data.passport_series,
          data.passport_number,
          data.passport_issued_date,
          data.passport_unit_code,
          data.passport_issued_by,
        ],
      );

      await client.query(
        `UPDATE employees
                 SET lastname=$2,
                     firstname=$3,
                     patronymic=$4,
                     birth_date=$5
                 WHERE id = $1`,
        [
          employeeId,
          data.lastname,
          data.firstname,
          data.patronymic,
          data.birth_date,
        ],
      );
    } catch (err) {
      throw err;
    }
  }

  static async delete(addressId, passportId, id, client) {
    try {
      await client.query(
        `DELETE
                 FROM employees
                 WHERE id = $1`,
        [id],
      );
      await client.query(
        `DELETE
                 FROM addresses
                 WHERE id = $1`,
        [addressId],
      );
      await client.query(
        `DELETE
                 FROM passport_data
                 WHERE id = $1`,
        [passportId],
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = EmployeesModel;
