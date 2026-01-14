export interface DailyForecast {
  date: Date;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
  weather: string;
}

export interface WeatherData {
  city: string;
  country: string;
  forecast: DailyForecast[];
}

export type Gender = 'Male' | 'Female' | 'Neutral';
export type Style = 'Minimalist' | 'Sporty' | 'Business' | 'Streetwear' | 'Sweet';

export interface UserSettings {
  gender: Gender;
  style: Style;
}
