import React from 'react';
import { convertTemp, getTempUnit } from "../utils/unitConversion";
import { CloudRain, Sun } from "lucide-react";

const formatDay = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const DailyForecast = ({ data, isMetric, uvIndex }) => {
  if (!data?.list?.length) return null;

  const unit = getTempUnit(isMetric);

  // Chuẩn UV
  const maxUV = 11;
  const safeUV = Math.min(uvIndex ?? 0, maxUV);
  const uvPercent = (safeUV / maxUV) * 100;

  const getUVLevel = (uvi) => {
    if (uvi <= 2) return "Low";
    if (uvi <= 5) return "Mod"; // Rút ngắn để tránh vỡ layout trên mobile
    if (uvi <= 7) return "High";
    if (uvi <= 10) return "Very High";
    return "Extreme";
  };

  // Tính xác suất mưa 24h tới
  const today = data.list.slice(0, 8);
  const rainProbability = Math.round(
    Math.max(...today.map(item => item.pop || 0)) * 100
  );

  // Lọc 5 ngày tiếp theo (mốc 12:00)
  const dailyData = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .map((item) => ({
      id: item.dt,
      day: formatDay(item.dt_txt),
      temp: convertTemp(item.main.temp, isMetric),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
    }));

  return (
    <div className="flex flex-col gap-[0.8rem] h-full">
      {/* 5-Day Forecast Card */}
      <div className="glass-card p-5 rounded-[28px] flex flex-col justify-between">
        <p className="text-[11px] text-white/60 tracking-widest uppercase mb-4 font-bold">
          5-Day Forecast
        </p>

        <div className="flex flex-row justify-between items-center gap-2 w-full mt-auto pt-[13px]" >
          {dailyData.map((d) => (
            <div
              key={d.id}
              className="flex-1 flex flex-col items-center justify-center py-4 rounded-[20px] hover:bg-white/10 transition-all duration-300 cursor-default group"
            >
              <span className="text-[10px] sm:text-xs text-white/70 font-medium uppercase mb-1">
                {d.day}
              </span>

              <img
                src={d.icon}
                alt="weather icon"
                className="w-12 h-12 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
              />

              <span className="text-sm sm:text-base font-bold text-white mt-1">
                {d.temp}{unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid phụ cho Rain & UV */}
      <div className="grid grid-cols-2 gap-5">
        {/* Rain Probability */}
        <div className="glass-card p-5 rounded-[28px] flex flex-col justify-between min-h-[140px]">
          <p className="flex items-center gap-2 text-[10px] sm:text-[11px] text-white/60 tracking-widest uppercase font-bold">
            <CloudRain size={16} />
            <span>Rain Chance</span>
          </p>

          <div className="mt-2">
            <span className="text-2xl sm:text-4xl font-bold text-white">{rainProbability}%</span>
            <div className="h-[6px] w-full bg-white/10 rounded-full mt-4 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-400 rounded-full transition-all duration-1000"
                style={{ width: `${rainProbability}%` }}
              />
            </div>
          </div>
        </div>

        {/* UV Index */}
        <div className="glass-card p-5 rounded-[28px] flex flex-col justify-between min-h-[140px]">
          <p className="flex items-center gap-2 text-[10px] sm:text-[11px] text-white/60 tracking-widest uppercase font-bold">
            <Sun size={16} />
            <span>UV Index</span>
          </p>

          <div className="mt-2">
            <span className="text-xl sm:text-4xl font-bold text-white">
               {uvIndex !== undefined ? `${uvIndex} ` : "--"}
               <span className="text-xs sm:text-sm font-medium text-white/60 ml-1">
                 {uvIndex !== undefined ? getUVLevel(uvIndex) : ""}
               </span>
            </span>
            <div className="h-[6px] w-full bg-gradient-to-r from-green-400 via-yellow-400 to-purple-500 rounded-full mt-4 relative">
              <div
                className="absolute -top-1 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] transition-all duration-700 border-2 border-slate-900"
                style={{ left: `${uvPercent}%`, transform: "translateX(-50%)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyForecast;