const router = require("express").Router();
const { User, Book, Review } = require("../models");

// This route is used for the login and signup
router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
