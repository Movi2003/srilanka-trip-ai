import Link from 'next/link';
import { FaArrowRight, FaMapMarkedAlt, FaSmile, FaWifi, FaShareAlt, FaCommentAlt } from 'react-icons/fa';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative h-[800px] w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=2000&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Gradient overlay for blending */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-white">
          <div className="text-2xl font-bold">LankaAI</div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/login" className="hover:text-gray-200 transition-colors">Login</Link>
            <Link href="/trip-planner" className="bg-[#0f2e8a] hover:bg-blue-900 text-white px-6 py-2.5 rounded-full transition-colors">
              Plan My Trip
            </Link>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
              <span className="text-[#a5b4fc]">✨</span> Next-Gen Travel Planning
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Optimize Your Sri Lankan <br />Adventure with AI
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              Experience the pearl of the Indian Ocean with data-driven itineraries that optimize for travel time, comfort, and local seasonal patterns.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/trip-planner" className="bg-[#0f2e8a] hover:bg-blue-900 text-white px-8 py-3.5 rounded-xl font-bold transition-colors flex items-center gap-2">
                Plan Your Trip <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Floating Card */}
          <div className="hidden lg:block bg-white/80 backdrop-blur-xl border border-white/40 p-6 rounded-3xl w-80 text-gray-800 shadow-2xl mt-12">
            <div className="flex justify-between items-start mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Optimization</p>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Live Data</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
                <FaMapMarkedAlt />
              </div>
              <div>
                <p className="font-bold">Kandy to Ella</p>
                <p className="text-xs text-gray-500">Scenic Route Optimized</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">⏱️ Time Saved</span>
                <span className="font-bold text-green-600">2.5 Hours</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500 flex items-center gap-2">😊 Comfort Score</span>
                  <span className="font-bold text-[#0f2e8a]">94/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-[#0f2e8a] h-1.5 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-white max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[#0f2e8a] mb-4">Intelligent Features for Modern Explorers</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16">
          Our AI engines process millions of data points to ensure your journey is seamless, sustainable, and spectacular.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-6">
              <FaMapMarkedAlt />
            </div>
            <h3 className="text-xl font-bold text-[#0f2e8a] mb-3">Route Optimization</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Dynamic routing that accounts for real-time traffic, train schedules, and terrain conditions to maximize your time on the ground.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl mb-6">
              <FaSmile />
            </div>
            <h3 className="text-xl font-bold text-[#0f2e8a] mb-3">Comfort Scoring</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Proprietary algorithms rank accommodations and transport based on humidity, crowd levels, and traveler feedback.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl mb-6">
              <FaWifi />
            </div>
            <h3 className="text-xl font-bold text-[#0f2e8a] mb-3">Real-time Data</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Instant alerts for weather shifts, local festival delays, and park availability integrated directly into your live itinerary.
            </p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-xl">
          <div className="bg-[#1e3a8a] text-white p-16 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-12">How LankaAI Works</h2>

            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="font-bold mb-2">Define Your Vibe</h3>
                  <p className="text-sm text-blue-200">Tell us your pace, budget, and interests—from ancient ruins to surf breaks.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="font-bold mb-2">AI Computation</h3>
                  <p className="text-sm text-blue-200">Our neural networks simulate 10,000+ route variations to find your perfect match.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="font-bold mb-2">Navigate Locally</h3>
                  <p className="text-sm text-blue-200">Receive a mobile-ready interactive dashboard with live updates and booking links.</p>
                </div>
              </div>
            </div>

            <button className="mt-12 bg-[#059669] hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition-colors w-max">
              Start Your Simulation
            </button>
          </div>
          <div
            className="md:w-1/2 min-h-[400px] bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2000&auto=format&fit=crop')" }}
          ></div>
        </div>
      </section>

      {/* Curated Destinations */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0f2e8a] mb-2">Curated Destinations</h2>
              <p className="text-gray-500">Popular spots optimized by our AI this week.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Mirissa Coast", subtitle: "Best for Sunset & Surf", rating: "9.8", img: "https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop" },
              { title: "Galle Fort", subtitle: "Historical Heritage", rating: "9.5", img: "https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop" },
              { title: "Ella Highlands", subtitle: "Adventure & Tea Gardens", rating: "9.9", img: "https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop" },
              { title: "Yala National Park", subtitle: "Wildlife Safari", rating: "9.2", img: "https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop" }
            ].map((dest, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md z-10 flex items-center gap-1 text-gray-800">
                    <span className="text-green-500">★</span> {dest.rating}
                  </div>
                  <img src={dest.img} alt={dest.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0f2e8a] mb-1">{dest.title}</h3>
                  <p className="text-xs text-gray-500">{dest.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-gray-500">
            <span className="font-bold text-gray-800 text-lg">LankaAI</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <span>© 2024 LankaAI Travel. AI-Optimized Sri Lankan Experiences.</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-800">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-800">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-800">Contact Support</Link>
            <Link href="#" className="hover:text-gray-800">Press Kit</Link>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <button className="hover:text-gray-800 transition-colors"><FaShareAlt /></button>
            <button className="hover:text-gray-800 transition-colors"><FaCommentAlt /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}