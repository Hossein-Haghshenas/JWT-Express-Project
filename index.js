const express = require("express");
const auth = require("./routes/auth");
const Port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("hi im working");
});

app.listen(Port, () => {
  console.log(`server is running on port ${Port}!`);
});
