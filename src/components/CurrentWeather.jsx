import React from 'react';
import { convertTemp, convertSpeed, getTempUnit } from "../utils/unitConversion";
import { Wind, Droplets, Sun, Eye, Gauge, Cloud, MapPin} from "lucide-react";
import WeatherMetrics from './WeatherMetrics';

const CurrentWeather = ({ data, isMetric, error }) => {
   if (!data) return null;
   
  const { name, main, weather, wind, visibility } = data;

  const unit = getTempUnit(isMetric);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex items-center gap-2">
        <span className="text-xl">
          <MapPin size={30} />
        </span>
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

      <div className="flex flex-col items-center text-center grow justify-center mt-4 md:mt-0 ">
        
        {/* Container cho Nhiệt độ và Icon nằm ngang hàng */}
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-[70px] md:text-[100px] font-[200] leading-none tracking-tighter">
            {convertTemp(main.temp, isMetric)}{unit}
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

      <WeatherMetrics 
        data={data} 
        isMetric={isMetric} 
        className="hidden md:grid mt-auto" 
      />
    </section>
  );
};

export default CurrentWeather;