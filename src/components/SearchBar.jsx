import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

const SearchBar = ({ onSearch, isMetric, setIsMetric, isDarkMode, setIsDarkMode }) => {
  const [city, setCity] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State quản lý dropdown

  const handleSubmit = () => {
    if (!city.trim()) return;
    onSearch(city);
    setCity('');
    setIsOpen(false); // Đóng menu sau khi tìm kiếm
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-0 md:mb-3">
      {/* Nút Menu - Chỉ hiện trên Mobile */}
      <div className="flex items-center justify-start w-full md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg border transition-all ${
            isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'
          }`}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Container chứa nội dung - Xử lý ẩn/hiện dropdown ở đây */}
      <div className={`
        ${isOpen ? 'flex' : 'hidden'} 
        md:flex flex-col md:flex-row items-center justify-between w-full gap-4
      `}>
        
        {/* Ô tìm kiếm */}
        <div className={`px-4 py-2 rounded-xl flex items-center w-full md:w-[250px] md:focus-within:w-[300px] transition-all duration-300 border ${
          isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'
        }`}>
          <input 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            type="text" 
            placeholder="Search cities..." 
            className={`bg-transparent border-none outline-none text-sm w-full placeholder:opacity-50 ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`} 
          />
          <button onClick={handleSubmit} className="opacity-60 hover:opacity-100">
            <Search size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          {/* Nút chuyển Dark/Light */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-xl flex items-center justify-center flex-1 md:flex-none gap-2 font-semibold cursor-pointer text-sm border ${
              isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'
            }`}
          >
            {isDarkMode ? 'Dark' : 'Light'}
          </button>

          {/* Nút chuyển C/F */}
          <div 
            className={`px-4 py-2 rounded-xl flex items-center justify-center flex-1 md:flex-none gap-2 font-semibold cursor-pointer text-sm border ${
              isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'
            }`}
            onClick={() => setIsMetric(!isMetric)}
          >
            <span className={isMetric ? (isDarkMode ? "text-white" : "text-blue-600") : "text-gray-400"}>°C</span>
            <span className="opacity-30">/</span>
            <span className={!isMetric ? (isDarkMode ? "text-white" : "text-blue-600") : "text-gray-400"}>°F</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;