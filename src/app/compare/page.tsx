'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaSearch, FaCar, FaWalking, FaStar, FaBrain, FaArrowRight, FaMapMarkerAlt, FaClock, FaRoute, FaMountain, FaLandmark, FaBolt } from 'react-icons/fa';

function CompareContent() {
  const searchParams = useSearchParams();
  const cities = searchParams.get('cities') || 'Colombo,Ella';

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col pb-32">
      {/* Top Navbar */}
      <header className="bg-white px-8 py-4 flex items-center justify-between z-50 flex-shrink-0">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-xl font-bold text-[#0f2e8a]">SriLankaTripAI</Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/trip-planner" className="text-gray-500 hover:text-gray-900 pb-1">Plan</Link>
            <Link href="/explore" className="text-[#0f2e8a] border-b-2 border-[#0f2e8a] pb-1">Explore</Link>
            <Link href="/saved" className="text-gray-500 hover:text-gray-900 pb-1">Saved</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6 text-gray-500">
          <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-8 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Compare Your Paths</h1>
          <p className="text-gray-600 text-lg">We've analyzed three distinct routes from <span className="font-bold text-[#0f2e8a]">Colombo</span> to <span className="font-bold text-[#0f2e8a]">Ella</span>. Choose the logic that fits your journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Shortest */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
            <div className="relative h-48">
              <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop" alt="Highway" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#0f2e8a] text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <FaBolt className="text-yellow-500" /> Fastest
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Shortest</h3>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Comfort</p>
                  <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-sm font-bold flex items-center gap-1">
                    <FaCar size={12} /> 82
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 text-sm mb-8">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaClock className="text-gray-400" /> Total Time</span>
                  <span className="font-bold text-gray-900">4h 15m</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaRoute className="text-gray-400" /> Distance</span>
                  <span className="font-bold text-gray-900">215 km</span>
                </div>
                <div className="flex items-center justify-between pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400" /> Key POIs</span>
                  <span className="font-bold text-gray-900">2 Locations</span>
                </div>
              </div>

              <div className="mt-auto">
                <Link href={`/explore?cities=${cities}&logic=shortest`} className="w-full bg-[#0f2e8a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  Select This Route <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Scenic */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-[#0f2e8a] flex flex-col relative transform md:-translate-y-2">
            <div className="absolute top-0 left-0 bg-[#0f2e8a] text-white text-[10px] font-bold px-3 py-1 rounded-br-lg z-10 uppercase tracking-wider">
              AI Recommended
            </div>
            <div className="relative h-48">
              <img src="https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop" alt="Coastline" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#0f2e8a] text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <FaMountain className="text-green-600" /> Scenic
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Scenic</h3>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Comfort</p>
                  <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-sm font-bold flex items-center gap-1">
                    <FaMountain size={12} /> 95
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 italic mb-6">"Breathtaking views of the Southern Coastline and central tea plantations."</p>

              <div className="space-y-4 text-sm mb-8">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaClock className="text-gray-400" /> Total Time</span>
                  <span className="font-bold text-gray-900">5h 45m</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaRoute className="text-gray-400" /> Distance</span>
                  <span className="font-bold text-gray-900">280 km</span>
                </div>
                <div className="flex items-center justify-between pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400" /> Key POIs</span>
                  <span className="font-bold text-gray-900">6 Locations</span>
                </div>
              </div>

              <div className="mt-auto">
                <Link href={`/explore?cities=${cities}&logic=longest`} className="w-full bg-[#0f2e8a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-900/20">
                  Select This Route <FaStar size={12} className="text-yellow-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Longest */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
            <div className="relative h-48">
              <img src="https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop" alt="Ruins" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#0f2e8a] text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <FaLandmark className="text-purple-600" /> Cultural
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Longest</h3>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Comfort</p>
                  <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-sm font-bold flex items-center gap-1">
                    <FaWalking size={12} /> 74
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 text-sm mb-8">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaClock className="text-gray-400" /> Total Time</span>
                  <span className="font-bold text-gray-900">7h 20m</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaRoute className="text-gray-400" /> Distance</span>
                  <span className="font-bold text-gray-900">255 km</span>
                </div>
                <div className="flex items-center justify-between pb-3">
                  <span className="text-gray-500 flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400" /> Key POIs</span>
                  <span className="font-bold text-gray-900">12 Locations</span>
                </div>
              </div>

              <div className="mt-auto">
                <Link href={`/explore?cities=${cities}&logic=attractions`} className="w-full bg-[#0f2e8a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  Select This Route <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Summary Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] bg-[#f8fafc] border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 z-40">
        <div className="w-16 h-16 bg-[#1e3a8a] text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
          <FaBrain size={28} />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-1">Smart Analysis Summary</h4>
          <p className="text-sm text-gray-600">
            Our ML models suggest the <span className="font-bold text-[#0f2e8a]">Scenic Route</span> as it provides the highest comfort-to-experience ratio based on current road conditions and weather forecasts for the Ella mountain range.
          </p>
        </div>
        <div className="flex items-center gap-8 pl-6 border-l border-gray-200 shrink-0">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#0f2e8a]">84%</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Efficiency</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#059669]">92%</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompareRoutes() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
