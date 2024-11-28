// Dependencies
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Let us create our database connection (MySQL)
const db = mysql.createConnection({
    user: 'admin', // เปลี่ยนเป็นชื่อผู้ใช้จริงของคุณใน RDS
    host: 'siampalmdb.cd4ms2mkem4y.ap-southeast-1.rds.amazonaws.com', // เปลี่ยนเป็น Endpoint ของ RDS ของคุณ
    password: '7Bs8CrDeFO1oAXKDYUve', // เปลี่ยนเป็นรหัสผ่านจริงของคุณ
    database: 'plantdb', // ชื่อฐานข้อมูลของคุณ
});

// Start the server and listen on all network interfaces
app.listen(3002, '0.0.0.0', () => {
    console.log('Server is running on port 3002');
});

// Route for user registration
app.post('/register', (req, res) => {
    const sentEmail = req.body.Email;
    const sentUserName = req.body.UserName;
    const sentPassword = req.body.Password;

    // SQL statement to insert the user into the "users" table
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)';
    const Values = [sentEmail, sentUserName, sentPassword];

    // Execute SQL query
    db.query(SQL, Values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log('User inserted successfully!');
            res.send({ message: 'User added!' });
        }
    });
});

// Route for user login
app.post('/login', (req, res) => {
    const sentloginUserName = req.body.LoginUserName;
    const sentLoginPassword = req.body.LoginPassword;

    // SQL statement to check credentials in the "users" table
    const SQL = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const Values = [sentloginUserName, sentLoginPassword];

    // Execute SQL query
    db.query(SQL, Values, (err, results) => {
        if (err) {
            console.log('Error');
            res.send({ error: 'An error occurred' });
        } else if (results.length > 0) {
            res.send(results);
        } else {
            res.send({ message: "Credentials don't match!" });
        }
    });
});
