const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",    // database host
  user: "root",         // database username
  password: "anila",    // database password
  database: "wazir",    // database name
  port: 3309          // database port
});

connection.query('SELECT 1', (err) => {
  if (err) {
    console.log("Database connection failed ❌");
    console.error("Error code:", err.code);
    console.error("Error message:", err.sqlMessage);
  } else {
    console.log("Database connected ✅");
  }
});

module.exports = connection;
