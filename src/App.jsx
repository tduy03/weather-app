import React from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import { getWeatherData } from './api/weatherApi';
import { useState, useEffect } from 'react';

function App() {

  // State for weather data, loading, and error handling
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isMetric, setIsMetric] = useState(true);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(city);
      console.log(data); // test trước
      setWeatherData(data);
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("Hanoi");
  }, []);

  return (
    <div 
      className="h-screen w-full flex items-center justify-center bg-[#1a1a1c] relative overflow-hidden text-white"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed inset-0 bg-black/40 z-0"></div>

      <main className="relative z-10 w-[1050px] h-[700px] bg-[#141416]/75 backdrop-blur-[40px] rounded-[40px] grid grid-cols-[380px_1fr] pt-6 pb-10 px-10 gap-[30px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10">
        
        {/* Left Column */}
        <CurrentWeather 
          data={weatherData?.current}
          isMetric={isMetric}
        />

        {/* Right Column */}
        <section className="flex flex-col justify-between">
          <SearchBar onSearch={handleSearch}
              isMetric={isMetric}
              setIsMetric={setIsMetric}
          />
          {weatherData && (
            <div className="flex flex-col gap-3 grow justify-between">
              <HourlyForecast 
                data={weatherData.forecast}
                isMetric={isMetric}
              />
              <DailyForecast 
                data={weatherData.forecast}
                isMetric={isMetric}
              />
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default App;