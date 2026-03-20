import React from 'react';
import { Wind, Droplets, Sun, Eye, Gauge, Cloud } from "lucide-react";
import { convertTemp, convertSpeed, getTempUnit } from "../utils/unitConversion";

const WeatherMetrics = ({ data, isMetric, className }) => {
  if (!data) return null;

  const { main, wind, visibility, clouds } = data;
  const unit = getTempUnit(isMetric);

  const metrics = [
    {
      label: "Feels Like",
      icon: <Sun size={14} />,
      value: `${convertTemp(main.feels_like, isMetric)}${unit}`
    },
    {
      label: "Humidity",
      icon: <Droplets size={14} />,
      value: `${main.humidity}%`
    },
    {
      label: "Pressure",
      icon: <Gauge size={14} />,
      value: `${main.pressure} hPa`
    },
    {
      label: "Visibility",
      icon: <Eye size={14} />,
      value: `${(visibility / 1000).toFixed(1)} km`
    },
    {
      label: "Cloudiness",
      icon: <Cloud size={14} />,
      value: `${clouds?.all ?? 0}%`
    },
    {
      label: "Wind Speed",
      icon: <Wind size={14} />,
      value: `${convertSpeed(wind.speed, isMetric)}`
    }
  ];

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {metrics.map((item, index) => (
        <div key={index} className="glass-card p-3 md:p-5 rounded-[20px] md:rounded-[24px] flex flex-col">
          <span className="flex items-center gap-2 text-[9px] text-white/60 tracking-widest uppercase font-bold mb-1">
            {item.icon}
            {item.label}
          </span>
          <span className="text-[18px] md:text-[20px] font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default WeatherMetrics;