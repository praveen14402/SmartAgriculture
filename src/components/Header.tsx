import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [alerts] = React.useState(3);
  const [isDark, setIsDark] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">AgroSmart</h1>
        
        <div className="flex items-center space-x-4">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
            {alerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {alerts}
              </span>
            )}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </motion.button>
          
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="h-8 w-8 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;