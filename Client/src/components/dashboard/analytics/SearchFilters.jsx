import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaDownload,
  FaFileCsv,
  FaFileAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSatellite,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const FILTER_LABELS = {
  tempMax: "Max Temperature",
  tempMin: "Min Temperature",
  humidity: "Humidity",
  sunshine: "Sunshine",
  precipitation: "Precipitation",
  wind: "Wind Speed",
};

export default function SearchFilters({
  city,
  setCity,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filters,
  onFilterChange,
  onDownloadCSV,
  onDownloadJSON,
}) {
  const [tempCity, setTempCity] = useState(city);
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    setTempCity(city);
    setTempStart(startDate);
    setTempEnd(endDate);
  }, [city, startDate, endDate]);

  const handleSearch = () => {
    setCity(tempCity);
    setStartDate(tempStart);
    setEndDate(tempEnd);
  };

  return (
    <>
      <div className="lg:hidden bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-4">
          <FaSatellite className="text-blue-400 text-xl" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Weather Analytics
          </h1>
        </div>

        <div className="relative mb-4">
          <input
            type="search"
            placeholder="Enter city name"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            value={tempCity}
            onChange={(e) => setTempCity(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-sm text-blue-300 font-medium block mb-2">
              Start Date
            </label>
            <input
              type="date"
              max="2025-09-30"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-blue-300 font-medium block mb-2">
              End Date
            </label>
            <input
              type="date"
              max="2025-09-30"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={tempEnd}
              onChange={(e) => setTempEnd(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mb-4 transition duration-200"
        >
          <FaSearch /> Search
        </button>

        <div className="space-y-2">
          <div className="bg-gray-800 rounded-lg">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-2">
                <FaFilter className="text-blue-400" />
                <span className="text-white font-semibold">Chart Filters</span>
              </div>
              {isFiltersOpen ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </button>
            {isFiltersOpen && (
              <div className="px-4 pb-4 space-y-2">
                {Object.entries(filters).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-700/50"
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => onFilterChange(key)}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-200 text-sm">
                      {FILTER_LABELS[key]}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-2">
                <FaDownload className="text-blue-400" />
                <span className="text-white font-semibold">Export Data</span>
              </div>
              {isExportOpen ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </button>
            {isExportOpen && (
              <div className="px-4 pb-4 space-y-2">
                <button
                  onClick={onDownloadCSV}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                >
                  <FaFileCsv />
                  <span>Download CSV</span>
                </button>
                <button
                  onClick={onDownloadJSON}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-200"
                >
                  <FaFileAlt />
                  <span>Download JSON</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="hidden lg:flex lg:flex-col lg:w-80 lg:min-h-screen lg:sticky lg:top-0 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900 text-white p-6 border-r border-blue-500/20 ">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaSatellite className="text-blue-400 text-xl" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Weather Analytics
            </h1>
          </div>
          <p className="text-sm text-gray-400">
            Advanced weather data analysis and visualization
          </p>
        </div>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-blue-400" />
            <h2 className="text-lg font-semibold text-blue-300">
              Location & Date
            </h2>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Enter city name"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                value={tempCity}
                onChange={(e) => setTempCity(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-blue-300 font-medium block mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  max="2025-09-30"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={tempStart}
                  onChange={(e) => setTempStart(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-blue-300 font-medium block mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  max="2025-09-30"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={tempEnd}
                  onChange={(e) => setTempEnd(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              <FaSearch /> Search
            </button>
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-blue-400" />
            <h2 className="text-lg font-semibold text-blue-300">
              Chart Filters
            </h2>
          </div>
          <div className="space-y-2 bg-gray-800/30 p-4 rounded-lg border border-gray-700">
            {Object.entries(filters).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-700/50"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => onFilterChange(key)}
                  className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-200 font-medium">
                  {FILTER_LABELS[key]}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <FaDownload className="text-blue-400" />
            <h2 className="text-lg font-semibold text-blue-300">Export Data</h2>
          </div>
          <div className="space-y-3">
            <button
              onClick={onDownloadCSV}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-200 border border-blue-500/30"
            >
              <FaFileCsv />
              <span>Download CSV</span>
            </button>
            <button
              onClick={onDownloadJSON}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition duration-200 border border-purple-500/30"
            >
              <FaFileAlt />
              <span>Download JSON</span>
            </button>
          </div>
        </section>
      </nav>
    </>
  );
}
