import React from "react";

export default function LoadingState() {
  return (
    <div className="text-center py-12 lg:py-24">
      <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-400 text-lg lg:text-xl">
        Loading weather data...
      </p>
      <p className="text-gray-500 text-sm lg:text-base mt-2">
        This may take a few moments
      </p>
    </div>
  );
}
