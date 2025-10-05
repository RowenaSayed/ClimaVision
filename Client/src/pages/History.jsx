import React, { useEffect, useState } from "react";
import HistoryCard from "../components/dashboard/HistoryCard";

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          "https://weatherapi.runasp.net/api/Weather/AllHistory",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        setHistoryData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Search History</h1>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {historyData.map((item) => (
          <HistoryCard
            key={item.id}
            location={`${item.city}, ${item.country}`}
            city={item.city}
            startDate={item.startDate}
            endDate={item.endDate}
            searchedAt={item.searchedAT}
          />
        ))}
      </section>
    </main>
  );
}

export default History;
