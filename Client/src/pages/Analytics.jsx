import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WeatherChart from "../components/dashboard/analytics/WeatherChart";
import StatsGrid from "../components/dashboard/analytics/StatsGrid";
import SearchFilters from "../components/dashboard/analytics/SearchFilters";
import LoadingState from "../components/dashboard/analytics/LoadingState";
import EmptyState from "../components/dashboard/analytics/EmptyState";
import { FaFire, FaSnowflake, FaCloudSun } from "react-icons/fa";

export default function Analytics() {
  const location = useLocation();
  const {
    city: initCity,
    startDate: initStart,
    endDate: initEnd,
  } = location.state || {};

  const [city, setCity] = useState(initCity || "");
  const [startDate, setStartDate] = useState(initStart || "");
  const [endDate, setEndDate] = useState(initEnd || "");
  const [weatherData, setWeatherData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    tempMax: true,
    tempMin: true,
    humidity: true,
    sunshine: true,
    precipitation: true,
    wind: true,
  });

  // Fetch weather data
  useEffect(() => {
    if (!city || !startDate || !endDate) return;
    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date!");
      return;
    }

    const fetchWeatherData = async () => {
      setLoading(true);
      try {
         const response = await fetch(
           `https://weatherapi.runasp.net/api/Weather/GetWeatherData?city=${encodeURIComponent(
             city
           )}&start=${startDate}&end=${endDate}`,
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           }
         );

        if (!response.ok) throw new Error("Weather data request failed");

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load weather data. Please try again later.");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, startDate, endDate]);

  // Fetch prediction
  useEffect(() => {
    if (!city) return;

    const fetchPrediction = async () => {
      try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateString = tomorrow.toISOString().split("T")[0];

        const response = await fetch(
          "https://b583bb8c-3a38-440a-8403-716fb2dd6883-00-335ca372v7t0d.picard.replit.dev/predict",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              city: city.charAt(0).toUpperCase() + city.slice(1),
              date: dateString,
            }),
          }
        );

        const data = await response.json();
        console.log(data)
        if (data.error) {
          setPrediction(null);
        } else {
          setPrediction({
            ...data,
            city: city.charAt(0).toUpperCase() + city.slice(1),
            date: dateString,
          });
        }
      } catch (error) {
        console.error("Error fetching prediction:", error);
        setPrediction(null);
      }
    };

    fetchPrediction();
  }, [city]);

  const calculateStats = (data) => {
    if (!data?.daysList?.length) return null;

    const days = data.daysList;
    const avg = (key) => days.reduce((s, d) => s + d[key], 0) / days.length;

    return {
      temperature: {
        max: Math.max(...days.map((d) => d.tempMax)),
        min: Math.min(...days.map((d) => d.tempMin)),
        avgMax: avg("tempMax"),
        avgMin: avg("tempMin"),
      },
      humidity: {
        avg: avg("humidity"),
        max: Math.max(...days.map((d) => d.humidity)),
        min: Math.min(...days.map((d) => d.humidity)),
      },
      wind: {
        avg: avg("wind"),
        max: Math.max(...days.map((d) => d.wind)),
      },
      precipitation: {
        total: days.reduce((s, d) => s + d.precipitation, 0),
        avg: avg("precipitation"),
        max: Math.max(...days.map((d) => d.precipitation)),
        rainyDays: days.filter((d) => d.precipitation > 0).length,
      },
      sunshine: {
        avg: avg("sunshine"),
        max: Math.max(...days.map((d) => d.sunshine)),
      },
      summary: {
        totalDays: days.length,
      },
    };
  };

  const stats = weatherData ? calculateStats(weatherData) : null;

  const toggleFilter = (name) =>
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));

  const downloadFile = (type) => {
    if (!city || !startDate || !endDate) return;

    const params = new URLSearchParams({
      city,
      start: startDate,
      end: endDate,
      includeTempMax: filters.tempMax,
      includeTempMin: filters.tempMin,
      includeHumidity: filters.humidity,
      includeSunshine: filters.sunshine,
      includePrecipitation: filters.precipitation,
      includeWind: filters.wind,
    });

    const base =
      type === "csv"
        ? "https://weatherapi.runasp.net/api/Weather/download-csv"
        : "https://weatherapi.runasp.net/api/Weather/download-json";

    const url = `${base}?${params.toString()}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = `${city}_weather.${type}`;
    a.click();
  };

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <SearchFilters
        city={city}
        setCity={setCity}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filters={filters}
        onFilterChange={toggleFilter}
        onDownloadCSV={() => downloadFile("csv")}
        onDownloadJSON={() => downloadFile("json")}
      />

      <section className="flex-1 lg:overflow-y-auto p-4 lg:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Weather Analytics
          </h1>
          <p className="text-gray-400 mt-1">
            {city
              ? `Showing data for ${city}`
              : "Choose a city to view analytics"}
            {startDate && endDate && ` from ${startDate} to ${endDate}`}
          </p>
        </header>

        {loading ? (
          <LoadingState />
        ) : stats ? (
          <div className="space-y-8">
            {/* Prediction card */}
            {prediction && (
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-white shadow-lg max-w-4xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
                  <div>
                    <label
                      htmlFor="prediction-date"
                      className="text-sm text-gray-400 mb-1 block"
                    >
                      Select Date
                    </label>
                    <input
                      type="date"
                      id="prediction-date"
                      min={
                        new Date(Date.now() + 86400000)
                          .toISOString()
                          .split("T")[0]
                      }
                      value={prediction.date}
                      onChange={async (e) => {
                        const newDate = e.target.value;
                        try {
                          const res = await fetch(
                            "https://b583bb8c-3a38-440a-8403-716fb2dd6883-00-335ca372v7t0d.picard.replit.dev/predict",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                city:
                                  city.charAt(0).toUpperCase() + city.slice(1),
                                date: newDate,
                              }),
                            }
                          );
                          const data = await res.json();
                          if (!data.error) {
                            setPrediction({
                              ...data,
                              city:
                                city.charAt(0).toUpperCase() + city.slice(1),
                              date: newDate,
                            });
                          } else {
                            setPrediction(null);
                          }
                        } catch (err) {
                          console.error("Prediction update failed:", err);
                          setPrediction(null);
                        }
                      }}
                      className="p-2 rounded-md bg-gray-700 text-white border border-gray-600"
                    />
                  </div>

                  <div className="text-3xl">
                    {prediction.prediction === "Hot" && <FaFire />}
                    {prediction.prediction === "Cold" && <FaSnowflake />}
                    {prediction.prediction === "Mild" && <FaCloudSun />}
                  </div>
                </div>

                <p className="text-gray-300 mb-3">
                  Status:{" "}
                  <span className="font-medium">{prediction.prediction}</span>
                </p>

                <div className="bg-gray-700 h-4 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-4 rounded-full ${
                      prediction.prediction === "Hot"
                        ? "bg-red-500"
                        : prediction.prediction === "Cold"
                        ? "bg-blue-400"
                        : "bg-yellow-400"
                    }`}
                    style={{
                      width:
                        prediction.prediction === "Hot"
                          ? "90%"
                          : prediction.prediction === "Cold"
                          ? "40%"
                          : "60%",
                    }}
                  />
                </div>
                <p className="text-sm text-gray-400">Temperature level</p>

               
              </div>
            )}

            <StatsGrid stats={stats} />

            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Weather Trends
              </h2>
              <WeatherChart weatherData={weatherData} filters={filters} />
            </div>
          </div>
        ) : (
          <EmptyState hasCity={!!city} hasDates={!!(startDate && endDate)} />
        )}
      </section>
    </main>
  );
}
