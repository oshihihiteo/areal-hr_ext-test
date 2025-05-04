require("dotenv").config({ path: "../.env" });
const { Client } = require("pg");
const bcrypt = require("bcryptjs");
const client = require("./index");

(async () => {
    try {
        await client.query("BEGIN");
        const user = await client.query(
            `SELECT * FROM users WHERE login = $1`, [process.env.ADMIN_LOGIN]
        );

        if (!user.rows.length) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            await client.query(
                `INSERT INTO users (role_id, lastname, firstname, patronymic, login, password)
         VALUES (1, $1, $2, $3, $4, $5)
         RETURNING id`,
                [
                    process.env.ADMIN_LASTNAME,
                    process.env.ADMIN_FIRSTNAME,
                    process.env.ADMIN_PATRONYMIC,
                    process.env.ADMIN_LOGIN,
                    hashedPassword,
                ]
            );
            console.log("Администратор создан");
        } else {
            console.log("Администратор уже существует");
        }
        await client.query("COMMIT");
        await client.end();
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Ошибка:", err);
        await client.end();
    }
})();
