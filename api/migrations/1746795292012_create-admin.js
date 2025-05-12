require("dotenv").config();
const argon2 = require("argon2");

exports.up = async (pgm) => {
  const {
    ADMIN_LOGIN,
    ADMIN_PASSWORD,
    ADMIN_FIRSTNAME,
    ADMIN_LASTNAME,
    ADMIN_PATRONYMIC,
  } = process.env;

  const hashedPassword = await argon2.hash(ADMIN_PASSWORD);

  pgm.sql(
    `DO $$
     BEGIN
         IF NOT EXISTS (SELECT 1 FROM users WHERE login = '${ADMIN_LOGIN}') THEN
             INSERT INTO users (role_id, lastname, firstname, patronymic, login, password)
             VALUES (1, '${ADMIN_LASTNAME}', '${ADMIN_FIRSTNAME}', '${ADMIN_PATRONYMIC}', '${ADMIN_LOGIN}', '${hashedPassword}');
         END IF;
     END$$;`,
  );
};

exports.down = (pgm) => {
  const { ADMIN_LOGIN } = process.env;
  pgm.sql(`DELETE
             FROM users
             WHERE login = '${ADMIN_LOGIN}';`);
};
