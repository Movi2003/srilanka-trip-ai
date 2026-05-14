'use client';

import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect, useMemo } from 'react';

const containerStyle = {
  width: '100%',
  height: '520px',
  borderRadius: '16px',
};

const center = { lat: 7.8731, lng: 80.7718 };

interface TripMapProps {
  places: string[];
  routeOrder: string[];
}

export default function TripMap({ places, routeOrder }: TripMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],   // Important: Load Places library
  });

  const [coords, setCoords] = useState<Record<string, google.maps.LatLngLiteral>>({});

  // Fetch coordinates
  useEffect(() => {
    if (!isLoaded || !places.length || !window.google) return;

    const fetchCoords = async () => {
      const newCoords = { ...coords };

      for (const place of places) {
        if (newCoords[place]) continue;

        try {
          const service = new google.maps.places.PlacesService(document.createElement('div'));

          await new Promise<void>((resolve) => {
            service.findPlaceFromQuery(
              {
                query: `${place}, Sri Lanka`,
                fields: ['geometry']
              },
              (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]?.geometry?.location) {
                  newCoords[place] = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                  };
                }
                resolve();
              }
            );
          });
        } catch (e) {
          console.warn(`Could not find coordinates for: ${place}`);
        }
      }

      setCoords(newCoords);
    };

    fetchCoords();
  }, [places, isLoaded]);

  const path = useMemo(() => {
    return routeOrder
      .map(place => coords[place])
      .filter((pos): pos is google.maps.LatLngLiteral => !!pos);
  }, [routeOrder, coords]);

  if (!isLoaded) {
    return <div className="h-[520px] bg-gray-100 rounded-2xl flex items-center justify-center">Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7.5}
    >
      {routeOrder.map((place, index) => {
        const pos = coords[place];
        if (!pos) return null;

        return (
          <Marker
            key={index}
            position={pos}
            label={{
              text: (index + 1).toString(),
              color: "white",
              fontSize: "16px",
              fontWeight: "bold"
            }}
            title={place}
          />
        );
      })}

      {path.length > 1 && (
        <Polyline
          path={path}
          options={{
            strokeColor: "#2563eb",
            strokeWeight: 6,
            strokeOpacity: 0.85,
          }}
        />
      )}
    </GoogleMap>
  );
}