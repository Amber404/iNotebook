const ConnectToMongo=require('./db')
const express = require('express')

ConnectToMongo();

const app = express()
const port = 5000

app.use(express.json())
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
//Available Routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Amber Here!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})