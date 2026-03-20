import React from 'react';
import { convertTemp, getTempUnit } from "../utils/unitConversion";

// Hàm format giờ: Ví dụ "09:00 AM"
const formatHour = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const HourlyForecast = ({ data, isMetric }) => {
  if (!data) return null;

  const unit = getTempUnit(isMetric);
  
  // Lấy 5 mốc giờ đầu tiên từ dữ liệu
  const hours = data.list.slice(0, 5).map((item) => ({
    id: item.dt,
    time: formatHour(item.dt_txt),
    temp: convertTemp(item.main.temp, isMetric),
    iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`, // Sử dụng @2x để icon rõ nét hơn
  }));

  return (
    <div className="glass-card p-5 rounded-[28px] h-full flex flex-col justify-between">
      {/* Tiêu đề */}
      <p className="text-[11px] text-white/60 tracking-widest uppercase mb-4 font-bold">
        Hourly Forecast
      </p>

      {/* Danh sách các thẻ giờ */}
      <div className="flex flex-row justify-between items-center gap-2 w-full mt-auto">
        {hours.map((hour) => (
          <div
            key={hour.id}
            className="flex-1 flex flex-col items-center justify-center py-4 rounded-[20px] hover:bg-white/10 transition-all duration-300 cursor-default group"
          >
            {/* Thời gian */}
            <span className="text-[10px] sm:text-xs text-white/70 font-medium whitespace-nowrap mb-1">
              {hour.time}
            </span>

            {/* Icon thời tiết */}
            <img
              src={hour.iconUrl}
              alt="weather icon"
              className="w-12 h-12 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
            />

            {/* Nhiệt độ */}
            <span className="text-sm sm:text-base font-bold text-white mt-1">
              {hour.temp}{unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;