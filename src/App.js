import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);

    try {
      const jsonInput = JSON.parse(input);
      const res = await axios.post('http://127.0.0.1:5002/bfhl', jsonInput);
      setResponse(res.data);
    } catch (err) {
      console.error('Invalid JSON or server error:', err);
      setResponse({ error: 'Invalid JSON or server error' });
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(prevFilter => 
      prevFilter.includes(value) 
        ? prevFilter.filter(f => f !== value) 
        : [...prevFilter, value]
    );
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    if (filter.includes('Numbers') && response.numbers) {
      filteredResponse.numbers = response.numbers.join(', ');
    }

    if (filter.includes('Alphabets') && response.alphabets) {
      filteredResponse.alphabets = response.alphabets.join(', ');
    }

    if (filter.includes('HighestLowercase') && response.highest_lowercase_alphabet) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet.join(', ');
    }

    return (
      <div className="filtered-response">
        <h3>Filtered Response</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON...'
        />
        <button type="submit">Submit</button>
      </form>
      
      {response && response.error && <div className="error">{response.error}</div>}
      
      {response && !response.error && (
        <div>
          <div className="filter">
            <label>Multi Filter:</label>
            <select multiple onChange={handleFilterChange} value={filter}>
              <option value="Numbers">Numbers</option>
              <option value="Alphabets">Alphabets</option>
              <option value="HighestLowercase">Highest Lowercase Alphabet</option>
              {/* Add more options here as needed */}
            </select>
          </div>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
