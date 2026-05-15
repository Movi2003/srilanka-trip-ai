// lib/osrm.ts

export async function getOsrmRoute(coordinates: { lat: number; lng: number }[]) {
  if (coordinates.length < 2) return null;

  // OSRM expects coordinates in lon,lat format
  const coordsString = coordinates.map(c => `${c.lng},${c.lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('OSRM network response was not ok');
    const data = await res.json();

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('OSRM returned no routes');
    }

    // Geometry is in GeoJSON format, so coordinates are [lon, lat] arrays
    const geojsonCoords = data.routes[0].geometry.coordinates;
    const path = geojsonCoords.map((coord: number[]) => ({
      lat: coord[1],
      lng: coord[0],
    }));

    return path;
  } catch (error) {
    console.warn('OSRM routing failed, falling back to straight lines:', error);
    return null;
  }
}
