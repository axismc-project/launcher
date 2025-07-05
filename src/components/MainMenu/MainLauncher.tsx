/* src/components/MainMenu/MainLauncher.tsx */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServerInfo from './ServerInfo';
import PlayButton from './PlayButton';
import Settings from '../Settings/Settings';
import Sidebar from './Sidebar';
import NewsSection from './NewsSection';
import VideoBackground from './VideoBackground';

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
    <div className="h-full flex modern-background relative">
      {/* Vidéo d'arrière-plan uniquement pour la page d'accueil */}
      {currentView === 'home' && <VideoBackground />}
      
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
    <div className="h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="w-full max-w-5xl">
        {/* Header avec tag EN LIGNE - responsive */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 lg:mb-12"
        >
          <div className="flex items-center gap-4 mb-4 lg:mb-6">
            <span className="px-3 py-1.5 lg:px-4 lg:py-2 bg-green-500/20 text-green-400 text-xs sm:text-sm font-semibold rounded-full border border-green-500/30 flex items-center gap-2 backdrop-blur-md">
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-400 rounded-full animate-pulse"></div>
              EN LIGNE
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-3 lg:mb-4">
            AXIS
          </h1>
          <div className="backdrop-blur-sm bg-black/20 p-3 sm:p-4 rounded-lg max-w-xs sm:max-w-md lg:max-w-2xl">
            <p className="text-sm sm:text-lg lg:text-xl text-white/90 leading-relaxed">
              Le premier serveur MMO RPG français. Découvrez une aventure unique dans un monde 
              rempli de mystères, de guildes et de territoires à conquérir.
            </p>
          </div>
        </motion.div>

        {/* Bouton de jeu - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 lg:mb-8"
        >
          <PlayButton
            gameInstalled={gameInstalled}
            isInstalling={isInstalling}
            downloadProgress={downloadProgress}
            onInstall={onInstall}
            onLaunch={onLaunch}
          />
        </motion.div>

        {/* Card Informations serveur - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-full lg:max-w-4xl"
        >
          <ServerInfo serverInfo={serverInfo} />
        </motion.div>
      </div>
    </div>
  );
};

export default MainLauncher;