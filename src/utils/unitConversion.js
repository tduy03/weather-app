// src/utils/converters.js

export const convertTemp = (temp, isMetric) => {
  if (isMetric) {
    return Math.round(temp);
  }
  return Math.round((temp * 9) / 5 + 32);
};

export const convertSpeed = (speed, isMetric) => {
  if (isMetric) {
    return `${Math.round(speed)} m/s`;
  }
  return `${Math.round(speed * 2.237)} mph`;
};

export const getTempUnit = (isMetric) => (isMetric ? "°C" : "°F");