import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Zap } from "lucide-react";
import MapBox from "./MapBox";
import { Link } from "react-router-dom";

export default function SearchBox() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setQuery(text);
    setSelected(null);

    if (!text || !startDate || !endDate) {
      alert("Enter city and select start & end date");
      return;
    }

    try {
        const response = await fetch(
          `http://WeatherAPI.somee.com/api/Weather/GetWeatherData?city=${encodeURIComponent(
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

      if (!response.ok) {
        e.preventDefault();
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching weather data");
    }
  };

  return (
    <section className="mt-12 bg-[#161B22]/90 border border-[#00B8D9]/20 rounded-xl shadow-lg p-8 backdrop-blur-sm">
      <form className="space-y-6" onSubmit={handleSearch}>
        <div>
          <label className="block text-left text-[#00B8D9] mb-2">
            Location
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter city or click on map..."
              className="w-full h-12 pl-10 rounded-lg bg-[#0D1117] border border-[#00B8D9]/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00B8D9]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex gap-3 mt-3">
            <button
              type="submit"
              className="flex items-center px-4 py-2 rounded-md border border-[#00B8D9]/30 text-[#00B8D9] hover:bg-[#00B8D9]/10"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Search Location
            </button>
          </div>

          {results.length > 1 && (
            <select
              className="mt-3 w-full p-2 rounded bg-[#0D1117] border border-[#00B8D9]/30 text-white"
              onChange={(e) => setSelected(results[e.target.value])}
            >
              <option>Choose a result...</option>
              {results.map((res, i) => (
                <option key={i} value={i}>
                  {res.display_name}
                </option>
              ))}
            </select>
          )}

          <div className="mt-4">
            <MapBox
              searchQuery={query}
              onResults={setResults}
              selected={selected}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-left text-[#00B8D9] mb-2">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                max="2025-09-30"
                className="w-full h-12 pl-10 rounded-lg bg-[#0D1117] border border-[#00B8D9]/30 text-white focus:ring-2 focus:ring-[#00B8D9]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="w-1/2">
            <label className="block text-left text-[#00B8D9] mb-2">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                max="2025-09-30"
                className="w-full h-12 pl-10 rounded-lg bg-[#0D1117] border border-[#00B8D9]/30 text-white focus:ring-2 focus:ring-[#00B8D9]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Link
          to="/dashboard/analytics"
          state={{ city: text, startDate, endDate }}
          className="transition-transform duration-150 hover:translate-y-[-3px] w-full h-14 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#00B8D9] to-[#00B8D9]/80 hover:from-[#00B8D9]/90 hover:to-[#00B8D9]/70 md:text-lg sm:text-sm font-medium"
        >
          <Zap className="h-5 w-5 mr-2" />
          Analyze Weather Probability
        </Link>
      </form>

      {/* {weatherData && (
        <div className="mt-6 text-white">
          <h3 className="font-bold text-lg mb-2">Weather Results:</h3>
          <pre className="bg-[#0D1117] p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(weatherData, null, 2)}
          </pre>
        </div>
      )} */}
    </section>
  );
}
