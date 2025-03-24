import React, { useState, useEffect } from "react";
import "./App.css";
const API_URL = "http://127.0.0.1:5000/books";

function App() {
  const [books, setBooks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newYear, setNewYear] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log("Klaida gaunant knygas", error);
    }
  };

  const addBook = async () => {
    if (newTitle.trim()) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle,
            author: newAuthor,
            year: newYear,
          }),
        });

        if (response.ok) {
          const newBookData = await response.json();
          setBooks([...books, newBookData]);
          setNewTitle("");
          setNewAuthor("");
          setNewYear("");
        }
      } catch (error) {
        console.log("Klaida pridedant knyga", error);
      }
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooks(books.filter((book) => book.id !== id));
      }
    } catch (error) {
      console.log("Klaida trinant knyga", error);
    }
  };

  return (
    <div class="container">
      <h1>Knygu sarasas</h1>
      <div class="form-group">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Iveskite knygos pavadinima..."
        />
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder="Iveskite autoriu..."
        />
        <input
          type="text"
          value={newYear}
          onChange={(e) => setNewYear(e.target.value)}
          placeholder="Iveskite metus..."
        />
        <button onClick={addBook}>Prideti</button>
      </div>
      <ul class="book-list">
        {books.map((book) => (
          <li key={book.id}>
            <span>
              {book.title} - {book.author} - {book.year}
            </span>
            <button onClick={() => deleteBook(book.id)}>Istrinti</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
