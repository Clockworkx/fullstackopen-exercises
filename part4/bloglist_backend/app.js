const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const mongoose = require("mongoose");
const { error, info } = require("./utils/logger");

const mongoUrl = config.MONGODB_URL;
mongoose
  .connect(mongoUrl)
  .then(() => info("succesfully connected to MongoDB"))
  .catch((e) => error(`error connecting to MongoDB ${e.message}`));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
