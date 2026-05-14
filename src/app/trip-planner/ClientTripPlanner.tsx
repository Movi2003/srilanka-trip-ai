'use client';

import { useState } from 'react';
import TripMap from '@/components/TripMap';
import { findBestRoute } from '@/lib/tsp';
import { loadGoogleMaps } from '@/lib/google';
import { FaMagic, FaTrash, FaSave } from 'react-icons/fa';

const destinationsList = [
  { name: "Colombo", time: "180min" },
  { name: "Kandy", time: "120min" },
  { name: "Galle Fort", time: "120min" },
  { name: "Sigiriya Rock Fortress", time: "180min" },
  { name: "Ella", time: "150min" },
  { name: "Nuwara Eliya", time: "120min" },
  { name: "Mirissa Beach", time: "120min" }
];

type TravelMode = 'DRIVING' | 'TRANSIT' | 'BICYCLING' | 'WALKING' | 'TUKTUK';
type RouteResult = {
  route: string[];
  totalDistance: number;
  segmentDistances: number[];
};

export default function ClientTripPlanner() {
  const [selected, setSelected] = useState<string[]>([]);
  const [mode, setMode] = useState<TravelMode>('DRIVING');
  const [result, setResult] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const toggleDestination = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter(d => d !== name));
    } else if (selected.length < 10) {
      setSelected([...selected, name]);
    }
  };

  const planTrip = async () => {
    if (selected.length < 3) {
      setErrorMsg("Please select at least 3 destinations!");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await loadGoogleMaps();

      const modeMap: any = {
        DRIVING: google.maps.TravelMode.DRIVING,
        TRANSIT: google.maps.TravelMode.TRANSIT,
        BICYCLING: google.maps.TravelMode.BICYCLING,
        WALKING: google.maps.TravelMode.WALKING,
        TUKTUK: google.maps.TravelMode.DRIVING,
      };

      const tripResult = await findBestRoute(selected, modeMap[mode], 'shortest');
      setResult(tripResult);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to calculate route. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredDestinations = destinationsList.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600">SriLankaTripAI</h1>
          <p className="text-sm text-gray-500">Welcome, movinduabhishek@gmail.com</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors">
          Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        {/* Left Panel - Destinations & Saved Trips */}
        <div className="lg:col-span-4 space-y-6">
          {/* Select Destinations */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span className="text-blue-500">📍</span> Select Destinations
            </h2>
            
            <input 
              type="text" 
              placeholder="Search locations..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="max-h-80 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
              {filteredDestinations.map((place) => (
                <label
                  key={place.name}
                  className="flex items-center justify-between py-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(place.name)}
                      onChange={() => toggleDestination(place.name)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="font-medium text-sm text-gray-800">{place.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{place.time}</span>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-3">
                Selected: {selected.length} locations
              </p>
              <div className="space-y-3">
                <button
                  onClick={planTrip}
                  disabled={loading || selected.length < 3}
                  className="w-full bg-[#3b82f6] hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FaMagic /> Optimize Route
                </button>
                <button
                  onClick={() => setSelected([])}
                  className="w-full bg-[#64748b] hover:bg-slate-600 text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FaTrash /> Clear All
                </button>
              </div>
            </div>
            {errorMsg && <p className="text-red-500 mt-4 text-sm text-center">{errorMsg}</p>}
          </div>

          {/* Saved Trips */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800 mb-4">
              <span className="text-green-500">📄</span> Saved Trips
            </h2>
            <p className="text-sm text-gray-500">No saved trips yet</p>
          </div>
        </div>

        {/* Right Panel - Map & Stats */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                <span className="text-blue-500">↗️</span> Route Map
              </h2>
              <button className="bg-[#22c55e] hover:bg-green-600 transition-colors text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm">
                <FaSave /> Save Trip
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              {result ? (
                <TripMap places={result.route} routeOrder={result.route} />
              ) : (
                <div className="h-[400px] flex items-center justify-center text-gray-500 text-sm">
                  Select destinations and click "Optimize Route" to see the map
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-gray-800">
              <span className="text-blue-500">⏱️</span> Trip Statistics
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#f0f9ff] rounded-xl p-5 border border-[#e0f2fe]">
                <p className="text-gray-500 text-sm font-medium mb-1">Total Distance</p>
                <p className="text-2xl font-bold text-blue-600">
                  {result ? (result.totalDistance / 1000).toFixed(1) + ' km' : '-'}
                </p>
              </div>
              <div className="bg-[#f0fdf4] rounded-xl p-5 border border-[#dcfce7]">
                <p className="text-gray-500 text-sm font-medium mb-1">Travel Time</p>
                <p className="text-2xl font-bold text-green-600">
                  {result ? '3h 19m' : '-'} {/* Placeholder since we don't have exact travel time yet */}
                </p>
              </div>
              <div className="bg-[#faf5ff] rounded-xl p-5 border border-[#f3e8ff]">
                <p className="text-gray-500 text-sm font-medium mb-1">Visit Time</p>
                <p className="text-2xl font-bold text-purple-600">
                  {result ? '9h 30m' : '-'} {/* Placeholder based on design */}
                </p>
              </div>
            </div>

            {result && (
              <div className="mt-8">
                <h3 className="text-[15px] font-bold text-gray-800 mb-4">Optimized Itinerary</h3>
                <div className="space-y-3">
                  {result.route.map((place, index) => {
                    const destination = destinationsList.find(d => d.name === place) || { time: '120min' };
                    // Mock comfort scores based on design
                    let comfort = 85;
                    let comfortColor = "text-green-600";
                    if (place === "Colombo") { comfort = 69; comfortColor = "text-yellow-600"; }
                    if (place === "Kandy") { comfort = 12; comfortColor = "text-red-600"; }
                    if (place === "Nuwara Eliya") { comfort = 91; comfortColor = "text-green-600"; }
                    if (place === "Ella") { comfort = 89; comfortColor = "text-green-600"; }

                    return (
                      <div key={index} className="flex items-center justify-between bg-[#f1f5f9] rounded-xl p-4 border border-gray-200/60">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{place}</p>
                            <p className="text-xs text-gray-500">Duration: {destination.time.replace('min', ' minutes')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">Comfort</p>
                          <p className={`text-sm font-bold ${comfortColor}`}>{comfort}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}