require('dotenv').config()
const express = require('express')
// require('./db/db')
const PORT = process.env.PORT || 4000

const app = express()

app.get('/', (req, res) => {
  res.send(`Oooops!!`)
})

app.listen(PORT, () => {
  console.log(`MobiKlinic app api ${PORT}`)
  
});
