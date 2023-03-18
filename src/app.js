const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const userRouter = require("./routes/Users/userRoute");

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cors());

app.options("*", cors());

app.use("/api/", userRouter);

module.exports = app;
