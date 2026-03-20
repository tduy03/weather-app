import React from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import { getWeatherData } from './api/weatherApi';
import { useState, useEffect } from 'react';
import { getBackgroundGif } from './utils/backgroundLogic';
import { Sun, Moon } from 'lucide-react';
import WeatherMetrics from './components/WeatherMetrics';

function App() {

  // State for weather data, loading, and error handling
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Khởi tạo state dark mode từ localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "light" ? false : true;
  });

  // 2. Lưu theme mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const [isMetric, setIsMetric] = useState(true);

  // Lấy link GIF dựa trên thời tiết hiện tại
  const currentGif = getBackgroundGif(weatherData);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(city);
      // console.log(data); // test trước
      setWeatherData(data);
      // Lưu vào localStorage
      localStorage.setItem("lastCity", city);

    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");

    if (savedCity) {
      handleSearch(savedCity);
    } else {
      handleSearch("Hanoi");
    }
  }, []);

  return (
    <div 
      className={`min-h-screen w-full flex items-start md:items-center justify-center relative overflow-y-auto scrollbar-hide transition-colors duration-500 ${
      isDarkMode ? 'bg-[#1a1a1c] text-white' : 'bg-[#f0f2f5] text-slate-800'
    }`}
      style={{ 
        backgroundImage: `url('${currentGif}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay: Giúp làm dịu hình nền */}
      <div className={`fixed inset-0 z-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-black/30' : 'bg-slate-500/60' 
      }`}></div>
      <main className={`main-container relative z-10 w-[92%] max-w-[1050px] md:h-[710px] rounded-[35px] 
        flex flex-col md:grid md:grid-cols-[380px_1fr] p-6 md:pt-7 md:pb-8 md:px-10 gap-6 md:gap-[30px] shadow-2xl border transition-all duration-500 ${
        isDarkMode 
          ? 'bg-[#141416]/60 border-white/10 backdrop-blur-md' 
          : 'bg-white/10 border-white/40 backdrop-blur-xl'
      }`}>
        {loading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-[40px] z-50">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p className="text-white/60 text-sm">Loading weather...</p>
            </div>
          </div>
        )}

        <div className="block md:hidden">
          <SearchBar 
            onSearch={handleSearch}
            isMetric={isMetric}
            setIsMetric={setIsMetric}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </div>

        {/* Left Column */}
        <CurrentWeather 
          data={weatherData?.current}
          isMetric={isMetric}
          isDarkMode={isDarkMode}
          error={error}
        />

        {/* Right Column */}
        <section className="flex flex-col justify-between">
          <div className="hidden md:block">
            <SearchBar 
              onSearch={handleSearch}
              isMetric={isMetric}
              setIsMetric={setIsMetric}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          </div>
          {weatherData && (
            <div className="flex flex-col gap-3 grow justify-between">
              <HourlyForecast 
                data={weatherData.forecast}
                isMetric={isMetric}
                isDarkMode={isDarkMode}
              />
              <DailyForecast 
                data={weatherData.forecast}
                isMetric={isMetric}
                uvIndex={weatherData.uvIndex}
                isDarkMode={isDarkMode}
              />

              <WeatherMetrics 
                data={weatherData.current} 
                isMetric={isMetric} 
                className="grid md:hidden mt-2 mb-4" 
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;