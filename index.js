const express = require("express");
const Port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("hi im working");
});

app.listen(Port, () => {
  console.log(`server is running on port ${Port}!`);
});
