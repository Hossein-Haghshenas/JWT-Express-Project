const router = require("express").Router();
const { publicPosts, privatePosts } = require("../db/data");
const checkAuth = require("../middleware/checkAuth");

router.get("/public", (req, res) => {
  res.json(publicPosts);
});

router.get("/private", checkAuth, (res, req) => {
  res.json(privatePosts);
});

module.exports = router;
