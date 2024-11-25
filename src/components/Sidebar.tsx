import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  Sprout, 
  CloudIcon, 
  Camera, 
  BarChart2, 
  MapIcon, 
  Settings,
  Menu
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/' },
    { icon: Sprout, label: 'Crops', path: '/crops' },
    { icon: CloudIcon, label: 'Weather', path: '/weather' },
    { icon: Camera, label: 'Disease Detection', path: '/disease-detection' },
    { icon: MapIcon, label: 'Field Mapping', path: '/field-mapping' },
    { icon: BarChart2, label: 'Market Data', path: '/market' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '5rem' : '16rem' }}
      className="bg-green-800 text-white flex flex-col h-full"
    >
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold"
          >
            AgroSmart
          </motion.span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-green-700 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive ? 'bg-green-700' : 'hover:bg-green-700'
              }`
            }
          >
            <Icon size={20} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-4"
              >
                {label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;