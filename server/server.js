const dotenv = require("dotenv");
const { chats } = require("./data/data");
const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleWare/errorMiddleWare");
const userRoutes = require("./routes/userRoutes");
const multer = require("multer");
const userModel = require("./modules/userModel");

const app = express();
dotenv.config();
const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.static(__dirname + "/uploads/"));
app.use(cors({ useCredentials: true }));

app.get("/", (req, res) => {
  res.send("Hello World!   api Get Succesfull");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
  console.log("chats api Get Succesfull");
});
app.get("/api/chats/:id", (req, res) => {
  console.log(req.params.id);
  const signleChat = chats.find((c) => c._id === req.params.id);
  res.send(signleChat);
});

app.use(express.json()); // to accept json data

app.use("/api/user", userRoutes);
// app.use(express.static(__dirname + '/uploads/'));

app.use(notFound);
app.use(errorHandler);
// const port = process.env.PORT;
app.listen(8000, () => {
  console.log("server is running  on port 8000");
});
