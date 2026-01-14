import { Sun, Cloud, CloudRain, CloudSnow, CloudSun, Zap } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  weather: string;
}

export function WeatherIcon({ weather, ...props }: WeatherIconProps) {
  switch (weather.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun {...props} />;
    case 'clouds':
      return <Cloud {...props} />;
    case 'rain':
      return <CloudRain {...props} />;
    case 'snow':
      return <CloudSnow {...props} />;
    case 'thunderstorm':
      return <Zap {...props} />;
    default:
      return <CloudSun {...props} />;
  }
}
