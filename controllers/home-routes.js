const router = require("express").Router();
const { User, Book, Review } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll();

    const books = bookData.map((book) => book.get({ plain: true }));

    res.render("home", {
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//will render page for individual book and its corresponding review
router.get("/book/:id", async (req, res) => {
  try {
    const dbBookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          attributes: ["review", "user_id"],
        },
      ],
    });

    const book = dbBookData.get({ plain: true });
    console.log(book);
    res.render("bookPage", {
      book,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
