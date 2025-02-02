const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json()); // Middleware to parse JSON

app.post("/api/signup", (req, res) => {
  const { username, email, phone, password } = req.body;
  console.log("Received data:", { username, email, phone, password });

  res.status(201).json({ message: "User signed up successfully!" });
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log("Received data:", { username, password });
  
    res.status(200).json({ message: "User login successfully!" });
  });

app.listen(9001, () => {
    console.log("listening....")
})