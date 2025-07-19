import React, { useState } from 'react';

import '../styles/searchbar.css';

const SearchBar = ({ input, setInput, onSearch }) => {
  
 

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(input); // ⬅️ only call if provided
    }
  };

  return (
    <form onSubmit={onSearchHandler} className="searchbar">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="Search courses, topics..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
