require("dotenv").config({ silent: true });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";

const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 8000

mongoose
    .connect(process.env.DATABASE)
    .then((data) => console.log(`Connected to MongoDB`))
    .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api", authRoutes);

app.listen(port, () => console.log("Server running on port 8000"));