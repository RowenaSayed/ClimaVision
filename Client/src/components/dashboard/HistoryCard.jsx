import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";

function HistoryCard({ location,city, startDate, endDate, searchedAt }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewAnalysis = () => {
    navigate("/dashboard/analytics", {
      state: { city, startDate, endDate},
    });
  };

  return (
    <article
      className="flex-1 bg-[#1a222e]/70 border border-[#00B8D9]/20 rounded-xl p-5 shadow-md 
                        transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-lg hover:border-[#00B8D9]/40 hover:cursor-pointer"
    >
      <section className="flex flex-col sm:flex-row justify-between items-start">
        <section>
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 text-[#00B8D9] mr-2" />
            <h3 className="text-white font-medium">{location}</h3>
          </div>

          <div className="flex items-center mb-2">
            <Calendar className="h-4 w-4 text-[#00B8D9] mr-2" />
            <p className="text-gray-400 text-sm">
              {formatDate(startDate)} - {formatDate(endDate)}
            </p>
          </div>

          <span className="text-xs text-gray-500">
            Searched on:{" "}
            <time dateTime={searchedAt} className="text-[#00B8D9]">
              {formatDate(searchedAt)}
            </time>
          </span>
        </section>

        <section className="w-full sm:w-auto">
          <button
            onClick={handleViewAnalysis}
            className="w-full sm:w-auto mt-5 hover:cursor-pointer bg-[#00B8D9] text-white text-sm px-4  py-2 rounded-lg font-medium 
                       hover:bg-[#009bb5] focus:outline-none focus:ring-2 focus:ring-[#00B8D9]/50
                       transition-colors duration-200 shadow-md gap-4"
            aria-label={`View analysis for ${location}`}
          >
            View Analysis
          </button>
        </section>
      </section>
    </article>
  );
}

export default HistoryCard;
