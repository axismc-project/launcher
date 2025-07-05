import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServerInfo from './ServerInfo';
import PlayButton from './PlayButton';
import Settings from '../Settings/Settings';
import Sidebar from './Sidebar';
import NewsSection from './NewsSection';
import ShopSection from './ShopSection';

interface MainLauncherProps {
  user: any;
  supabase: any;
}

interface ServerInfoType {
  online_players: number;
  server_time: string;
  status: string;
}

const MainLauncher: React.FC<MainLauncherProps> = ({ user, supabase }) => {
  const [currentView, setCurrentView] = useState<'home' | 'settings' | 'news' | 'shop'>('home');
  const [serverInfo, setServerInfo] = useState<ServerInfoType | null>(null);
  const [gameInstalled, setGameInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const fetchServerInfo = () => {
      setServerInfo({
        online_players: Math.floor(Math.random() * 300) + 150,
        server_time: new Date().toLocaleTimeString(),
        status: 'online'
      });
    };

    fetchServerInfo();
    const interval = setInterval(fetchServerInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleInstallGame = async () => {
    setIsInstalling(true);
    for (let i = 0; i <= 100; i += 5) {
      setDownloadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setGameInstalled(true);
    setIsInstalling(false);
  };

  const handleLaunchGame = async () => {
    console.log('Lancement du jeu...');
    alert('🎮 Axis se lance !');
  };

  return (
    <div className="h-full flex">
      {/* Sidebar à gauche */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        user={user}
      />

      {/* Contenu principal */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <HomeView
                serverInfo={serverInfo}
                gameInstalled={gameInstalled}
                isInstalling={isInstalling}
                downloadProgress={downloadProgress}
                onInstall={handleInstallGame}
                onLaunch={handleLaunchGame}
              />
            </motion.div>
          )}
          
          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <Settings />
            </motion.div>
          )}

          {currentView === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <NewsSection />
            </motion.div>
          )}

          {currentView === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <ShopSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const HomeView: React.FC<{
  serverInfo: ServerInfoType | null;
  gameInstalled: boolean;
  isInstalling: boolean;
  downloadProgress: number;
  onInstall: () => void;
  onLaunch: () => void;
}> = ({ serverInfo, gameInstalled, isInstalling, downloadProgress, onInstall, onLaunch }) => {
  return (
    <div className="h-full p-8 flex flex-col">
      {/* Header avec logo et badge */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
            LE PLUS POPULAIRE
          </span>
        </div>
        <h1 className="text-6xl font-bold text-white modern-font mb-2">
          AXIS
        </h1>
        <p className="text-xl text-white/80 modern-font">
          Axis est le premier serveur MMO RPG français. Nous proposons une aventure exclusive sur Minecraft !
        </p>
      </div>

      {/* Section principale avec bouton et sélecteur */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-8">
          <PlayButton
            gameInstalled={gameInstalled}
            isInstalling={isInstalling}
            downloadProgress={downloadProgress}
            onInstall={onInstall}
            onLaunch={onLaunch}
          />
          
          {/* Sélecteur de serveur */}
          <div className="mt-4 w-80">
            <select className="w-full p-3 glass-card-dark text-white rounded-lg modern-input">
              <option>🏛️ Axis</option>
            </select>
          </div>
        </div>

        {/* Informations serveur */}
        <ServerInfo serverInfo={serverInfo} />
      </div>

      {/* Section news et shop en bas */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <NewsSection compact />
        <ShopSection compact />
      </div>
    </div>
  );
};

export default MainLauncher;