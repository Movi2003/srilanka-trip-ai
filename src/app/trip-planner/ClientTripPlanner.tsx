'use client';

import { useState } from 'react';
import TripMap from '@/components/TripMap';
import { findBestRoute } from '@/lib/tsp';
import { loadGoogleMaps } from '@/lib/google';
import { 
  FaMagic, FaBell, FaUserCircle, FaCar, FaTrain, FaMotorcycle, 
  FaBicycle, FaWalking, FaMapMarkerAlt, FaSearch, FaTimes, FaPlus, FaMap, FaChevronDown, FaArrowRight
} from 'react-icons/fa';

const recommendedDestinations = [
  { name: "Sigiriya", location: "Matale District", rating: "9.8", img: "https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=800&auto=format&fit=crop" },
  { name: "Ella", location: "Badulla District", rating: "9.5", img: "https://images.unsplash.com/photo-1578335029315-7cb6fb8bbbc8?q=80&w=800&auto=format&fit=crop" },
  { name: "Mirissa", location: "Matara District", rating: "9.2", img: "https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=800&auto=format&fit=crop" },
  { name: "Colombo", location: "Colombo District", rating: "8.5", img: "https://images.unsplash.com/photo-1620023616858-a47738b58434?q=80&w=800&auto=format&fit=crop" },
  { name: "Kandy", location: "Kandy District", rating: "9.0", img: "https://images.unsplash.com/photo-1596541620478-f3b392a27ffb?q=80&w=800&auto=format&fit=crop" },
  { name: "Nuwara Eliya", location: "Nuwara Eliya District", rating: "9.4", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop" }
];

type TravelMode = 'DRIVING' | 'TRANSIT' | 'BICYCLING' | 'WALKING' | 'TUKTUK';
type RouteResult = {
  route: string[];
  totalDistance: number;
  segmentDistances: number[];
};

export default function ClientTripPlanner() {
  const [selected, setSelected] = useState<string[]>(['Colombo', 'Kandy', 'Nuwara Eliya']);
  const [mode, setMode] = useState<TravelMode>('DRIVING');
  const [result, setResult] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [showMap, setShowMap] = useState(false);

  const toggleDestination = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter(d => d !== name));
    } else if (selected.length < 10) {
      setSelected([...selected, name]);
    }
  };

  const planTrip = async () => {
    if (selected.length < 3) return;
    setLoading(true);
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
      setShowMap(true); // show map after optimization
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
          <h1 className="text-xl font-bold text-[#0f2e8a]">VoyageAI</h1>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-[#0f2e8a] border-b-2 border-[#0f2e8a] pb-1">Plan</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 pb-1">Explore</a>
            <a href="#" className="text-gray-500 hover:text-gray-900 pb-1">Saved</a>
          </nav>
        </div>
        <div className="flex items-center gap-6 text-gray-500">
          <button className="hover:text-gray-900"><FaBell size={20} /></button>
          <button className="hover:text-gray-900"><FaUserCircle size={24} /></button>
        </div>
      </header>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-8 py-8 flex flex-col lg:flex-row gap-12">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
          <div>
            <label className="text-xs font-bold text-gray-800 tracking-wider mb-2 block">STARTING POINT</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#0f2e8a] focus:ring-1 focus:ring-[#0f2e8a]">
                <option>Nalanda</option>
                <option>Colombo</option>
                <option>Negombo</option>
              </select>
              <div className="absolute right-4 top-4 text-gray-400 pointer-events-none">
                <FaChevronDown size={12} />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-800 tracking-wider mb-2 block">START DATE</label>
              <input type="date" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#0f2e8a] focus:ring-1 focus:ring-[#0f2e8a]"/>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-800 tracking-wider mb-2 block">END DATE</label>
              <input type="date" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#0f2e8a] focus:ring-1 focus:ring-[#0f2e8a]"/>
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
                  <h3 className="text-2xl font-bold text-[#0f2e8a]">Recommended for you</h3>
                  <button className="text-sm text-[#0f2e8a] hover:underline font-medium flex items-center gap-1">
                    View all regions <FaArrowRight size={12} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedDestinations.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).map((dest, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col">
                      <div className="relative h-48">
                        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 bg-[#059669] text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                          <FaMapMarkerAlt size={10} /> {dest.rating}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h4 className="text-lg font-bold text-gray-800 mb-1">{dest.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mb-6">
                          <FaMapMarkerAlt size={12} className="text-gray-400" /> {dest.location}
                        </p>
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
                 <h2 className="text-3xl font-bold text-[#0f2e8a]">Your Optimized Route</h2>
                 <button onClick={() => setShowMap(false)} className="text-sm font-medium text-gray-500 hover:text-gray-800">
                    ← Back to Planning
                 </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 h-[600px] flex-1">
                {result ? (
                  <TripMap places={result.route} routeOrder={result.route} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Loading map...
                  </div>
                )}
              </div>
              {result && (
                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                  <div>
                     <p className="text-sm text-gray-500 font-medium">Total Distance</p>
                     <p className="text-2xl font-bold text-[#0f2e8a]">{(result.totalDistance / 1000).toFixed(1)} km</p>
                  </div>
                  <div>
                     <p className="text-sm text-gray-500 font-medium">Travel Mode</p>
                     <p className="text-2xl font-bold text-[#0f2e8a] capitalize">{mode.toLowerCase()}</p>
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
          <p className="text-xs text-gray-500">Estimated duration: {selected.length * 2}-{(selected.length * 2) + 3} days</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.href = '/explore'} 
            className="flex items-center gap-2 text-gray-700 hover:text-black font-medium text-sm px-4 py-2 transition-colors"
          >
            <FaMap /> View Map
          </button>
          <button 
            onClick={planTrip}
            disabled={loading || selected.length < 3}
            className="bg-[#1e3a8a] hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 disabled:bg-blue-300 shadow-md"
          >
            {loading ? 'Optimizing...' : 'Optimize Route'} <FaMagic />
          </button>
        </div>
      </div>
    </div>
  );
}