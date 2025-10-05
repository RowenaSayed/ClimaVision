import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function WeatherChart({ weatherData, filters }) {
  if (!weatherData?.daysList?.length) {
    return (
      <div className="h-64 lg:h-96 flex items-center justify-center text-gray-400">
        No data available for chart
      </div>
    );
  }

  const days = weatherData.daysList;
  const labels = days.map((day) => {
    const date = new Date(day.date);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  });

  const datasets = [
    filters.tempMax && {
      label: "Max Temp (°C)",
      data: days.map((d) => d.tempMax),
      borderColor: "#EF4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderWidth: 3,
      fill: false,
      tension: 0.4,
      yAxisID: "y",
    },
    filters.tempMin && {
      label: "Min Temp (°C)",
      data: days.map((d) => d.tempMin),
      borderColor: "#3B82F6",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderWidth: 3,
      fill: false,
      tension: 0.4,
      yAxisID: "y",
    },
    filters.humidity && {
      label: "Humidity (%)",
      data: days.map((d) => d.humidity),
      borderColor: "#60A5FA",
      backgroundColor: "rgba(96, 165, 250, 0.1)",
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      yAxisID: "y1",
    },
    filters.wind && {
      label: "Wind (km/h)",
      data: days.map((d) => d.wind),
      borderColor: "#10B981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      yAxisID: "y",
    },
    filters.precipitation && {
      label: "Precipitation (mm)",
      data: days.map((d) => d.precipitation),
      borderColor: "#06B6D4",
      backgroundColor: "rgba(6, 182, 212, 0.1)",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      yAxisID: "y1",
    },
    filters.sunshine && {
      label: "Sunshine (hours)",
      data: days.map((d) => d.sunshine),
      borderColor: "#F59E0B",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      borderWidth: 2,
      fill: false,
      tension: 0.4,
      yAxisID: "y1",
    },
  ].filter(Boolean);

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#E5E7EB",
          font: {
            size: window.innerWidth < 1024 ? 10 : 12,
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#9CA3AF",
        bodyColor: "#E5E7EB",
        borderColor: "#374151",
        borderWidth: 1,
        usePointStyle: true,
        padding: 12,
        bodyFont: {
          size: window.innerWidth < 1024 ? 11 : 12,
        },
        titleFont: {
          size: window.innerWidth < 1024 ? 10 : 11,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(55, 65, 81, 0.3)",
          drawBorder: false,
        },
        ticks: {
          color: "#9CA3AF",
          maxRotation: 45,
          font: {
            size: window.innerWidth < 1024 ? 10 : 11,
          },
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          color: "rgba(55, 65, 81, 0.3)",
          drawBorder: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: window.innerWidth < 1024 ? 10 : 11,
          },
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
          drawBorder: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: window.innerWidth < 1024 ? 10 : 11,
          },
        },
      },
    },
    elements: {
      point: {
        radius: window.innerWidth < 1024 ? 2 : 3,
        hoverRadius: window.innerWidth < 1024 ? 4 : 6,
      },
    },
  };

  return (
    <div className="h-64 lg:h-96 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
