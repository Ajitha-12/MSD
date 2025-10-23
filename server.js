const express = require("express");
const app = express();
app.use(express.json());
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Harry Potter", author: "J.K. Rowling" }
];
app.get("/books", (req, res) => {
  res.json(books);
});
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
