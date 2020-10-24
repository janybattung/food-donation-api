require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
const morganOption = process.env.NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/api/charity", (req, res) => {
  //Select from DB
  client.query(`SELECT * FROM charities;`, (err, results) => {
    if (err) return res.status(400).json({ ok: false });
    console.log(err, results);
    const { rows } = results;
    return res.status(200).json({ rows });
  });
});
app.post("/api/charity", async (req, res) => {
  const {
    charityName,
    firstName,
    lastName,
    email,
    address1,
    address2,
    city,
    state,
    zipCode,
    phoneNumber,
    website,
  } = req.body;
  //Insert into DB
  client.query(
    `INSERT INTO charities (charityName,firstName,lastName,email,address1,address2,city,state,zipCode,phoneNumber,website) VALUES ('${charityName}','${firstName}','${lastName}','${email}','${address1}','${address2}','${city}','${state}','${zipCode}','${phoneNumber}','${website}');`,
    (err, results) => {
      console.log(err, results);
      if (err) return res.status(400).json({ ok: false });

      return res.status(201).json({ ok: true, results });
    }
  );
});

client
  .connect()
  .then((done) => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
module.exports = { app };
