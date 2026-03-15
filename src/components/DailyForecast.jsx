import React from 'react';
import { convertTemp, getTempUnit, convertSpeed} from "../utils/unitConversion";

const formatDay = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const DailyForecast = ({ data, isMetric}) => {
  if (!data?.list?.length) return null;

   const unit = getTempUnit(isMetric);

   const currentWind= convertSpeed(data.list[0].wind.speed, isMetric);

   const today = data.list.slice(0, 8); // 24h đầu (3h mỗi slot)
    const rainProbability = Math.round(
    Math.max(...today.map(item => item.pop || 0)) * 100
  );

  // 🔹 Lọc mốc 12:00:00 mỗi ngày
  const dailyData = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .map((item) => ({
      id: item.dt,
      day: formatDay(item.dt_txt),
      temp: convertTemp(item.main.temp, isMetric),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
    }));

  return (
    <>
      <div className="glass-card p-6 rounded-[28px]">
        <p className="text-[11px] text-white/60 tracking-widest uppercase mb-5 font-bold">5-Day Forecast</p>
        <div className="flex gap-2"> {/* Dùng gap-2 giống Hourly */}
          {dailyData.map((d) => (
            <div 
              key={d.id} 
              className="flex-1 px-2 py-3 rounded-[18px] text-center hover:bg-white/5 transition cursor-pointer"
            >
              <span className="text-xs text-white/60 uppercase font-medium">
                {d.day}
              </span>
              
              <img
                src={d.icon}
                alt="weather icon"
                className="w-10 h-10 mx-auto my-2"
              />
              
              <span className="block font-bold">
                {d.temp}{unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Rain Probability */}
        <div className="glass-card p-6 rounded-[28px] relative overflow-hidden">
          <p className="text-[11px] text-white/60 tracking-widest uppercase mb-4 font-bold">
            Rain Chance
          </p>

          <span className="text-4xl font-bold">{rainProbability}%</span>

          <div className="h-[6px] w-full bg-white/20 rounded-full mt-5 relative">
            <div
              className="absolute top-0 left-0 h-full bg-blue-400 rounded-full"
              style={{ width: `${rainProbability}%` }}
            />
          </div>
        </div>
        {/* Wind */}
        <div className="glass-card p-6 rounded-[28px] flex flex-col justify-between">
          <div>
            <p className="text-[11px] text-white/60 tracking-widest uppercase mb-4 font-bold">Wind</p>
            <span className="text-4xl font-bold">{currentWind}</span>
          </div>
          <div className="self-end opacity-20 hover:opacity-100 transition">🧭</div>
        </div>
      </div>
    </>
  );
};

export default DailyForecast;