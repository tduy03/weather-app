import React from 'react';
import { convertTemp, convertSpeed, getTempUnit } from "../utils/unitConversion";

const CurrentWeather = ({ data, isMetric, error }) => {
   if (!data) return null;
   
  const { name, main, weather, wind, visibility } = data;

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const metrics = [
    {
      label: "Feels Like",
      value: `${convertTemp(main.feels_like, isMetric)}${getTempUnit(isMetric)}`
    },
    {
      label: "Humidity",
      value: `${main.humidity}%`
    },
    {
      label: "Pressure",
      value: `${main.pressure} hPa`
    },
    {
      label: "Visibility",
      value: `${(visibility / 1000).toFixed(1)} km`
    }
  ];

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex items-center gap-3">
        <span className="text-xl">📍</span>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-xs text-white/60">{formattedDate}</p>
          {error && (
            <p className="text-xs text-red-400 mt-1">
              City not found. Please try again.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center text-center grow justify-center mt-4">
        
        {/* Container cho Nhiệt độ và Icon nằm ngang hàng */}
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-[100px] font-[200] leading-none tracking-tighter">
            {convertTemp(main.temp, isMetric)}°
          </h1>
        </div>
        <h2 className="text-[32px] font-[500] mt-2 capitalize">
          {weather[0].description}
        </h2>
        <p className="text-sm text-white/60 mt-4 leading-[1.6] max-w-[300px]">
          Today, expect {weather[0].description} with temperatures reaching a maximum of{" "}
          {convertTemp(main.temp_max, isMetric)}
          {getTempUnit(isMetric)}.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-[15px] mt-[50px]">
        {metrics.map((item, index) => (
          <div key={index} className="glass-card p-5 rounded-[24px] flex flex-col">
            <span className="text-[10px] text-white/60 tracking-widest uppercase font-bold">{item.label}</span>
            <span className="text-2xl font-semibold mt-1">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentWeather;