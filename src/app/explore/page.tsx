'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import TripMap from '@/components/TripMap';
import { getDestinationByName } from '@/lib/data';
import { getWeatherForLocation } from '@/lib/weather';
import { findBestRoute, RouteType } from '@/lib/tsp';
import { FaBell, FaUserCircle, FaSearch, FaChartBar, FaSave, FaMapMarkerAlt, FaSun, FaLayerGroup, FaUsers, FaPlus, FaMinus, FaCrosshairs, FaShareAlt, FaStar } from 'react-icons/fa';

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);
  
  const citiesParam = searchParams.get('cities');
  const logicParam = searchParams.get('logic') as RouteType;
  const initialCities = citiesParam ? citiesParam.split(',') : ['Colombo', 'Kandy', 'Sigiriya', 'Galle'];
  
  const [currentRoute, setCurrentRoute] = useState<string[]>(initialCities);

  useEffect(() => {
    if (citiesParam && logicParam) {
      const uniqueCities = Array.from(new Set(citiesParam.split(',')));
      findBestRoute(uniqueCities, 'DRIVING', logicParam).then(res => {
        if (res && res.route && res.route.length > 0) {
          setCurrentRoute(res.route);
        }
      });
    } else if (citiesParam) {
      setCurrentRoute(citiesParam.split(','));
    }
  }, [citiesParam, logicParam]);

  const destinations = currentRoute.map(c => getDestinationByName(c)).filter(Boolean);

  const handleSaveTrip = async () => {
    setSaving(true);
    
    const tripData = {
      title: `${currentRoute.length} Destinations Trip`,
      rating: 9.0, // arbitrary
      stops: currentRoute.length,
      distance: currentRoute.length * 50, // arbitrary estimate
      img: destinations[0]?.img || 'https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop',
      route: currentRoute
    };

    try {
      await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData)
      });
    } catch (e) {
      console.error('Failed to save trip', e);
    }
    
    router.push('/saved');
  };

  const handleShareTrip = async () => {
    setSharing(true);
    // Simulate Supabase share link generation
    await new Promise(r => setTimeout(r, 600));
    alert('Trip shared successfully! Link copied to clipboard.');
    setSharing(false);
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
          <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Logout</button>
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
                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">{currentRoute.length} Destinations</h3>
                <p className="text-xs text-gray-500">Current Trip Plan</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={handleSaveTrip} disabled={saving} className="flex-1 bg-[#0f2e8a] text-white hover:bg-blue-900 font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                  <FaSave /> {saving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={handleShareTrip} disabled={sharing} className="flex-1 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                  <FaShareAlt /> {sharing ? '...' : 'Share'}
                </button>
              </div>
              <Link href={`/compare?cities=${currentRoute.join(',')}`} className="w-full bg-white border-2 border-[#0f2e8a] text-[#0f2e8a] hover:bg-blue-50 font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                <FaChartBar /> Compare Routes
              </Link>
            </div>
          </div>

          <div className="p-6 flex-1">
            <h4 className="text-xs font-bold text-gray-400 tracking-wider mb-6 uppercase">Itinerary Weather & Details</h4>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[5px] top-3 bottom-3 w-[2px] bg-gray-200"></div>
              
              <div className="space-y-8">
                {destinations.map((dest, i) => {
                  const weather = getWeatherForLocation(dest!, new Date());
                  
                  return (
                    <div key={i} className="relative flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-[#0f2e8a] rounded-full z-10 border-2 border-white shadow-sm ring-2 ring-[#0f2e8a] shrink-0"></div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{dest!.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{dest!.region}</p>
                          </div>
                          <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 ${weather.condition === 'Sunny' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                            <span>{weather.icon}</span> {weather.temperature}
                          </div>
                        </div>
                      </div>
                      <div className="ml-7 bg-gray-50 p-2 rounded text-xs text-gray-600">
                        {dest!.attractions[0]} &bull; {dest!.attractions[1]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-[#e5e7eb]">
          <TripMap places={currentRoute} routeOrder={currentRoute} />

          {/* Map Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-4 z-10">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col mt-2">
              <button className="p-3 text-gray-600 hover:bg-gray-50 border-b border-gray-100" title="Community Reviews"><FaStar /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExploreMap() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
