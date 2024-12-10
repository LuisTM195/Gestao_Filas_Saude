const { password, host, port, database } = require("pg");

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "luizinho123",
    host: "localhost",
    port: 5432,
    database: "proticket",
    schema: 'public'
});

module.exports = pool;

