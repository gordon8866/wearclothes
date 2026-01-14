import type { WeatherData, DailyForecast } from './types';

// Mock function to simulate fetching weather data
export const getMockWeatherForecast = async (city: string): Promise<WeatherData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

  // Generate 7 days of mock forecast data
  const forecast: DailyForecast[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    let minTemp, maxTemp, weather;
    const cityHash = city.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const daySeed = cityHash + i;

    switch (daySeed % 5) {
      case 0: // Cold
        minTemp = -2; maxTemp = 8; weather = 'Snow';
        break;
      case 1: // Cool
        minTemp = 8; maxTemp = 16; weather = 'Clouds';
        break;
      case 2: // Comfortable
        minTemp = 17; maxTemp = 23; weather = 'Clear';
        break;
      case 3: // Warm
        minTemp = 23; maxTemp = 27; weather = 'Clear';
        break;
      default: // Hot
        minTemp = 28; maxTemp = 35; weather = 'Sunny';
        break;
    }

    minTemp += (Math.random() - 0.5) * 4;
    maxTemp += (Math.random() - 0.5) * 4;
    if (minTemp > maxTemp) [minTemp, maxTemp] = [maxTemp, minTemp];
    
    return {
      date,
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      avgTemp: Math.round((minTemp + maxTemp) / 2),
      weather: weather,
    };
  });

  const cityMap: { [key: string]: { city: string, country: string } } = {
    'taipei': { city: 'Taipei', country: 'TW' },
    'london': { city: 'London', country: 'GB' },
    'tokyo': { city: 'Tokyo', country: 'JP' },
    'new york': { city: 'New York', country: 'US' },
    'paris': { city: 'Paris', country: 'FR' },
  };

  const normalizedCity = city.toLowerCase();
  const location = cityMap[normalizedCity] || { city: city.charAt(0).toUpperCase() + city.slice(1), country: '?' };

  return {
    ...location,
    forecast,
  };
};
