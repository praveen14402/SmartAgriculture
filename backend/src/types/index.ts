export interface User {
  id: string;
  name: string;
  email: string;
  farms: Farm[];
}

export interface Farm {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  size: number;
  crops: Crop[];
  soilData: SoilData;
}

export interface Crop {
  id: string;
  name: string;
  plantedDate: Date;
  harvestDate: Date;
  status: 'healthy' | 'warning' | 'danger';
  diseaseHistory: DiseaseDetection[];
}

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  lastUpdated: Date;
}

export interface DiseaseDetection {
  id: string;
  cropId: string;
  timestamp: Date;
  disease: string;
  confidence: number;
  imageUrl: string;
  treatment: string;
}

export interface WeatherData {
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

export interface MarketData {
  cropId: string;
  price: number;
  demand: 'high' | 'medium' | 'low';
  timestamp: Date;
}

export interface Alert {
  id: string;
  userId: string;
  type: 'weather' | 'disease' | 'market';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  read: boolean;
}