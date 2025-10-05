import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function EmptyState({ hasCity, hasDates }) {
  return (
    <div className="text-center py-12 lg:py-24">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800/50 rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-6">
          <FaMapMarkerAlt className="text-blue-400 text-2xl lg:text-3xl" />
        </div>

        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">
          {hasCity && hasDates
            ? "No Data Available"
            : "Welcome to Weather Analytics"}
        </h3>

        <p className="text-gray-400 text-sm lg:text-base mb-6">
          {hasCity && hasDates
            ? "No weather data found for the selected location and date range. Please try different parameters."
            : "Please select a location and date range to view weather analytics and charts."}
        </p>

        {!hasCity && (
          <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
            <FaMapMarkerAlt />
            <span className="text-sm">Enter a city name to get started</span>
          </div>
        )}

        {!hasDates && (
          <div className="flex items-center justify-center gap-2 text-green-400">
            <FaCalendarAlt />
            <span className="text-sm">Select start and end dates</span>
          </div>
        )}
      </div>
    </div>
  );
}
