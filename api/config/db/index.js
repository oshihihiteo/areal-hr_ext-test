require("dotenv").config({ path: '../.env' });
const { Client } = require("pg");

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

client
    .connect()
    .then(() => console.log("Подключение к базе данных успешно!"))
    .catch((err) => console.error("Ошибка подключения к базе данных:", err));

process.on("SIGINT", async () => {
    await client.end();
    console.log("Соединение с базой данных закрыто");
    process.exit(0);
});


module.exports = client;
