import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Calendar, TrendingUp, Droplets } from 'lucide-react';
import Select from 'react-select';

const Crops = () => {
  const [selectedSeason, setSelectedSeason] = React.useState(null);
  const [selectedIrrigation, setSelectedIrrigation] = React.useState(null);

  const seasons = [
    { value: 'summer', label: 'Summer' },
    { value: 'winter', label: 'Winter' },
    { value: 'monsoon', label: 'Monsoon' }
  ];

  const irrigationTypes = [
    { value: 'drip', label: 'Drip Irrigation' },
    { value: 'sprinkler', label: 'Sprinkler' },
    { value: 'flood', label: 'Flood Irrigation' }
  ];

  const recommendedCrops = [
    {
      name: 'Wheat',
      season: 'winter',
      irrigation: 'sprinkler',
      soilType: 'Loamy',
      marketDemand: 'High',
      expectedYield: '3.5 tons/acre'
    },
    // Add more crops here
  ];

  const growthStages = [
    {
      stage: 'Sowing',
      duration: '7-10 days',
      tips: 'Maintain soil moisture, ensure proper seed spacing'
    },
    {
      stage: 'Vegetative Growth',
      duration: '30-45 days',
      tips: 'Regular irrigation, monitor for pests'
    },
    // Add more stages
  ];

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Crop Filters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Season
              </label>
              <Select
                options={seasons}
                value={selectedSeason}
                onChange={setSelectedSeason}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Irrigation Type
              </label>
              <Select
                options={irrigationTypes}
                value={selectedIrrigation}
                onChange={setSelectedIrrigation}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Recommended Crops */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recommended Crops</h2>
          <div className="space-y-4">
            {recommendedCrops.map((crop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Sprout className="text-green-500" />
                    <h3 className="font-semibold">{crop.name}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{crop.marketDemand} Demand</span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Soil Type: {crop.soilType}</div>
                  <div>Expected Yield: {crop.expectedYield}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Growth Stages */}
        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Growth Stages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {growthStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="text-blue-500" />
                  <h3 className="font-semibold">{stage.stage}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Duration: {stage.duration}</p>
                <p className="text-sm text-gray-600">{stage.tips}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Crops;