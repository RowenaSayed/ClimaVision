import React from "react";
import { Search, MapPin, Calendar, Zap } from "lucide-react";
import landingPageBG from "../assets/LandingPage-bg.jpg";
import Features from "../components/landingpage/features";
// import MapBox from "../components/landingpage/MapBox";
import SearchBox from '../components/landingpage/SearchBox'

export default function Home({ onStartAnalysis }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] text-white">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={landingPageBG}
            alt="Space night sky"
            className="w-full h-full object-cover opacity-50"
          />
          {/* <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDg2OHFvYTY4bnY2MWR1a3k5eHcxZjc5bHcxbXBudzgwNXhvcXMyZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/RHIKETUlUINYvV7CAO/giphy.webp"
            alt="Space night sky"
            className="w-full h-full object-cover opacity-70"
          /> */}

          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117]/80 to-[#161B22]/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <header>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Weather Probability
              <span className="block text-[#00B8D9]">Explorer</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the historical likelihood of extreme weather conditions
              using NASA satellite data and climate reanalysis
            </p>
          </header>

          {/* Search Box */}
         <SearchBox/>

          {/* Features */}
          <section className="grid md:grid-cols-3 gap-6 mt-12">
            <Features
              title=" Historical Analysis"
              description="Analyze 30+ years of NASA satellite and reanalysis data"
              icon={Zap}
            />
            <Features
              title="Global Coverage"
              description="Explore weather probabilities for any location worldwide"
              icon={MapPin}
            />
            <Features
              title="Trend Detection"
              description="Identify climate change trends and seasonal patterns"
              icon={Calendar}
            />
          </section>
        </div>
      </section>
    </main>
  );
}
