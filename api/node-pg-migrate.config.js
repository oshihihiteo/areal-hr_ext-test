require('dotenv').config({ path: '../.env' });

module.exports = {
    databaseUrl: process.env.DATABASE_URL,
    migrationsTable: 'pgmigrations',
    migrationsPath: 'src/migrations',
};
