// lib/tsp.ts
import { getDestinationByName } from './data';

export type TravelMode = 'DRIVING' | 'TRANSIT' | 'BICYCLING' | 'WALKING' | 'TUKTUK';
export type RouteType = 'shortest' | 'longest' | 'attractions';

export type RouteResult = {
  route: string[];
  totalDistance: number; // km
  travelTime: number; // hours
  activityTime: number; // hours
  totalDays: number;
  comfort: number; // percentage
  segmentDistances: number[]; // km
  segmentTimes: number[]; // hours
};

// Travel mode average speeds in km/h
const SPEEDS: Record<TravelMode, number> = {
  DRIVING: 50,
  TRANSIT: 40,
  TUKTUK: 35,
  BICYCLING: 15,
  WALKING: 5,
};

// Haversine distance in km
export function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calculateComfort(distance: number, mode: TravelMode): number {
  let baseComfort = 100;
  // Penalty for long distances based on mode
  if (mode === 'WALKING' && distance > 5) baseComfort -= (distance - 5) * 5;
  if (mode === 'BICYCLING' && distance > 30) baseComfort -= (distance - 30) * 2;
  if (mode === 'TUKTUK' && distance > 100) baseComfort -= (distance - 100) * 0.5;
  if (mode === 'TRANSIT' && distance > 200) baseComfort -= (distance - 200) * 0.2;
  if (mode === 'DRIVING' && distance > 300) baseComfort -= (distance - 300) * 0.1;
  return Math.max(0, Math.min(100, Math.round(baseComfort)));
}

export async function findBestRoute(
  cityNames: string[],
  mode: TravelMode = 'DRIVING',
  type: RouteType = 'shortest'
): Promise<RouteResult> {
  if (cityNames.length === 0) {
    return { route: [], totalDistance: 0, travelTime: 0, activityTime: 0, totalDays: 0, comfort: 100, segmentDistances: [], segmentTimes: [] };
  }

  // Pre-calculate distance matrix locally to avoid API limits and make it fast
  const n = cityNames.length;
  const distMatrix: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  
  const cities = cityNames.map(name => getDestinationByName(name));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        distMatrix[i][j] = 0;
      } else {
        const c1 = cities[i];
        const c2 = cities[j];
        if (c1 && c2) {
          distMatrix[i][j] = getHaversineDistance(c1.latitude, c1.longitude, c2.latitude, c2.longitude);
          // Adjust matrix based on route type
          if (type === 'longest') {
            distMatrix[i][j] = -distMatrix[i][j]; // invert for longest
          } else if (type === 'attractions') {
            // divide distance by number of attractions in destination to prioritize it
            distMatrix[i][j] = distMatrix[i][j] / Math.max(1, c2.attractions.length);
          }
        } else {
          distMatrix[i][j] = 9999;
        }
      }
    }
  }

  // Nearest Neighbor
  const visited = new Set<number>();
  const routeIdx: number[] = [0];
  visited.add(0);

  let current = 0;
  while (visited.size < n) {
    let nearest = -1;
    let minDist = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i)) {
        if (distMatrix[current][i] < minDist) {
          minDist = distMatrix[current][i];
          nearest = i;
        }
      }
    }
    if (nearest === -1) break;
    routeIdx.push(nearest);
    visited.add(nearest);
    current = nearest;
  }

  // Close loop back to start
  routeIdx.push(0);

  // Re-calculate real totals using un-modified haversine distance
  let totalDistance = 0;
  let activityTime = 0;
  const segmentDistances: number[] = [];
  const segmentTimes: number[] = [];
  const speed = SPEEDS[mode];

  for (let i = 0; i < routeIdx.length - 1; i++) {
    const fromIdx = routeIdx[i];
    const toIdx = routeIdx[i+1];
    const c1 = cities[fromIdx];
    const c2 = cities[toIdx];
    
    let dist = 0;
    if (c1 && c2) {
      // Use standard haversine (not the modified matrix value)
      dist = getHaversineDistance(c1.latitude, c1.longitude, c2.latitude, c2.longitude);
      if (i === 0 || toIdx !== 0) { // Don't count start location's activity time twice
        activityTime += c2.recommendedDuration;
      }
    }
    
    totalDistance += dist;
    segmentDistances.push(dist);
    segmentTimes.push(dist / speed);
  }
  
  if (cities[0]) activityTime += cities[0].recommendedDuration; // add first location

  const travelTime = totalDistance / speed;
  const totalDays = Math.ceil((travelTime + activityTime) / 8); // Assume 8 hours of active travel/sightseeing per day
  const comfort = calculateComfort(totalDistance, mode);

  return {
    route: routeIdx.map(idx => cityNames[idx]),
    totalDistance: Math.round(totalDistance),
    travelTime,
    activityTime,
    totalDays,
    comfort,
    segmentDistances,
    segmentTimes,
  };
}