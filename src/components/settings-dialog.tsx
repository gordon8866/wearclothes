"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserSettings, Gender, Style } from '@/lib/types';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: UserSettings;
  onSave: (newSettings: UserSettings) => void;
}

const GENDERS: Gender[] = ['Male', 'Female', 'Neutral'];
const STYLES: Style[] = ['Minimalist', 'Sporty', 'Business', 'Streetwear', 'Sweet'];

export function SettingsDialog({ open, onOpenChange, settings, onSave }: SettingsDialogProps) {
  const [currentSettings, setCurrentSettings] = useState<UserSettings>(settings);

  useEffect(() => {
    if (open) {
      setCurrentSettings(settings);
    }
  }, [open, settings]);

  const handleSave = () => {
    onSave(currentSettings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personalized Settings</DialogTitle>
          <DialogDescription>
            Adjust your preferences to get better outfit recommendations.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">
              Gender
            </Label>
            <RadioGroup
              id="gender"
              value={currentSettings.gender}
              onValueChange={(value: Gender) => setCurrentSettings(s => ({ ...s, gender: value }))}
              className="col-span-3 flex gap-4"
            >
              {GENDERS.map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <RadioGroupItem value={gender} id={`gender-${gender}`} />
                  <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="style" className="text-right">
              Style
            </Label>
            <Select
              value={currentSettings.style}
              onValueChange={(value: Style) => setCurrentSettings(s => ({ ...s, style: value }))}
            >
              <SelectTrigger id="style" className="col-span-3">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                {STYLES.map((style) => (
                  <SelectItem key={style} value={style}>{style}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
