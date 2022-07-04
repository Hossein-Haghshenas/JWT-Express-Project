const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          msg: "Token invalid",
        },
      ],
    });
  }
  try {
    const user = await jwt.verify(
      token,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhvc3NlQGdtYWlsLmNvbSIsImlhdCI6MTY1Njk0NjAyOCwiZXhwIjoxNjYwNTQ2MDI4fQ.LfYW-CYoHevSf9ZP1J6EVreq8kJrLmVc6FBbnaHtsxY"
    );
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          msg: "Token invalid",
        },
      ],
    });
  }
};
