require('dotenv').config()
const express = require('express')

require('./db/db')

const PORT = process.env.PORT || 4000

const app = express()
app.use(express.json())

const userRouter = require('./routes/users')

app.get('/', (req, res) => {
  res.send(`Oooops!! ${process.env.JWT_KEY}`)
})

app.listen(PORT, () => {
  console.log(`MobiKlinic app api ${PORT}`)
})