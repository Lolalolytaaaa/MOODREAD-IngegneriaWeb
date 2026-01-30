// server/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'moodread_progetto' 
});

connection.connect(error => {
  if (error) {
    console.error("Errore di connessione:", error.message);
    return;
  }
  console.log("Connesso al Database: moodread_progetto");
});

module.exports = connection;
