// Chỉ import những thứ bạn thực sự cần
import ClearDay from '../assets/images/clear-day.gif';
import ClearNight from '../assets/images/clear-night.gif';
import RainDay from '../assets/images/rain-day.webp';
import RainNight from '../assets/images/rain-night.gif';

export const WEATHER_GIFS = {
  Clear_day: ClearDay,
  Clear_night: ClearNight,
  Rain_day: RainDay,
  Rain_night: RainNight,
  Default: ClearDay 
};

export const getBackgroundGif = (weatherData) => {
  const data = weatherData?.current ? weatherData.current : weatherData;
  
  // Nếu hoàn toàn chưa có data (kể cả cache)
  if (!data || !data.weather) {
    const hour = new Date().getHours();
    // Nếu từ 6h tối đến 6h sáng thì mặc định là Night
    return (hour >= 18 || hour < 6) ? WEATHER_GIFS.Clear_night : WEATHER_GIFS.Clear_day;
  }

  const mainCondition = data.weather[0].main; 
  const icon = data.weather[0].icon; 
  const isNight = icon.includes('n');
  
  if (mainCondition === 'Rain' || mainCondition === 'Drizzle' || mainCondition === 'Thunderstorm') {
    return isNight ? WEATHER_GIFS.Rain_night : WEATHER_GIFS.Rain_day;
  }

  return isNight ? WEATHER_GIFS.Clear_night : WEATHER_GIFS.Clear_day;
};