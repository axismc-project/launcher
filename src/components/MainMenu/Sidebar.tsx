/* src/components/MainMenu/Sidebar.tsx */
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Settings, 
  Newspaper, 
  Map,
  User,
  Bell,
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: 'home' | 'settings' | 'news' | 'map') => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, user }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'news', icon: Newspaper, label: 'Actualités' },
    { id: 'map', icon: Map, label: 'Carte' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <div className="w-16 sm:w-20 modern-sidebar h-full flex flex-col items-center py-4 sm:py-6 relative">
      {/* Avatar utilisateur - responsive */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mb-6 sm:mb-8"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-400 to-green-600 p-0.5">
          <div className="w-full h-full rounded-xl sm:rounded-2xl bg-gray-900 flex items-center justify-center">
            <img 
              src="https://crafatar.com/avatars/steve?size=64&default=MHF_Steve&overlay" 
              alt="Avatar"
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg"
            />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
      </motion.div>

      {/* Menu items - responsive */}
      <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => setCurrentView(item.id as any)}
            className={`
              relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group
              ${currentView === item.id 
                ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
            title={item.label}
          >
            {currentView === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-green-500/20 rounded-xl sm:rounded-2xl border border-green-500/30"
              />
            )}
            <item.icon size={16} className="sm:w-5 sm:h-5 relative z-10" />
          </motion.button>
        ))}
      </div>

      {/* Notifications - responsive */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 mb-1.5 sm:mb-2 relative"
        title="Notifications"
      >
        <Bell size={16} className="sm:w-5 sm:h-5" />
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></div>
      </motion.button>

      {/* Logout - responsive */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => window.location.reload()}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
        title="Déconnexion"
      >
        <LogOut size={16} className="sm:w-5 sm:h-5" />
      </motion.button>
    </div>
  );
};

export default Sidebar;