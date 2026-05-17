'use client';

import { useState } from 'react';
import { findBestRoute, TravelMode, RouteType, RouteResult } from '@/lib/tsp';
import { destinationsList } from '@/lib/data';
import { 
  FaMagic, FaCar, FaTrain, FaMotorcycle, 
  FaBicycle, FaWalking, FaMapMarkerAlt, FaSearch, FaTimes, FaPlus, FaMap, FaChevronDown, FaArrowRight,
  FaClock, FaRoute, FaStar, FaInfoCircle, FaChartBar
} from 'react-icons/fa';

export default function ClientTripPlanner() {
  const [selected, setSelected] = useState<string[]>(['Colombo', 'Kandy', 'Sigiriya']);
  const [mode, setMode] = useState<TravelMode>('DRIVING');
  const [logic, setLogic] = useState<RouteType>('shortest');
  const [result, setResult] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(false);

  const toggleDestination = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter(d => d !== name));
    } else if (selected.length < 15) { // Increased limit
      setSelected([...selected, name]);
    }
  };

  const planTrip = async () => {
    if (selected.length < 3) return;
    setLoading(true);
    try {
      const tripResult = await findBestRoute(selected, mode, logic);
      setResult(tripResult);
      setShowMap(true);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const travelModes = [
    { id: 'DRIVING', label: 'Car', sub: '~50 km/h avg', icon: FaCar, color: 'text-blue-500' },
    { id: 'TRANSIT', label: 'Train', sub: '~40 km/h scenic', icon: FaTrain, color: 'text-green-500' },
    { id: 'TUKTUK', label: 'Tuk Tuk', sub: '~35 km/h fun', customIcon: '/tuk-tuk.png', icon: () => null, color: 'text-yellow-500' },
    { id: 'BICYCLING', label: 'Bike', sub: '~15 km/h active', icon: FaBicycle, color: 'text-purple-500' },
    { id: 'WALKING', label: 'Walk', sub: '~5 km/h short distances', icon: FaWalking, color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col pb-24">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <h1 className="text-xl font-bold text-[#0f2e8a]">SriLankaTripAI</h1>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-[#0f2e8a] border-b-2 border-[#0f2e8a] pb-1">Plan</a>
            <a href="/explore" className="text-gray-500 hover:text-gray-900 pb-1">Explore</a>
            <a href="/saved" className="text-gray-500 hover:text-gray-900 pb-1">Saved</a>
          </nav>
        </div>
        <div className="flex items-center gap-6 text-gray-500">
          <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Logout</button>
        </div>
      </header>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-8 py-8 flex flex-col lg:flex-row gap-12">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
          <div>
            <label className="text-xs font-bold text-gray-800 tracking-wider mb-2 block">STARTING POINT</label>
            <div className="relative">
              <select 
                value={selected[0] || ''}
                onChange={(e) => {
                  const newSelected = [...selected];
                  const existingIdx = newSelected.indexOf(e.target.value);
                  if (existingIdx !== -1) newSelected.splice(existingIdx, 1);
                  newSelected.unshift(e.target.value);
                  setSelected(newSelected);
                }}
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#0f2e8a] focus:ring-1 focus:ring-[#0f2e8a]"
              >
                {destinationsList.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
              <div className="absolute right-4 top-4 text-gray-400 pointer-events-none">
                <FaChevronDown size={12} />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-1 ml-1">Your route will automatically loop back here.</p>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-800 tracking-wider mb-3 block">ROUTING LOGIC</label>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col text-sm">
              <button onClick={() => setLogic('shortest')} className={`px-4 py-3 text-left border-b border-gray-100 ${logic === 'shortest' ? 'bg-[#0f2e8a] text-white font-bold' : 'hover:bg-gray-50'}`}>Shortest Distance</button>
              <button onClick={() => setLogic('longest')} className={`px-4 py-3 text-left border-b border-gray-100 ${logic === 'longest' ? 'bg-[#0f2e8a] text-white font-bold' : 'hover:bg-gray-50'}`}>Scenic / Longest</button>
              <button onClick={() => setLogic('attractions')} className={`px-4 py-3 text-left border-b border-gray-100 ${logic === 'attractions' ? 'bg-[#0f2e8a] text-white font-bold' : 'hover:bg-gray-50'}`}>Maximize Attractions</button>
              <a href={`/compare?cities=${selected.join(',')}`} className="px-4 py-3 text-center bg-gray-50 text-[#0f2e8a] hover:bg-gray-100 font-bold flex items-center justify-center gap-2">
                <FaChartBar /> Compare Your Paths
              </a>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-800 tracking-wider mb-3 block">MODE OF TRAVEL</label>
            <div className="space-y-3">
              {travelModes.map(m => (
                <div 
                  key={m.id} 
                  onClick={() => setMode(m.id as TravelMode)}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${mode === m.id ? 'border-[#0f2e8a] bg-[#f8fafc]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${mode === m.id ? 'border-[#0f2e8a]' : 'border-gray-300'}`}>
                    {mode === m.id && <div className="w-2.5 h-2.5 bg-[#0f2e8a] rounded-full" />}
                  </div>
                  <div className={`text-xl flex items-center justify-center ${mode === m.id ? m.color : 'text-gray-400'}`}>
                    {m.customIcon ? (
                      <img src={m.customIcon} alt={m.label} className={`w-6 h-6 object-contain ${mode === m.id ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale'}`} />
                    ) : (
                      <m.icon />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">{m.label}</div>
                    <div className="text-[11px] text-gray-500">{m.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {!showMap ? (
            <>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-[#0f2e8a] mb-2">Where should we go?</h2>
                <p className="text-gray-600">Select your dream destinations across the pearl of the Indian Ocean.</p>
              </div>

              <div className="relative mb-10">
                <div className="absolute left-4 top-4 text-gray-400">
                  <FaSearch size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search destinations (e.g., Sigiriya, Ella, Galle...)" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-[15px] shadow-sm focus:outline-none focus:border-[#0f2e8a] focus:ring-1 focus:ring-[#0f2e8a]"
                />
              </div>

              {selected.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-gray-800 tracking-wider">CURRENT SELECTION</h3>
                    <button onClick={() => setSelected([])} className="text-sm text-[#0f2e8a] hover:underline font-medium">Clear all</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selected.map(sel => (
                      <div key={sel} className="bg-[#1e3a8a] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                        {sel}
                        <button onClick={() => toggleDestination(sel)} className="hover:text-gray-300 ml-1">
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#0f2e8a]">Destinations</h3>
                  <span className="text-sm text-gray-500 font-medium">Showing {destinationsList.length} places</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {destinationsList.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.region.includes(search.toLowerCase())).map((dest) => (
                    <div key={dest.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
                      <div className="relative h-48">
                        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm capitalize">
                          {dest.region}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h4 className="text-lg font-bold text-gray-800 mb-1">{dest.name}</h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                          <FaClock className="text-gray-400" /> Best time: {dest.bestTimeToVisit.split(' (')[0]}
                        </p>
                        <div className="mb-6 flex-1">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Top Attractions</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {dest.attractions.slice(0, 3).map((attr, idx) => (
                              <li key={idx} className="flex items-start gap-1.5"><div className="w-1 h-1 bg-[#0f2e8a] rounded-full mt-1.5 shrink-0"></div> {attr}</li>
                            ))}
                            {dest.attractions.length > 3 && (
                              <li className="text-gray-400 italic mt-1">+ {dest.attractions.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                        <div className="mt-auto">
                          {selected.includes(dest.name) ? (
                            <button onClick={() => toggleDestination(dest.name)} className="w-full border-2 border-[#0f2e8a] text-[#0f2e8a] hover:bg-blue-50 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                              <FaTimes /> Remove
                            </button>
                          ) : (
                            <button onClick={() => toggleDestination(dest.name)} className="w-full border border-gray-300 text-[#0f2e8a] hover:border-[#0f2e8a] py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                              <FaPlus /> Add to Trip
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-3xl font-bold text-[#0f2e8a]">Your Smart Itinerary</h2>
                 <button onClick={() => setShowMap(false)} className="text-sm font-medium text-gray-500 hover:text-gray-800">
                    ← Edit Destinations
                 </button>
              </div>
              
              {result && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Distance</p>
                    <p className="text-xl font-bold text-[#0f2e8a]">{result.totalDistance} km</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Travel Time</p>
                    <p className="text-xl font-bold text-[#0f2e8a]">{Math.floor(result.travelTime)}h {Math.round((result.travelTime % 1)*60)}m</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Activity Time</p>
                    <p className="text-xl font-bold text-[#0f2e8a]">{result.activityTime} hrs</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Comfort Score</p>
                    <p className="text-xl font-bold text-green-600">{result.comfort}%</p>
                  </div>
                </div>
              )}



              {result && (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Route Details</h3>
                  <div className="space-y-6">
                    {result.route.map((loc, i) => {
                      if (i === result.route.length - 1) {
                        // Loop back to start, handled gracefully
                        return (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-4 h-4 bg-gray-300 rounded-full border-2 border-white ring-2 ring-gray-200"></div>
                            <p className="text-sm font-bold text-gray-500">Return to {loc}</p>
                          </div>
                        );
                      }
                      return (
                        <div key={i} className="relative pl-6">
                          {/* Vertical Line */}
                          <div className="absolute left-1.5 top-5 bottom-[-20px] w-0.5 bg-gray-200 z-0"></div>
                          
                          <div className="relative z-10 flex items-center gap-4 mb-3 -ml-6">
                            <div className="w-3.5 h-3.5 bg-[#0f2e8a] rounded-full border-2 border-white ring-2 ring-[#0f2e8a]"></div>
                            <p className="text-lg font-bold text-gray-900">{loc}</p>
                          </div>
                          
                          {/* Segment info */}
                          <div className="ml-2 mb-6 bg-gray-50 rounded-lg p-3 text-sm text-gray-600 flex items-center gap-6 border border-gray-100">
                            <div className="flex items-center gap-2">
                              <FaRoute className="text-gray-400" />
                              <span>{Math.round(result.segmentDistances[i])} km</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaClock className="text-gray-400" />
                              <span>{Math.floor(result.segmentTimes[i])}h {Math.round((result.segmentTimes[i] % 1)*60)}m</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Bottom Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 px-8 z-50 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div>
          <h4 className="text-[#0f2e8a] font-bold text-[15px]">{selected.length} Destinations Selected</h4>
          {result ? (
            <p className="text-xs text-gray-500 font-medium">Estimated trip duration: {result.totalDays} days</p>
          ) : (
             <p className="text-xs text-gray-500">Select at least 3 destinations to generate itinerary.</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              const cities = result ? result.route.join(',') : selected.join(',');
              window.location.href = `/explore?cities=${cities}`;
            }} 
            className="flex items-center gap-2 text-gray-700 hover:text-black font-medium text-sm px-4 py-2 transition-colors"
          >
            <FaMap /> Map View
          </button>
          <button 
            onClick={planTrip}
            disabled={loading || selected.length < 3}
            className="bg-[#1e3a8a] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 disabled:bg-blue-300 shadow-md"
          >
            {loading ? 'Optimizing...' : 'Generate Smart Itinerary'} <FaMagic />
          </button>
        </div>
      </div>
    </div>
  );
}