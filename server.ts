import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { networkInterfaces } from "os";

// Routers import

const catRouter = require("./routes/category");

dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());

app.use("/api/v1/category", catRouter);

const PORT = process.env.PORT || 8000;

// Database connection

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("Database connection successfully!");
});

// server connect
app.listen(PORT, () => {
  let ip = null;
  let osType = process.platform;

  if (osType.toLowerCase() === "linux") {
    ip = networkInterfaces()["enp2s0"][0]["address"];
  } else if (osType.toLowerCase() === "darwin") {
    ip = networkInterfaces()["en0"][1]["address"];
  }

  return console.table([
    "Server is listening",
    `Localhost => http://localhost:${PORT}`,
    ip && `ip address => http://${ip}:${PORT}`,
  ]);
});
