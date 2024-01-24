import React, { useState, useEffect } from 'react';
import countryData from '../resources/countryData.json';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  function handleChange(e) {
    const inputValue = e.target.value;
    setText(inputValue);
    setSuggestion(
      countryData.filter((country) =>
        country.name.toLowerCase().startsWith(inputValue.toLowerCase())
      )
    );
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        setSuggestion([]);
        console.log('escape');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='container'>
      <h1>Search</h1>
      <input type="text" className="searchTerm" value={text} onChange={handleChange} list="suggest" />
      <datalist id="suggest">
        {suggestion.map((country, i) => (
          <option key={i} value={country.name} />
        ))}
      </datalist>
      <button className='searchButton'>Search</button>
    </div>
  );
}

export default App;
