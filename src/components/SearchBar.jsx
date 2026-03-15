import React, { useState } from 'react';

const SearchBar = ({ onSearch, isMetric, setIsMetric }) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (!city) return;
    onSearch(city);
    setCity('');
  };

  return (
    <div className="flex justify-between items-center mb-3">
      <div className="glass-card px-4 py-2 rounded-xl flex items-center w-[250px] focus-within:w-[300px] transition-all duration-300">
        <input 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          type="text" 
          placeholder="Search cities..." 
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/30" 
        />
        <button className="opacity-60 hover:opacity-100"
        onClick={handleSubmit}>🔍</button>
      </div>

      <div 
      className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 font-semibold cursor-pointer text-sm"
      onClick={() => setIsMetric(!isMetric)}
      >
        <span className={isMetric ? "text-white" : "text-white/40"}>°C</span>
        <span>/</span>
        <span className={!isMetric ? "text-white" : "text-white/40"}>°F</span>
      </div>
    </div>
  );
};

export default SearchBar;