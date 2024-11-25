import React from 'react';
import { motion } from 'framer-motion';
import { 
  CloudIcon, 
  Droplets, 
  Thermometer,
  Sprout,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Mock data - replace with real API calls
  const weatherData = {
    temperature: 24,
    humidity: 65,
    rainfall: 12,
  };

  const alerts = [
    { id: 1, type: 'weather', message: 'Heavy rainfall expected in next 48 hours' },
    { id: 2, type: 'disease', message: 'Possible blight detected in Field A' },
  ];

  const cropHealthData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    health: Math.random() * 20 + 80,
  }));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Weather Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Weather</h3>
            <CloudIcon className="text-blue-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Thermometer className="text-red-500 mr-2" />
                <span className="text-gray-600">Temperature</span>
              </div>
              <span className="font-semibold">{weatherData.temperature}°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Droplets className="text-blue-500 mr-2" />
                <span className="text-gray-600">Humidity</span>
              </div>
              <span className="font-semibold">{weatherData.humidity}%</span>
            </div>
          </div>
        </motion.div>

        {/* Crop Health Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Crop Health</h3>
            <Sprout className="text-green-500" />
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cropHealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="health" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Alerts Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Alerts</h3>
            <AlertTriangle className="text-yellow-500" />
          </div>
          <div className="space-y-4">
            {alerts.map(alert => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-yellow-50 rounded-lg border border-yellow-100"
              >
                <p className="text-sm text-gray-700">{alert.message}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;