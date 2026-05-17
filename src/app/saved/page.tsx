'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TripMap from '@/components/TripMap';
import { FaBell, FaUserCircle, FaSearch, FaFilter, FaPlus, FaTrash, FaMapMarkerAlt, FaRoute, FaCog, FaTrain, FaCar, FaWalking } from 'react-icons/fa';

export default function SavedRoutes() {
  const [trips, setTrips] = useState<any[]>([]);

  const fetchTrips = () => {
    fetch('/api/trips')
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/trips?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTrips();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-xl font-bold text-[#0f2e8a]">SriLankaTripAI</Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/trip-planner" className="text-gray-500 hover:text-gray-900 pb-1">Plan</Link>
            <Link href="/explore" className="text-gray-500 hover:text-gray-900 pb-1">Explore</Link>
            <Link href="/saved" className="text-[#0f2e8a] border-b-2 border-[#0f2e8a] pb-1">Saved</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6 text-gray-500">
          <div className="relative hidden md:block">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input type="text" placeholder="Search routes..." className="bg-gray-100 border-transparent rounded-full pl-9 pr-4 py-2 text-sm focus:bg-white focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0f2e8a]" />
          </div>
          <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Saved Routes</h1>
            <p className="text-gray-600 text-lg">Manage and explore your curated Sri Lankan itineraries.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors border border-gray-200">
              <FaFilter size={12} /> Filter
            </button>
            <Link href="/trip-planner" className="flex items-center gap-2 bg-[#0f2e8a] hover:bg-blue-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
              <FaPlus size={12} /> New Route
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, i) => (
            <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col">
              <div className="relative h-56 bg-gray-100">
                {trip.route ? (
                  <div className="absolute inset-0 z-0">
                    <TripMap places={trip.route} routeOrder={trip.route} />
                  </div>
                ) : (
                  <img src={trip.img} alt={trip.title} className="w-full h-full object-cover relative z-0" />
                )}
                <div className="absolute top-4 right-4 bg-white text-gray-900 text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm z-10">
                  {i % 3 === 0 ? <FaCar className="text-blue-500" /> : i % 3 === 1 ? <FaTrain className="text-green-500" /> : <FaWalking className="text-red-500" />} {trip.rating}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{trip.title}</h3>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" /> {trip.stops} Stops
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRoute className="text-gray-400" /> {trip.distance} km
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <button onClick={() => handleDelete(trip.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                    <FaTrash />
                  </button>
                  <Link href={`/explore?cities=${trip.route?.join(',') || ''}`} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-6 py-2 rounded-lg text-sm font-bold transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* New Route Card */}
          <Link href="/trip-planner" className="rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#0f2e8a] hover:bg-indigo-50/30 transition-colors flex flex-col items-center justify-center p-8 min-h-[400px] text-center group bg-gray-50/50">
            <div className="w-16 h-16 bg-indigo-100 text-[#0f2e8a] rounded-full flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              <FaPlus />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Plan New Route</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Let AI generate a customized itinerary based on your preferences.
            </p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-1">SriLankaTripAI</h4>
            <p className="text-xs text-gray-500">© 2024 SriLankaTripAI. Your Knowledgeable Local Guide.</p>
          </div>
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            <Link href="#" className="hover:text-gray-900">About Sri Lanka</Link>
            <Link href="#" className="hover:text-gray-900">Travel Guides</Link>
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
