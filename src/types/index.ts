export interface Crop {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'danger';
  plantedDate: Date;
  harvestDate: Date;
  area: number;
  health: number;
  soilMoisture: number;
}

export interface Weather {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: Date;
  temperature: number;
  condition: string;
  rainfall: number;
}

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

export interface MarketData {
  cropName: string;
  currentPrice: number;
  priceChange: number;
  demand: 'high' | 'medium' | 'low';
  forecast: number;
}

export interface Alert {
  id: string;
  type: 'weather' | 'disease' | 'market' | 'system';
  severity: 'info' | 'warning' | 'danger';
  message: string;
  timestamp: Date;
}