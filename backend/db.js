// server/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Metti la tua password se ne hai una
  database: 'moodread_progetto' // <--- ECCO IL NOME CORRETTO
});

connection.connect(error => {
  if (error) {
    console.error("❌ Errore di connessione:", error.message);
    return;
  }
  console.log("✅ Connesso al Database: moodread_progetto");
});

module.exports = connection;