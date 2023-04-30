const Book = require('../models/Book')

const getAllBooks =(req,res,next) =>{
    Book.find()
    .then((books) => res.json(books))
    .catch((err) => console.log(err));
}
const createBook =(req, res) => {
    Book.create(req.body)
      .then((book) => res.status(201).json(book))
      .create((err) => console.log(err));
  }

const deleteAllBooks=(req, res) => {
    Book.deleteMany()
      .then((reply) => res.json(reply))
      .catch((err) => console.log(err));
  }

  const getABook =(req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: "book not found" });
        res.json(book.reviews);
      })
      .catch(next);
  }
  const updateABook=(req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: "book not found" });
        const review = {
          text: req.body.text,
        };
        book.reviews.push(review);
        book
          .save()
          .then((book) => res.status(201).json(book.reviews))
          .catch(next);
      })
      .catch(next);
  }
  const deleteABook=(req, res, next) => {
    Book.findById(req.params.book_id)
      .then((book) => {
        if (!book) return res.status(404).json({ error: "book not found" });
        book.reviews = [];
        book
          .save()
          .then((book) => res.status(204).end())
          .catch(next);
      })
      .catch(next);
  }

  module.exports={
    getAllBooks,
    createBook,
    deleteAllBooks,
    getABook,
    updateABook,
    deleteABook

  }
