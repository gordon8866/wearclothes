"use client";

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/header';
import { OutfitDisplay } from '@/components/outfit-display';
import { WeeklyForecast } from '@/components/weekly-forecast';
import { WeatherIcon } from '@/components/weather-icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

import { getMockWeatherForecast } from '@/lib/weather';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import type { WeatherData, UserSettings } from '@/lib/types';
import { generateOutfitKeywords } from '@/ai/flows/generate-outfit-keywords';

const defaultSettings: UserSettings = {
  gender: 'Male',
  style: 'Minimalist',
};

export default function MainDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings>(defaultSettings);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState<ImagePlaceholder[]>(PlaceHolderImages);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(true);
  const { toast } = useToast();

  const fetchWeather = useCallback(async (city: string) => {
    setLoading(true);
    try {
      const data = await getMockWeatherForecast(city);
      setWeatherData(data);
    } catch (err) {
      const errorMessage = 'Failed to fetch weather data. Please try again.';
      toast({ title: 'Error', description: errorMessage, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        fetchWeather('Taipei'); 
      },
      () => {
        console.warn(`Geolocation failed.`);
        fetchWeather('Taipei');
        toast({ title: 'Location Access', description: "Could not get your location. Showing weather for Taipei."});
      }
    );
  }, [fetchWeather, toast]);

  useEffect(() => {
    if (weatherData && weatherData.forecast.length > 0) {
      const today = weatherData.forecast[0];
      setAiLoading(true);
      generateOutfitKeywords({
        temperature: today.avgTemp,
        gender: userSettings.gender,
        style: userSettings.style,
      })
      .then(result => {
        const genderKeyword = userSettings.gender.toLowerCase();
        const styleKeyword = userSettings.style.toLowerCase();
        
        let images = PlaceHolderImages.filter(img => {
            const hint = img.imageHint.toLowerCase();
            return hint.includes(genderKeyword) && hint.includes(styleKeyword);
        });
        
        if (images.length === 0) {
          images = PlaceHolderImages.filter(img => {
              const hint = img.imageHint.toLowerCase();
              return hint.includes(genderKeyword) || hint.includes(styleKeyword);
          });
        }

        if (images.length === 0) {
            images = PlaceHolderImages;
        }

        setFilteredImages(images);
        setCurrentImageIndex(0);
      })
      .catch(err => {
        console.error("AI keyword generation failed:", err);
        toast({ title: 'AI Error', description: 'Could not generate outfit keywords.', variant: 'destructive' });
        setFilteredImages(PlaceHolderImages);
      }).finally(() => setAiLoading(false));
    }
  }, [weatherData, userSettings, toast]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (filteredImages.length || 1));
  };
  
  const todayForecast = weatherData?.forecast[0];
  const currentImage = filteredImages.length > 0 ? filteredImages[currentImageIndex] : undefined;
  const isOverallLoading = loading || (aiLoading && weatherData != null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        city={weatherData?.city || ''}
        onSearch={fetchWeather}
        settings={userSettings}
        onSettingsChange={setUserSettings}
        isLoading={loading}
      />
      <div className="container mx-auto flex-grow p-4 md:p-6">
        <section id="hero" className="mb-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Card className="h-full shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">Today's Suggestion</CardTitle>
                  <p className="text-muted-foreground">{todayForecast ? format(todayForecast.date, 'EEEE, MMMM d') : <Skeleton className="h-5 w-40"/>}</p>
                </CardHeader>
                <CardContent>
                  {loading && !todayForecast ? (
                    <div className="space-y-4 pt-4">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-10 w-3/4" />
                    </div>
                  ) : todayForecast ? (
                    <div className="flex items-center gap-6">
                      <WeatherIcon weather={todayForecast.weather} className="h-24 w-24 text-accent" />
                      <div>
                        <p className="text-6xl font-bold font-headline">{todayForecast.avgTemp}°C</p>
                        <p className="text-muted-foreground">{todayForecast.minTemp}° / {todayForecast.maxTemp}°C</p>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-3">
              <OutfitDisplay
                image={currentImage}
                onNextImage={handleNextImage}
                isLoading={isOverallLoading}
              />
            </div>
          </div>
        </section>

        <section id="weekly-forecast">
          <h2 className="text-3xl font-bold font-headline tracking-tight mb-4">This Week</h2>
          <WeeklyForecast forecast={weatherData?.forecast} images={PlaceHolderImages} isLoading={loading} />
        </section>
      </div>
       <footer className="text-center p-4 text-muted-foreground text-sm">
        Powered by Smart Threads
      </footer>
    </div>
  );
}
