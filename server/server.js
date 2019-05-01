const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
var index = require("./routes/index");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://dbadmin:admin123@cmpe280-election-kv6hy.mongodb.net/visualization",
  {
    useNewUrlParser: true
  }
);

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/elections/", index);
module.exports = app;

app.listen(PORT, function() {
  console.log("Application started at port number : " + PORT);
  // console.log("before load data");
  // load_data();
  // console.log("after load data");
});
