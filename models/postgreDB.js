const Pool = require('pg').Pool;

/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mandeapp',
    password: '1234',
    port: '5432',
});
*/

const pool = new Pool({
    host: 'mandeposgrest.postgres.database.azure.com',
    port: '5432',
    database: 'mandeAPP',
    user: 'mandeadmin@mandeposgrest',
    password: 'Posgrest@'
});

module.exports = pool;