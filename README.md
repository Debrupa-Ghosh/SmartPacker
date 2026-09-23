# SmartPacker

**"Pack smarter. Travel better."**

SmartPacker is a weather-based travel packing advisor. Traditional weather apps tell you the weather, but leave you to figure out what that means for your luggage. SmartPacker bridges that gap: it converts real-time weather forecasts into actionable, personalized packing decisions.

## Features

- **Destination Search:** Search for any city or location worldwide.
- **Real-Time Weather & Forecast:** Integrates with WeatherAPI to fetch current conditions and a 3-day forecast.
- **Weather Analysis Engine:** A custom rule-based engine that evaluates temperature, rain probability, humidity, UV index, wind speed, and weather conditions.
- **Smart Recommendations:** Provides categorized packing items (e.g., umbrella, sunscreen, windproof jacket, warm layers) based strictly on the forecast data, complete with reasons and priority levels.
- **Trip Insight:** A short, human-readable summary of what to expect during your trip.
- **Responsive UI:** A premium, fully responsive interface built with React and Tailwind CSS, featuring subtle animations and accessible design.

## Tech Stack

- **Frontend:** HTML,Javascript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **API:** WeatherAPI.com

## How It Works

1. **User Input:** Enter a destination.
2. **Fetch Data:** The app calls WeatherAPI to retrieve current weather and a 3-day forecast.
3. **Analysis:** The `recommendationEngine` evaluates the data against predefined thresholds (e.g., UV > 8, Rain chance > 50%, Temp < 12°C).
4. **Generate List:** It outputs a deduplicated, prioritized list of packing items and a natural-language trip insight.
5. **Display:** The UI renders the recommendations in a polished, scannable format.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Smart-Packer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your WeatherAPI key. (Do not commit this file to version control).
   ```env
   VITE_WEATHER_API_KEY=your_weatherapi_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

## Future Improvements

- **Trip Dates:** Allow users to input specific travel dates for long-range planning.
- **Packing Checklist:** Enable users to check off items as they pack them.
- **Saved Destinations:** Save recent or favorite searches.
- **Multiple Destinations:** Support for multi-city trips.
- **User Preferences:** Allow users to specify preferences (e.g., "I run cold") to adjust recommendation thresholds.
- **Personalized Packing:** Account for trip types (business, hiking, beach).
- **Travel History:** Keep a log of past trips and packing lists.

---
*Built with React + WeatherAPI. © 2026 SmartPacker.*
