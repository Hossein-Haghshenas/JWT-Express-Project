const Router = require("express").Router();
const { check, validationResult } = require("express-validator");

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
  (req, res) => {
    const { password, email } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    res.send("Validation past");
  }
);

module.exports = Router;
