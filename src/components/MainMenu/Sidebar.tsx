import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Settings, 
  Newspaper, 
  ShoppingBag, 
  User,
  Bell,
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: 'home' | 'settings' | 'news' | 'shop') => void;
  user: any;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, user }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'news', icon: Newspaper, label: 'Actualités' },
    { id: 'shop', icon: ShoppingBag, label: 'Boutique' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
  ];

  return (
    <div className="w-20 sidebar h-full flex flex-col items-center py-4">
      {/* Avatar utilisateur */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-6 relative"
      >
        <img 
          src="https://crafatar.com/avatars/steve?size=64&default=MHF_Steve&overlay" 
          alt="Avatar"
          className="w-8 h-8 rounded"
        />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
      </motion.div>

      {/* Menu items */}
      <div className="flex flex-col gap-4 flex-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setCurrentView(item.id as any)}
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
              ${currentView === item.id 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
              }
            `}
            title={item.label}
          >
            <item.icon size={20} />
          </motion.button>
        ))}
      </div>

      {/* Notifications */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 mb-4"
        title="Notifications"
      >
        <Bell size={20} />
      </motion.button>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => window.location.reload()}
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
        title="Déconnexion"
      >
        <LogOut size={20} />
      </motion.button>
    </div>
  );
};

export default Sidebar;