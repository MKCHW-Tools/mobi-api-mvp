const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      serverSelectionTimeoutMS: 5000,
    },
    console.log("connected db")
  )
  .catch((error) => console.error(error));
