import React from "react";
import {
  FaThermometerHalf,
  FaTint,
  FaWind,
  FaCloudRain,
  FaSun,
  FaCalendarDay,
} from "react-icons/fa";

const StatCard = ({ icon, label, value, unit, color }) => (
  <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-700">
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 rounded-lg bg-${color}-500/10`}>
        {React.cloneElement(icon, {
          className: `text-${color}-400 text-lg lg:text-xl`,
        })}
      </div>
      <span className="text-gray-400 text-sm lg:text-base">{label}</span>
    </div>
    <div className="text-xl lg:text-2xl font-bold text-white">
      {value}
      {unit && (
        <span className="text-sm lg:text-lg text-gray-400 ml-1">{unit}</span>
      )}
    </div>
  </div>
);

export default function StatsGrid({ stats }) {
  const statCards = [
    {
      icon: <FaThermometerHalf />,
      label: "Avg Temperature",
      value: `${stats.temperature.avgMax.toFixed(
        1
      )}° / ${stats.temperature.avgMin.toFixed(1)}°`,
      color: "red",
    },
    {
      icon: <FaTint />,
      label: "Avg Humidity",
      value: stats.humidity.avg.toFixed(1),
      unit: "%",
      color: "blue",
    },
    {
      icon: <FaWind />,
      label: "Avg Wind Speed",
      value: stats.wind.avg.toFixed(1),
      unit: "km/h",
      color: "green",
    },
    {
      icon: <FaCloudRain />,
      label: "Total Precipitation",
      value: stats.precipitation.total.toFixed(1),
      unit: "mm",
      color: "cyan",
    },
    {
      icon: <FaSun />,
      label: "Avg Sunshine",
      value: stats.sunshine.avg.toFixed(1),
      unit: "hours",
      color: "yellow",
    },
    {
      icon: <FaCalendarDay />,
      label: "Rainy Days",
      value: stats.precipitation.rainyDays,
      unit: `of ${stats.summary.totalDays} days`,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
      {statCards.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
          color={stat.color}
        />
      ))}
    </div>
  );
}
