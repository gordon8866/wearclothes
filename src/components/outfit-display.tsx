"use client";

import Image from 'next/image';
import { RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

interface OutfitDisplayProps {
  image: ImagePlaceholder | undefined;
  onNextImage: () => void;
  isLoading: boolean;
}

export function OutfitDisplay({ image, onNextImage, isLoading }: OutfitDisplayProps) {
  return (
    <Card className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl">
      {isLoading || !image ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <Image
          key={image.id}
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover transition-opacity duration-300 animate-in fade-in"
          priority
          data-ai-hint={image.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-4 right-4">
        <Button variant="secondary" size="icon" onClick={onNextImage} aria-label="Change outfit suggestion" disabled={isLoading}>
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}
