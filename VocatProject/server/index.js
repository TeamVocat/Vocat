require("dotenv").config({ silent: true });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const morgan = require("morgan");

const app = express();

mongoose
    .connect(process.env.DATABASE)
    .then((data) => console.log(`Connected to MongoDB`))
    .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(morgan("dev"));

app.use("/client", express.static("client"));

app.listen(8000, () => console.log("Server running on port 8000"));