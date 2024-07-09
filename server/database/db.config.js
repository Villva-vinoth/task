const {createPool} = require("mysql")

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"task"
})

module.exports = pool
