import axios from 'axios';
import { WeatherData, WeatherForecast } from '../types';

class WeatherService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY!;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );

      return {
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
        forecast: []
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  async getForecast(lat: number, lon: number): Promise<WeatherForecast[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );

      return response.data.list.map((item: any) => ({
        date: new Date(item.dt * 1000),
        temperature: item.main.temp,
        condition: item.weather[0].main,
        rainfall: item.rain ? item.rain['3h'] || 0 : 0
      }));
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  }

  async getWeatherAlerts(lat: number, lon: number) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}&exclude=current,minutely,hourly,daily`
      );

      return response.data.alerts || [];
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      throw error;
    }
  }
}

export default new WeatherService();