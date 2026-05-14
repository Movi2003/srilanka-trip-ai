'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TripMap from '@/components/TripMap';
import { FaBell, FaUserCircle, FaSearch, FaChartBar, FaSave, FaMapMarkerAlt, FaSun, FaLayerGroup, FaUsers, FaPlus, FaMinus, FaCrosshairs } from 'react-icons/fa';

export default function ExploreMap() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // Mock route from Colombo -> Kandy -> Sigiriya -> Galle
  const currentRoute = ['Colombo', 'Kandy', 'Sigiriya', 'Galle'];
  
  const handleSaveTrip = async () => {
    setSaving(true);
    try {
      await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Custom Explorer Trip',
          rating: 9.4,
          stops: currentRoute.length,
          distance: 482,
          img: 'https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop'
        })
      });
      router.push('/saved');
    } catch (e) {
      console.error(e);
      setSaving(false);
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between z-50 flex-shrink-0">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-xl font-bold text-[#0f2e8a]">SriLankaTripAI</Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/trip-planner" className="text-gray-500 hover:text-gray-900 pb-1">Plan</Link>
            <Link href="/explore" className="text-[#0f2e8a] border-b-2 border-[#0f2e8a] pb-1">Explore</Link>
            <Link href="/saved" className="text-gray-500 hover:text-gray-900 pb-1">Saved</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6 text-gray-500">
          <div className="relative hidden md:block">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <input type="text" placeholder="Search destinations..." className="bg-gray-100 border-transparent rounded-full pl-9 pr-4 py-2 text-sm focus:bg-white focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0f2e8a]" />
          </div>
          <button className="hover:text-gray-900"><FaBell size={20} /></button>
          <button className="hover:text-gray-900"><FaUserCircle size={24} /></button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 overflow-y-auto">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-[#0f2e8a] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">Colombo, Kandy, Sigiriya, Galle</h3>
                <p className="text-xs text-gray-500">Current Trip Plan</p>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/compare" className="w-full bg-[#0f2e8a] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                <FaChartBar /> Compare Routes
              </Link>
              <button onClick={handleSaveTrip} disabled={saving} className="w-full bg-white border-2 border-[#0f2e8a] text-[#0f2e8a] hover:bg-blue-50 font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                <FaSave /> {saving ? 'Saving...' : 'Save Trip'}
              </button>
            </div>
          </div>

          <div className="p-6 flex-1">
            <h4 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Current Progress</h4>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[5px] top-3 bottom-3 w-[2px] bg-gray-200"></div>
              
              <div className="space-y-8">
                {/* Colombo */}
                <div className="relative flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#0f2e8a] rounded-full z-10 border-2 border-white shadow-sm ring-2 ring-[#0f2e8a]"></div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Colombo</p>
                      <p className="text-xs text-gray-500">Starting Point</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                       <span>◎</span> 98
                    </div>
                  </div>
                </div>

                {/* Kandy */}
                <div className="relative flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#0f2e8a] rounded-full z-10 border-2 border-white shadow-sm ring-2 ring-[#0f2e8a]"></div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Kandy</p>
                      <p className="text-xs text-gray-500">Cultural Hub</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                       <span>🚘</span> 85
                    </div>
                  </div>
                </div>

                {/* Sigiriya */}
                <div className="relative flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#0f2e8a] rounded-full z-10 border-2 border-white shadow-sm ring-2 ring-[#0f2e8a]"></div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Sigiriya</p>
                      <p className="text-xs text-gray-500">Ancient Fortress</p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                       <span>🚶</span> 92
                    </div>
                  </div>
                </div>

                {/* Galle */}
                <div className="relative flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#0f2e8a] rounded-full z-10 border-2 border-white shadow-sm ring-2 ring-[#0f2e8a]"></div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">Galle</p>
                      <p className="text-xs text-gray-500">Coastal Fort</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                       <span>☀️</span> 96
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-[#e5e7eb]">
          <TripMap places={currentRoute} routeOrder={currentRoute} />

          {/* Floating Stats */}
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-5 flex items-center gap-8 z-10">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Distance</p>
              <p className="text-2xl font-bold text-[#0f2e8a]">482 km</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Travel Time</p>
              <p className="text-2xl font-bold text-[#0f2e8a]">11h 45m</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Average Comfort</p>
              <p className="text-2xl font-bold text-green-600">94%</p>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-4 z-10">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
              <button className="p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-b border-gray-100"><FaPlus /></button>
              <button className="p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900"><FaMinus /></button>
            </div>
            <button className="bg-white rounded-xl shadow-md border border-gray-100 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <FaCrosshairs />
            </button>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col mt-2">
              <button className="p-3 text-[#0f2e8a] hover:bg-gray-50 border-b border-gray-100"><FaLayerGroup /></button>
              <button className="p-3 text-gray-600 hover:bg-gray-50 border-b border-gray-100"><FaSun /></button>
              <button className="p-3 text-gray-600 hover:bg-gray-50"><FaUsers /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
