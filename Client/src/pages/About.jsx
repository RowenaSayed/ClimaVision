import React from "react";
import { Cloud, Database, Cpu, Users } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-[#00B8D9]">ClimaVision</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Intelligent weather insights platform powered by NASA datasets and
            AI, built to deliver clear, reliable weather analysis and forecasts
            — with a special focus on Egyptian cities.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📑 High-Level Summary</h2>
          <p className="text-gray-300 leading-relaxed">
            ClimaVision addresses the challenge of fragmented climate data and
            unreliable forecasts by combining{" "}
            <span className="text-[#00B8D9] font-medium">NASA datasets</span>
            with advanced AI technologies. Users can explore past, present, and
            future weather insights through an interactive dashboard designed
            for accuracy and usability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">✨ Core Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Users className="w-6 h-6 text-[#00B8D9]" />}
              title="Personalized Accounts"
              description="Secure login and customized weather experience for every user."
            />
            <FeatureCard
              icon={<Cloud className="w-6 h-6 text-[#00B8D9]" />}
              title="Weather Insights"
              description="City and date-based queries with historical analysis and forecasts."
            />
            <FeatureCard
              icon={<Database className="w-6 h-6 text-[#00B8D9]" />}
              title="Exportable Reports"
              description="Download climate data and AI-generated reports for deeper use."
            />
            <FeatureCard
              icon={<Cpu className="w-6 h-6 text-[#00B8D9]" />}
              title="AI-Powered Predictions"
              description="Accurate forecasts enhanced with ML and AI-driven dashboards."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🌍 Data Sources</h2>
          <p className="text-gray-300 leading-relaxed">
            ClimaVision integrates{" "}
            <span className="text-[#00B8D9]">NASA POWER</span>
            datasets (solar radiation, temperature, wind, precipitation) with
            local data from the Egyptian Meteorological Authority and open
            sources such as OpenWeather and Copernicus. This hybrid approach
            enhances accuracy and reliability, especially for micro-climates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">🤖 Role of AI</h2>
          <p className="text-gray-300 leading-relaxed">
            AI powers ClimaVision by generating natural language weather
            summaries, creating automated reports, and providing interactive
            insights. Machine learning models learn from NASA + local datasets
            to deliver forecasts with unmatched precision, visualized through
            user-friendly dashboards.
          </p>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#161B22] p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
