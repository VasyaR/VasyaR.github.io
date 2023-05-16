const PG = require('pg-pool');

const db = new PG({
    host:'localhost',
    port:5432,
    user:'postgres',
    database:'pp',
    password:'postgres',
})

module.exports = { db }