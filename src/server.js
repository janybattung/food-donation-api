require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const mocha = require('mocha')
const chai = require('chai')
const { Client } = require('pg')
const client = new Client({
  user: 'dunder_mifflin',
  host: 'localhost',
  database: 'fooddonation',
  password: '12345',
  port: 3211,
})

const app = express()

// const morganOption = (process.env.NODE_ENV === 'production')
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json())

 const PORT = process.env.PORT || 8000;

 app.get('/api/*', (req, res) => {
   res.json({ok: true});
 });
 app.post('/api/charity', async (req, res) => {
 await client.connect()
const {
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
   client.query(`INSERT INTO charities (firstName,lastName,email,address1,address2,city,state,zipCode,phoneNumber,website) VALUES ('${firstName}','${lastName}','${email}','${address1}','${address2}','${city}','${state}','${zipCode}','${phoneNumber}','${website}');`, (err, res) => {
     console.log("sdqsdqsdqqsdqsdqsdqsdqsdqsdqsdqsd")
    console.log(err, res)
    client.end()
   });
  res.status(201).json({ok: true});
});
 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

 module.exports = {app};