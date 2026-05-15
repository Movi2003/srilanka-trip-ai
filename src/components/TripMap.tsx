'use client';

import { GoogleMap, Marker, Polyline, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect, useMemo } from 'react';
import { getDestinationByName } from '@/lib/data';
import { getOsrmRoute } from '@/lib/osrm';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '520px',
  borderRadius: '16px',
};

const defaultCenter = { lat: 7.8731, lng: 80.7718 };

interface TripMapProps {
  places: string[];
  routeOrder: string[];
}

export default function TripMap({ places, routeOrder }: TripMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [pathCoordinates, setPathCoordinates] = useState<google.maps.LatLngLiteral[]>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  // Get exact coords from our data.ts
  const coords = useMemo(() => {
    const map: Record<string, google.maps.LatLngLiteral> = {};
    for (const place of places) {
      const dest = getDestinationByName(place);
      if (dest) {
        map[place] = { lat: dest.latitude, lng: dest.longitude };
      }
    }
    return map;
  }, [places]);

  // Fetch OSRM geometry when route changes
  useEffect(() => {
    const fetchRealRoute = async () => {
      const orderedCoords = routeOrder
        .map(place => coords[place])
        .filter(Boolean);
        
      if (orderedCoords.length < 2) {
        setPathCoordinates(orderedCoords);
        return;
      }

      setLoadingRoute(true);
      const osrmPath = await getOsrmRoute(orderedCoords);
      if (osrmPath) {
        setPathCoordinates(osrmPath);
      } else {
        // Fallback to straight lines if OSRM fails
        setPathCoordinates(orderedCoords);
      }
      setLoadingRoute(false);
    };

    fetchRealRoute();
  }, [routeOrder, coords]);

  // Determine center based on bounds
  const center = useMemo(() => {
    if (pathCoordinates.length > 0) {
      const lats = pathCoordinates.map(p => p.lat);
      const lngs = pathCoordinates.map(p => p.lng);
      return {
        lat: (Math.min(...lats) + Math.max(...lats)) / 2,
        lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
      };
    }
    return defaultCenter;
  }, [pathCoordinates]);

  if (!isLoaded) {
    return <div className="h-full min-h-[520px] bg-gray-100 rounded-2xl flex items-center justify-center">Loading Map...</div>;
  }

  return (
    <div className="relative w-full h-full min-h-[520px]">
      {loadingRoute && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md text-sm font-bold text-[#0f2e8a] flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#0f2e8a] border-t-transparent rounded-full animate-spin"></div>
          Fetching real road routes...
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={pathCoordinates.length > 0 ? 8 : 7.5}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {routeOrder.map((place, index) => {
          const pos = coords[place];
          if (!pos) return null;
          const dest = getDestinationByName(place);

          return (
            <Marker
              key={index}
              position={pos}
              label={{
                text: (index + 1).toString(),
                color: "white",
                fontSize: "14px",
                fontWeight: "bold"
              }}
              title={place}
              onClick={() => setActiveMarker(place)}
            >
              {activeMarker === place && dest && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="p-2 max-w-[200px] text-gray-800">
                    <h3 className="font-bold text-base mb-1 text-[#0f2e8a]">{dest.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 font-medium">{dest.attractions.length} Attractions</p>
                    <ul className="text-xs space-y-1 mb-1">
                      {dest.attractions.slice(0, 3).map((attr, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 shrink-0"></div> {attr}
                        </li>
                      ))}
                    </ul>
                    {dest.attractions.length > 3 && (
                      <p className="text-[10px] text-gray-400 italic mt-1">+{dest.attractions.length - 3} more to explore</p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}

        {pathCoordinates.length > 1 && (
          <Polyline
            path={pathCoordinates}
            options={{
              strokeColor: "#0f2e8a",
              strokeWeight: 5,
              strokeOpacity: 0.8,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}