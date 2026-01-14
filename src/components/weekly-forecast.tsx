import { format } from 'date-fns';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WeatherIcon } from './weather-icon';
import type { DailyForecast } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface WeeklyForecastProps {
  forecast: DailyForecast[] | undefined;
  images: ImagePlaceholder[];
  isLoading: boolean;
}

export function WeeklyForecast({ forecast, images, isLoading }: WeeklyForecastProps) {
  const displayForecast = forecast?.slice(1, 7) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader><Skeleton className="h-5 w-24" /></CardHeader>
            <CardContent className="p-0">
              <Skeleton className="aspect-square w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!displayForecast.length) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        Weather forecast for the week is not available.
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {displayForecast.map((day, index) => {
        const image = images[(index + 3) % images.length]; // Simple image selection with offset
        return (
          <Card key={day.date.toISOString()} className="flex flex-col overflow-hidden shadow-lg transition-transform hover:scale-105">
            <CardHeader className="flex-row items-center justify-between space-y-0 p-4">
              <div className="space-y-1">
                <CardTitle className="text-lg font-headline">{format(day.date, 'EEE')}</CardTitle>
                <p className="text-xs text-muted-foreground">{format(day.date, 'MMM d')}</p>
              </div>
              <WeatherIcon weather={day.weather} className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-grow p-0">
              <div className="relative aspect-square w-full">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-black/40 p-2 text-center text-sm font-bold text-white">
                  {day.minTemp}° / {day.maxTemp}°C
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
