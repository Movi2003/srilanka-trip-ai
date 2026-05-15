// lib/weather.ts
import { Destination } from './data';

export type WeatherCondition = {
  condition: string;
  temperature: string;
  icon: string;
  description: string;
  region?: string;
};

export type MonthlyWeather = {
  [key: number]: WeatherCondition; // key is month (0-11)
};

export type RegionType = 'coastal' | 'hill-country' | 'central' | 'north' | 'east' | 'south';

// Base weather data by month (general Sri Lanka)
export const sriLankaWeather: MonthlyWeather = {
  0: { // January
    condition: 'Sunny',
    temperature: '27-31°C',
    icon: '☀️',
    description: 'Dry season, ideal for beach activities and wildlife safaris'
  },
  1: { // February
    condition: 'Sunny',
    temperature: '27-31°C',
    icon: '☀️',
    description: 'Peak tourist season, great weather across the island'
  },
  2: { // March
    condition: 'Hot & Humid',
    temperature: '28-32°C',
    icon: '🌤️',
    description: 'Hot and humid, occasional showers in southwestern areas'
  },
  3: { // April
    condition: 'Hot with Showers',
    temperature: '28-33°C',
    icon: '⛅',
    description: 'Pre-monsoon season, afternoon thunderstorms possible'
  },
  4: { // May
    condition: 'Rainy',
    temperature: '27-31°C',
    icon: '🌧️',
    description: 'Southwest monsoon begins, heavy rains in west and south'
  },
  5: { // June
    condition: 'Rainy',
    temperature: '27-30°C',
    icon: '🌧️',
    description: 'Monsoon season continues, good time for hill country visits'
  },
  6: { // July
    condition: 'Rainy',
    temperature: '27-30°C',
    icon: '🌧️',
    description: 'Monsoon continues, east coast is dry and pleasant'
  },
  7: { // August
    condition: 'Mixed',
    temperature: '27-30°C',
    icon: '⛅',
    description: 'Transitional weather, varying conditions across regions'
  },
  8: { // September
    condition: 'Mixed',
    temperature: '27-30°C',
    icon: '⛅',
    description: 'End of southwest monsoon, improving weather conditions'
  },
  9: { // October
    condition: 'Rainy',
    temperature: '27-30°C',
    icon: '🌧️',
    description: 'Inter-monsoon season, occasional heavy rains across island'
  },
  10: { // November
    condition: 'Rainy',
    temperature: '26-30°C',
    icon: '🌧️',
    description: 'Northeast monsoon begins, heavy rains in north and east'
  },
  11: { // December
    condition: 'Mixed',
    temperature: '26-30°C',
    icon: '⛅',
    description: 'Festive season, good weather on west and south coasts'
  },
};

export function getWeatherForMonth(month: number): WeatherCondition {
  return sriLankaWeather[month] || sriLankaWeather[0];
}

// Get weather adjusted for specific location and region
export function getWeatherForLocation(location: Destination, date: Date): WeatherCondition {
  const month = date.getMonth();
  const baseWeather = getWeatherForMonth(month);
  
  // Map data.ts region to this file's region type
  let region = location.region as string;
  if (region === 'hill') region = 'hill-country';

  // Clone the base weather
  const locationWeather = { ...baseWeather, region };

  // Adjust weather based on region and month
  if (region === 'hill-country') {
    // Hill country is cooler
    const temps = baseWeather.temperature.replace('°C','').split('-');
    const minTemp = parseInt(temps[0]) - 5;
    const maxTemp = parseInt(temps[1]) - 5;
    locationWeather.temperature = `${minTemp}-${maxTemp}°C`;
    
    if (month >= 5 && month <= 8) {
      // Hill country has good weather during southwest monsoon
      locationWeather.condition = 'Pleasant';
      locationWeather.icon = '🌤️';
      locationWeather.description = 'Cool and pleasant weather, ideal for hill country exploration';
    }
  } else if (region === 'east') {
    // East coast has reversed monsoon pattern
    if (month >= 5 && month <= 8) {
      locationWeather.condition = 'Sunny & Dry';
      locationWeather.icon = '☀️';
      locationWeather.description = 'Best time to visit the east coast, dry and sunny';
    } else if (month >= 10 || month <= 1) {
      locationWeather.condition = 'Rainy';
      locationWeather.icon = '🌧️';
      locationWeather.description = 'Northeast monsoon affects the east coast';
    }
  } else if (region === 'south' || region === 'coastal') {
    // South and west coasts affected by southwest monsoon
    if (month >= 4 && month <= 9) {
      locationWeather.condition = 'Rainy';
      locationWeather.icon = '🌧️';
      locationWeather.description = 'Southwest monsoon brings rain to southern and western coasts';
    } else {
      locationWeather.condition = 'Sunny';
      locationWeather.icon = '☀️';
      locationWeather.description = 'Dry season, perfect beach weather';
    }
  } else if (region === 'north') {
    // North affected by northeast monsoon
    if (month >= 10 || month <= 1) {
      locationWeather.condition = 'Rainy';
      locationWeather.icon = '🌧️';
      locationWeather.description = 'Northeast monsoon season in the north';
    } else {
      locationWeather.condition = 'Hot & Dry';
      locationWeather.icon = '☀️';
      locationWeather.description = 'Hot and dry conditions';
    }
  }

  return locationWeather;
}

export function getWeatherForDateRange(startDate: Date, endDate: Date): WeatherCondition[] {
  const weatherData: WeatherCondition[] = [];
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startYear === endYear) {
    // Same year
    for (let month = startMonth; month <= endMonth; month++) {
      weatherData.push(getWeatherForMonth(month));
    }
  } else {
    // Different years
    for (let month = startMonth; month < 12; month++) {
      weatherData.push(getWeatherForMonth(month));
    }
    for (let month = 0; month <= endMonth; month++) {
      weatherData.push(getWeatherForMonth(month));
    }
  }

  // Remove duplicates by condition
  const uniqueWeather = weatherData.filter(
    (weather, index, self) =>
      index === self.findIndex((w) => w.condition === weather.condition)
  );
  
  return uniqueWeather;
}
