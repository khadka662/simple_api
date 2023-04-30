const express = require("express");
// import custom books
let books = require("../data/books");

// import model of database
const Book = require("../models/Book");

const bookController =require("../controllers/book-controller")

// express.Router() --> is used to handle different routes moudalizer
const router = express.Router();

// this is main route for /api/books
router.route("/")

  // get all books
  .get(bookController.getAllBooks)
    
  // add a book in the books list

  .post(bookController.createBook)

  .put((req, res) => {
    res.status(405).json({ error: "PUT request is not allowed" });
  })
  .delete(bookController.deleteAllBooks);

// path for /api/books/:book_id
router.route("/:book_id/reviews")

  // get only specific book
  .get((req, res) => {
    Book.findById(req.params.book_id)
      .then((book) => res.json(book))
      .catch((err) => console.log(err));
  })

  // update particular book
  .put((req, res) => {
    Book.findByIdAndUpdate(
      req.params.book_id,
      { $set: req.body },
      { new: true }
    )
      .then((updated) => res.json(updated))
      .catch((err) => console.log(err));
  })

  // delete particular book
  .delete((req, res) => {
    Book.findByIdAndDelete(req.params.book_id)
      .then((reply) => res.status(204).end())
      .catch((err) => console.log(Error));
  })
  .post((req, res) => {
    res.status(405).json({ error: "POST method is not allowed here" });
  });

router.route("/:book_id/reviews")
  .get(bookController.getABook)

  .post(bookController.updateABook)

  .put((req, res) => {
    res.status(405).json({ error: "Put request is not allowed" });
  })
  .delete(bookController.deleteABook);

// export it to use in other file
router
  .route("/:book_id/reviews/:review_id")
  .get((req, res, next) => {
    Book.findById(req, params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: "book not found" });

        const review = book.reviews.id(req.params.review_id);
        if (!review) return res.status(404).json({ error: "review not found" });
        res.json(review);
      })
      .catch(next);
  })
  .put((req, res) => {
    Book.findById(req.params.book_id).then((book) => {
      if (!book) return res.status(404).json({ error: "book  not found" });
      book.reviews = book.reviews.map((r) => {
        if(r._id === req.params.review_id){
            r.text = req.body.text
        }
        return r
      })

      book.save().then(book =>{
        res.json(book.reviews.id(req.params.review_id))
      }).catch(next)

    }).catch(next)
  })
  .delete((req,res,next) =>{
    Book.findById(req.params.book_id)
    .then(book=>{
        if(!book) return res.status(404).json({error:'book not found'})
         book.reviews = book.reviews.filter((r) =>{
            return r._id !== req.params.review_id
        })

        book.save()
        .then(book=>res.status(204).end())
        .catch(next)
    }).catch
  })

module.exports = router;
