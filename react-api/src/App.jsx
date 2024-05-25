import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { Authorization: "whatever-you-want" }
    })
    .then(response => setBookData(response.data.books))
    .catch(error => setError("Error: " + (error.response && error.response.status === 404 ? "Not Found (404)" : "Something went wrong")));
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {!bookData.length && !error && <div>Loading...</div>}
      {bookData.map(book => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <img src={book.imageLinks.thumbnail} alt={book.title} />
          <p>{book.description}</p>
          <p>Authors: {book.authors.join(", ")}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
