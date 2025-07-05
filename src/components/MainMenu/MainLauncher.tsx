/* src/components/MainMenu/MainLauncher.tsx */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServerInfo from './ServerInfo';
import PlayButton from './PlayButton';
import Settings from '../Settings/Settings';
import Sidebar from './Sidebar';
import NewsSection from './NewsSection';

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
  const [currentView, setCurrentView] = useState<'home' | 'settings' | 'news' | 'map'>('home');
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
    <div className="h-full flex modern-background">
      {/* Sidebar à gauche */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        user={user}
      />

      {/* Contenu principal */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
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
              transition={{ duration: 0.4, ease: "easeInOut" }}
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
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full"
            >
              <NewsSection />
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
    <div className="h-full p-8 flex flex-col max-w-6xl mx-auto">
      {/* Header moderne */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="px-4 py-2 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full border border-green-500/30">
            LE PLUS POPULAIRE
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/60 text-sm">Serveur en ligne</span>
        </div>
        
        <h1 className="text-title bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
          AXIS
        </h1>
        <p className="text-subtitle max-w-2xl">
          Le premier serveur MMO RPG français. Découvrez une aventure unique dans un monde 
          rempli de mystères, de guildes et de territoires à conquérir.
        </p>
      </motion.div>

      {/* Section principale - Bouton et serveur */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PlayButton
            gameInstalled={gameInstalled}
            isInstalling={isInstalling}
            downloadProgress={downloadProgress}
            onInstall={onInstall}
            onLaunch={onLaunch}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ServerInfo serverInfo={serverInfo} />
        </motion.div>
      </div>

      {/* News en bas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <NewsSection compact />
      </motion.div>
    </div>
  );
};

export default MainLauncher;