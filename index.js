const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "583484",
  database: "isekai",
});

app.post("/register", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES (?,?,?,?)",
      [email, hash, firstName, lastName],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }

        res.send(result);
      }
    );
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    bcrypt.compare(password, result[0].password, (err, bcryptResult) => {
      if (bcryptResult) res.send(result);
    });
  });
});

app.listen(3001, () => {
  console.log("running server");
});
