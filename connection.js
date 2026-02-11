const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "anila",
  database: "wazir",
  port: 3309,
});

connection.connect((err) => {
  if (err) {
    console.log("Database connection failed ❌");
  } else {
    console.log("Database connected ✅");
  }
});

module.exports = connection;
