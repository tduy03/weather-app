// src/api/weatherService.js
import axios from 'axios';

const API_KEY = 'bb24c40e5569c8185447f1859dee1a2f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (cityName) => {
  try {
    // 1. Fetch Current Weather
    const { data: currentData } = await axios.get(`${BASE_URL}/weather`, {
      params: { q: cityName, appid: API_KEY, units: 'metric' },
    });

    // 2. Fetch Forecast (5 days / 3 hour intervals)
    const { data: forecastData } = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: cityName, appid: API_KEY, units: 'metric' },
    });

    // 3️. One Call (UV Index)
    const { lat, lon } = currentData.coord;
    const { data: uvData } = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: lat,
          longitude: lon,
          current: "uv_index"
        }
      }
    );
    const uvIndex = uvData.current.uv_index;
    
    return {
      current: currentData,
      forecast: forecastData,
      uvIndex
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};