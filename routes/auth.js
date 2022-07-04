const Router = require("express").Router();
const { check, validationResult } = require("express-validator");
const users = require("../db/data");
const bcrypt = require("bcrypt");

Router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Please provide a password that is greater than 5 characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { password, email } = req.body;

    // validate
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //validate if user dosnt already exist

    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      res.status(400).json({
        errors: [
          {
            msg: "this user already exist",
          },
        ],
      });
    }

    const hashedPass = await bcrypt.hash(password, 15);

    console.log(hashedPass);

    users.push({
      email,
      password: hashedPass,
    });

    res.send("Validation past");
  }
);

module.exports = Router;
