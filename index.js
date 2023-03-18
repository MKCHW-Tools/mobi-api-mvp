require("dotenv").config();
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

require("./db/db");

const { userRouter } = require("./routes/users");
const tokenRouter = require("./routes/tokens");
const { doctorRouter } = require("./routes/doctors");
const { ambulanceRouter } = require("./routes/ambulances");
const { diagnosisRouter } = require("./routes/diagnosis");
const { chatRouter } = require("./routes/chats");
const { messageRouter } = require("./routes/messages");
const {adminRouter} = require('./routes/admin');

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json({limit: '50mb'}));

app.use("/users", userRouter);
app.use(tokenRouter);
app.use("/doctors", doctorRouter);
app.use("/diagnosis", diagnosisRouter);
app.use("/ambulances", ambulanceRouter);
app.use("/chats", chatRouter);
app.use("/messages", messageRouter);
app.use("/admin", adminRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req, res) => res.send(`Oops It's MobiKlinic`));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
