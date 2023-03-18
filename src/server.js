const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch(err => {
    console.log("Error connecting to mongoDB", err);
  });

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", err => {
  console.log("UNHANDLED EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("SIGTERM", err => {
  console.log("SIGTERM RECEIVED! 💥 Shutting down...");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
