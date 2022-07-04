const Router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db/data");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      return res.status(400).json({
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

    const token = await jwt.sign(
      {
        email,
      },
      "dfgf656tytrytry56eyw9",
      { expiresIn: 3600000 }
    );

    res.json({
      token,
    });
  }
);

Router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "user not found!!!",
        },
      ],
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: "password is't correct !!!",
        },
      ],
    });
  }

  const token = await jwt.sign(
    {
      email,
    },
    "dfgf656tytrytry56eyw9",
    { expiresIn: 3600000 }
  );

  res.json({
    token,
  });
});

Router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = Router;
