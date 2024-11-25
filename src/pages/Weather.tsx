import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Sun, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

const Weather = () => {
  const weatherData = {
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy'
    },
    forecast: [
      { date: new Date(), high: 30, low: 22, condition: 'Sunny' },
      { date: new Date(Date.now() + 86400000), high: 29, low: 21, condition: 'Cloudy' },
      { date: new Date(Date.now() + 172800000), high: 27, low: 20, condition: 'Rain' }
    ],
    alerts: [
      { type: 'warning', message: 'Heavy rainfall expected in the next 48 hours' }
    ]
  };

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Current Weather */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cloud className="text-blue-500 w-8 h-8" />
                <div>
                  <p className="text-3xl font-bold">{weatherData.current.temperature}°C</p>
                  <p className="text-gray-500">{weatherData.current.condition}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Droplets className="text-blue-400" />
                <span>{weatherData.current.humidity}% Humidity</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="text-gray-400" />
                <span>{weatherData.current.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">3-Day Forecast</h2>
          <div className="space-y-4">
            {weatherData.forecast.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{format(day.date, 'EEE, MMM d')}</p>
                  <p className="text-sm text-gray-500">{day.condition}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="text-yellow-500" />
                  <span>{day.high}°C</span>
                  <span className="text-gray-400">{day.low}°C</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Weather Alerts</h2>
          <div className="space-y-4">
            {weatherData.alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-yellow-50 rounded-lg flex items-start space-x-3"
              >
                <AlertTriangle className="text-yellow-500 flex-shrink-0" />
                <p className="text-sm text-yellow-800">{alert.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Weather;