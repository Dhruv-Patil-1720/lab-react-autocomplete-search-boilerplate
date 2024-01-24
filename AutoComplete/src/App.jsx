import React, { useState, useEffect } from 'react';
import countryData from '../resources/countryData.json';
import './App.css';

function App() {
  const [text, setText] = useState('');
 // State to hold the text entered in the search input
  const [suggestion, setSuggestion] = useState([]);
// Event handler for handling changes in the search input
  function handleChange(e) {
    const inputValue = e.target.value;
    setText(inputValue);
    setSuggestion(
      countryData.filter((country) =>
        country.name.toLowerCase().startsWith(inputValue.toLowerCase())
      )
    );
  }
 // Effect to handle the Escape key pressed action 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        setSuggestion([]);
        console.log('Escape');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);  // Empty dependency array ensures the effect runs only once

  return (
    <div className='container'>
      <h1>Search</h1>
      <input type="text" className="searchTerm" value={text} onChange={handleChange} list="suggestions" />
      <datalist id="suggestions">
        {suggestion.map((country, i) => (
          <option key={i} value={country.name} />
        ))}
      </datalist>
      <button className='searchButton'>Search</button>
    </div>
  );
}

export default App;
