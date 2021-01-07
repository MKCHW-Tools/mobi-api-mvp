require('dotenv').config()
const express = require('express')

require('./db/db')

const userRouter = require('./routes/users')
const tokenRouter = require('./routes/tokens')
const noteRouter = require('./routes/notes')
const doctorRouter = require('./routes/doctors')
const ambulanceRouter = require('./routes/ambulances')

const PORT = process.env.PORT || 4000

const app = express()
app.use(express.json())

app.use(userRouter)
app.use(tokenRouter)
app.use(doctorRouter)
app.use(ambulanceRouter)

app.get('/', (req, res) => res.send(`Oooops!! Nothing here.`))

app.listen(PORT, () => console.log(`Server running on ${PORT}`))