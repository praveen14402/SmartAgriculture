import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart2, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Market = () => {
  const marketData = {
    trends: [
      { name: 'Wheat', price: 2500, change: 5.2, demand: 'High' },
      { name: 'Rice', price: 3000, change: -2.1, demand: 'Medium' },
      { name: 'Corn', price: 1800, change: 3.7, demand: 'High' }
    ],
    priceHistory: Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      wheat: Math.random() * 500 + 2000,
      rice: Math.random() * 500 + 2500,
      corn: Math.random() * 500 + 1500
    }))
  };

  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Market Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Market Trends</h2>
          <div className="space-y-4">
            {marketData.trends.map((crop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{crop.name}</h3>
                    <p className="text-sm text-gray-500">Demand: {crop.demand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{crop.price}/quintal</p>
                    <p className={`text-sm ${crop.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {crop.change >= 0 ? <TrendingUp className="inline w-4 h-4 mr-1" /> : <TrendingDown className="inline w-4 h-4 mr-1" />}
                      {Math.abs(crop.change)}%
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Price History Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Price History</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wheat" stroke="#22c55e" name="Wheat" />
                <Line type="monotone" dataKey="rice" stroke="#3b82f6" name="Rice" />
                <Line type="monotone" dataKey="corn" stroke="#eab308" name="Corn" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Market;