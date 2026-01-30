const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moodread_progetto' 
});

db.connect(err => {
    if (err) {
        console.error('Errore connessione DB:', err);
    } else {
        console.log('Database connesso!');
    }
});


app.get('/api/books', (req, res) => {
    const mood = req.query.mood; 
    console.log("Cerco libri per mood:", mood); 

  
    const sql = "SELECT * FROM libri_biblioterapia WHERE LOWER(emozione_target) = LOWER(?)";
    
    db.query(sql, [mood], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Errore DB" });
        }
        console.log("Libri trovati nel DB:", result.length); 
        res.json(result);
    });
});

//gestione utenti

app.post('/register', (req, res) => {
    const { nome, cognome, birthdate, username, password, email } = req.body;
    
    const checkQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkQuery, [username], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length > 0) return res.status(409).json({ message: "Username già in uso!" });

        const insertQuery = "INSERT INTO users (nome, cognome, birthdate, username, password, email) VALUES (?, ?, ?, ?, ?, ?)";
        const emailValue = email || null;

        db.query(insertQuery, [nome, cognome, birthdate, username, password, emailValue], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({ message: "Registrazione avvenuta!" });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json(err);
        
        if (result.length > 0) {
            res.status(200).json({ message: "Login effettuato!", user: result[0] });
        } else {
            res.status(401).json({ message: "Username o Password errati" });
        }
    });
});

//gestione forum

app.get('/api/reviews', (req, res) => {
    const sql = "SELECT * FROM reviews ORDER BY created_at DESC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: "Errore DB" });
        res.json(result);
    });
});


app.post('/api/reviews', (req, res) => {
    const { username, bookTitle, mood, text } = req.body;
    
    const sql = "INSERT INTO reviews (username, book_title, mood, rating, comment) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [username, bookTitle, mood, 5, text], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: "Recensione salvata!" });
    });
});

// avvio server
app.listen(3000, () => {
    console.log("Server attivo");
});
