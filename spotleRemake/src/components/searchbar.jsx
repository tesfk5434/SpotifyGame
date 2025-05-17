import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './searchBar.css';

function SearchBar({ accessToken }) {
  const [input, setInput] = useState('');

  const fetchData = (value) => {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(value)}&type=artist&limit=5&offset=0`;

    fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // You can update state here if you want to show results
      })
      .catch((err) => {
        console.error("Failed to fetch artists:", err);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className='search-bar-div'>
      <FaSearch className='search-bar-icon' />
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={input}
        className='search-bar'
        placeholder='Enter an artist...'
      />
    </div>
  );
}

export default SearchBar;
