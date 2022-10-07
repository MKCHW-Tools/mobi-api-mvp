require("dotenv").config();
const express = require("express");

require("./db/db");

const { userRouter } = require("./routes/users");
const tokenRouter = require("./routes/tokens");
const { doctorRouter } = require("./routes/doctors");
const { ambulanceRouter } = require("./routes/ambulances");
const { diagnosisRouter } = require("./routes/diagnosis");
const { chatRouter } = require("./routes/chats");
const { messageRouter } = require("./routes/messages");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use(tokenRouter);
app.use("/doctors", doctorRouter);
app.use("/diagnosis", diagnosisRouter);
app.use("/ambulances", ambulanceRouter);
app.use("/chats", chatRouter);
app.use("/messages", messageRouter);

app.get("/", (req, res) => res.send(`Oops It's MobiKlinic`));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
