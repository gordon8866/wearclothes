# **App Name**: Smart Threads

## Core Features:

- Automated Location Detection: Automatically detect the user's location using the browser Geolocation API to provide relevant weather data.
- Weather Data Integration: Fetch weather data (current and next 6 days' temperatures) from OpenWeatherMap API based on location.
- Manual Location Search: Allow users to manually search for a city to view weather and outfit suggestions for that location.
- Outfit Recommendation Engine: Suggest outfits based on a five-tier temperature classification and user's gender and style preferences.
- Image Display Module: Display the top image search result as the outfit suggestion and provides tool to load an alternative.
- Personalized Settings: Allow users to set their gender (Male/Female/Neutral) and style (Minimalist, Sporty, Business, Streetwear, Sweet) preferences via radio buttons and dropdown menus.
- Keyword Generation: Use an algorithm to generate search keywords by combining the weather category, gender and style such as `[Temperature Keywords] + [Gender] + [Style] + Outfit` to find outfits.

## Style Guidelines:

- Primary color: Light sky blue (#87CEEB) to evoke a sense of calm and clarity, reflecting the ease of making outfit choices. It complements weather-related themes.
- Background color: Very light gray (#F0F8FF), almost white, maintaining a clean and uncluttered interface that puts focus on the visual outfit suggestions.
- Accent color: Soft coral (#F08080) as an analogous accent color to contrast against the blue, and guide attention to interactive elements and important information without being jarring.
- Body and headline font: 'PT Sans', a humanist sans-serif to combine a modern look and a little warmth.
- Header: City location on the left, search bar in the center, settings icon on the right.
- Hero Section: Today's weather on the left, large outfit image on the right.
- Weekly Grid: Six small cards for the next six days with date, temperature range, and a small outfit image.