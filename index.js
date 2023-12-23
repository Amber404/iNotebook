const ConnectToMongo=require('./db')
const express = require('express')

ConnectToMongo();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Amber Here!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})