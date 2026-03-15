import React from 'react';
import { convertTemp, getTempUnit } from "../utils/unitConversion";

const formatHour = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const HourlyForecast = ({ data, isMetric }) => {
  if (!data) return null;

  const unit = getTempUnit(isMetric);

  const hours = data.list.slice(0, 5).map((item) => ({
    id: item.dt,
    time: formatHour(item.dt_txt),
    temp: convertTemp(item.main.temp, isMetric),
    iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
  }));

  return (
    <div className="glass-card p-6 rounded-[28px]">
      <p className="text-[11px] text-white/60 tracking-widest uppercase mb-5 font-bold">Hourly Forecast</p>
      <div className="flex gap-2">
        {hours.map((hour) => (
          <div
            key={hour.id}
            className="px-5 py-3 rounded-[18px] text-center hover:bg-white/5 transition cursor-pointer"
          >
            <span className="text-xs text-white/60 flex items-center justify-center gap-1 whitespace-nowrap">{hour.time}</span>

            <img
              src={hour.iconUrl}
              alt="weather icon"
              className="w-10 h-10 mx-auto my-2"
            />

            <span className="block font-bold">
              {hour.temp}{unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;