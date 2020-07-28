require('dotenv').config()
const express = require('express')

require('./db/db')

const userRouter = require('./routes/users')
const expenseRouter = require('./routes/expenses')

const PORT = process.env.PORT || 4000

const app = express()
app.use(express.json())

app.use(userRouter)

app.get('/', (req, res) => {
  res.send(`Oooops!! Nothing here.`)
})

app.listen(PORT, () => {
  console.log(`MobiKlinic app api ${PORT}`)
})