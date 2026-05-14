// lib/google.ts
'use client';   // ← This is important

import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!apiKey) {
  console.warn('⚠️ Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
}

// Lazy loading - only run in browser
let mapsLibraryPromise: Promise<any> | null = null;
let placesLibraryPromise: Promise<any> | null = null;

export async function loadGoogleMaps() {
  if (typeof window === 'undefined') {
    throw new Error('Google Maps can only be loaded in the browser');
  }

  if (!mapsLibraryPromise) {
    setOptions({
      key: apiKey || '',
      v: 'weekly',
      language: 'en',
      region: 'LK',
    });

    mapsLibraryPromise = importLibrary('maps') as Promise<google.maps.MapsLibrary>;
  }
  return mapsLibraryPromise;
}

export async function loadPlacesLibrary() {
  if (typeof window === 'undefined') return null;

  if (!placesLibraryPromise) {
    placesLibraryPromise = importLibrary('places') as Promise<google.maps.PlacesLibrary>;
  }
  return placesLibraryPromise;
}

export async function getDistanceMatrix(
  origins: string[],
  destinations: string[],
  mode: google.maps.TravelMode = google.maps.TravelMode.DRIVING
) {
  await loadGoogleMaps();
  const service = new google.maps.DistanceMatrixService();

  return new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
    service.getDistanceMatrix(
      {
        origins,
        destinations,
        travelMode: mode,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === 'OK' && response) {
          resolve(response);
        } else {
          reject(new Error(`Distance Matrix failed: ${status}`));
        }
      }
    );
  });
}