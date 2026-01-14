"use client";

import { useState } from 'react';
import { MapPin, Search, Settings, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SettingsDialog } from './settings-dialog';
import type { UserSettings } from '@/lib/types';

interface HeaderProps {
  city: string;
  onSearch: (city: string) => void;
  settings: UserSettings;
  onSettingsChange: (newSettings: UserSettings) => void;
  isLoading: boolean;
}

export function Header({ city, onSearch, settings, onSettingsChange, isLoading }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{city || 'Locating...'}</span>
          </div>
          <div className="flex-1 px-4 sm:px-12 md:px-20">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="search"
                placeholder="Search for a city..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Smart Threads</h1>
            <Button variant="outline" size="icon" onClick={() => setSettingsOpen(true)}>
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </header>
      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onSave={onSettingsChange}
      />
    </>
  );
}
