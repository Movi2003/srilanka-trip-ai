// lib/tsp.ts
import { getDistanceMatrix } from './google';

// Assuming these types are defined in app/page.tsx or a shared types file
// If not, move them to a types.ts file and import here
type TravelMode = google.maps.TravelMode | 'TUKTUK';
type RouteType = 'shortest' | 'longest' | 'attractions';

type RouteResult = {
  route: string[];
  totalDistance: number;
  segmentDistances: number[];
};

// Mock / shared destination data (move to a separate file later if needed)
const destinationsData: Record<string, { attractions: number }> = {
  Colombo: { attractions: 15 },
  Mirissa: { attractions: 6 },
  Anuradhapura: { attractions: 11 },
  Trincomalee: { attractions: 8 },
  Kandy: { attractions: 12 },
  Sigiriya: { attractions: 8 },
  // Add others as needed
};

// Convert Distance Matrix response to a distance matrix (km)
function extractDistanceMatrix(
  response: google.maps.DistanceMatrixResponse | null
): number[][] {
  if (!response) return [];

  const matrix: number[][] = [];

  response.rows.forEach((row) => {
    const rowDist: number[] = [];
    row.elements.forEach((element) => {
      if (element.status === 'OK' && element.distance?.value !== undefined) {
        rowDist.push(element.distance.value / 1000); // meters → km
      } else {
        rowDist.push(9999); // penalty for unreachable
      }
    });
    matrix.push(rowDist);
  });

  return matrix;
}

// Nearest Neighbor TSP using real distances
export async function nearestNeighbor(cities: string[]): Promise<string[]> {
  if (cities.length === 0) return [];

  try {
    const response = await getDistanceMatrix(cities, cities);
    if (!response) throw new Error('No response from Distance Matrix');

    const distMatrix = extractDistanceMatrix(response);

    const visited = new Set<number>();
    const tour: number[] = [0]; // start at first city
    visited.add(0);

    let current = 0;

    while (visited.size < cities.length) {
      let nearest = -1;
      let minDist = Infinity;

      for (let i = 0; i < cities.length; i++) {
        if (!visited.has(i)) {
          const dist = distMatrix[current][i];
          if (dist < minDist) {
            minDist = dist;
            nearest = i;
          }
        }
      }

      if (nearest === -1) break;

      tour.push(nearest);
      visited.add(nearest);
      current = nearest;
    }

    tour.push(tour[0]); // close loop
    return tour.map((index) => cities[index]);
  } catch (err) {
    console.error('TSP failed:', err);
    return [...cities, cities[0]]; // fallback
  }
}

// 2-Opt improvement – now takes cities parameter
export function twoOpt(route: string[], cities: string[], distMatrix: number[][]): string[] {
  let improved = [...route];
  let better = true;

  while (better) {
    better = false;

    for (let i = 1; i < improved.length - 2; i++) {
      for (let j = i + 1; j < improved.length - 1; j++) {
        const a = cities.indexOf(improved[i - 1]);
        const b = cities.indexOf(improved[i]);
        const c = cities.indexOf(improved[j]);
        const d = cities.indexOf(improved[j + 1]);

        if (a === -1 || b === -1 || c === -1 || d === -1) continue;

        const before = distMatrix[a][b] + distMatrix[c][d];
        const after = distMatrix[a][c] + distMatrix[b][d];

        if (after < before) {
          improved = [
            ...improved.slice(0, i),
            ...improved.slice(i, j + 1).reverse(),
            ...improved.slice(j + 1),
          ];
          better = true;
        }
      }
    }
  }

  return improved;
}

// Main exported function – single version, accepts mode & type
export async function findBestRoute(
  cities: string[],
  mode: TravelMode = google.maps.TravelMode.DRIVING,
  type: RouteType = 'shortest'
): Promise<RouteResult> {
  let route = await nearestNeighbor(cities);

  try {
    // map our union to the actual Google Maps enum;
    // treat the extra 'TUKTUK' option as DRIVING for the API
    const apiMode: google.maps.TravelMode =
      mode === 'TUKTUK' ? google.maps.TravelMode.DRIVING : mode;

    const response = await getDistanceMatrix(cities, cities, apiMode);
    if (!response) {
      return { route, totalDistance: 0, segmentDistances: [] };
    }

    let distMatrix = extractDistanceMatrix(response);

    // Adjust matrix based on route type
    if (type === 'longest') {
      // Invert distances to maximize
      distMatrix = distMatrix.map(row => row.map(d => (d > 0 ? -d : 0)));
    } else if (type === 'attractions') {
      // Prefer places with more attractions (lower "cost")
      cities.forEach((city, i) => {
        const attractions = destinationsData[city]?.attractions || 1;
        distMatrix.forEach((row, j) => {
          if (i !== j) row[j] /= attractions;
        });
      });
    }

    const improved = twoOpt(route, cities, distMatrix);
    improved.push(improved[0]); // close loop

    // Calculate total distance + per-segment distances
    let totalDistance = 0;
    const segmentDistances: number[] = [];

    for (let i = 0; i < improved.length - 1; i++) {
      const fromCity = improved[i];
      const toCity = improved[i + 1];

      const fromIndex = cities.indexOf(fromCity);
      const toIndex = cities.indexOf(toCity);

      if (fromIndex !== -1 && toIndex !== -1) {
        const dist = distMatrix[fromIndex][toIndex];
        segmentDistances.push(dist);
        totalDistance += dist;
      } else {
        segmentDistances.push(0);
      }
    }

    return {
      route: improved,
      totalDistance: Math.round(totalDistance),
      segmentDistances,
    };
  } catch (err) {
    console.error('2-Opt or distance calculation failed:', err);
    return { route, totalDistance: 0, segmentDistances: [] };
  }
}