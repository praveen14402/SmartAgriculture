import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FieldMapping = () => {
  const [boundaries, setBoundaries] = React.useState([]);
  const [selectedField, setSelectedField] = React.useState(null);

  // Mock data for field health
  const fieldHealthData = {
    ndvi: 0.75,
    soilMoisture: '65%',
    nutrientLevels: {
      nitrogen: 'Medium',
      phosphorus: 'High',
      potassium: 'Low'
    }
  };

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Map */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-[600px]">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* Add Polygon components for field boundaries */}
            </MapContainer>
          </div>
        </div>

        {/* Field Health Panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Field Health</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">NDVI Index</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${fieldHealthData.ndvi * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{fieldHealthData.ndvi}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Soil Moisture</label>
                <p className="text-lg font-semibold">{fieldHealthData.soilMoisture}</p>
              </div>

              <div>
                <label className="text-sm text-gray-600">Nutrient Levels</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {Object.entries(fieldHealthData.nutrientLevels).map(([nutrient, level]) => (
                    <div
                      key={nutrient}
                      className="p-2 bg-gray-50 rounded-lg text-center"
                    >
                      <p className="text-xs text-gray-500 capitalize">{nutrient}</p>
                      <p className="font-medium">{level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Low potassium levels detected. Consider applying potassium-rich fertilizer.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Optimal soil moisture levels. Continue current irrigation schedule.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FieldMapping;