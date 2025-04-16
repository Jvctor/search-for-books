import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchKey, setSearchKey] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    if (!searchKey) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${searchKey}`);
      const data = await response.json();
      setBooks(data.hits);
    } catch (err) {
      setError('Error');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Buscar Livros</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Digite aqui"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button onClick={fetchBooks} className="search-btn">
          🔍
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="results">
        {books.map((book) => (
          <div key={book.objectID} className="card">
            <p>👤 <strong>Autor:</strong> {book.author || ''}</p>
            <p>📖 <strong>Título:</strong> {book.title || ''}</p>
            <p>🔗 <strong>URL:</strong>{' '}
              {book.url ? (
                <a href={book.url} target="_blank" rel="noreferrer">{book.url}</a>
              ) : (
                ''
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
