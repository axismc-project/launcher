import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Loader, Settings } from 'lucide-react';

interface PlayButtonProps {
  gameInstalled: boolean;
  isInstalling: boolean;
  downloadProgress: number;
  onInstall: () => void;
  onLaunch: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  gameInstalled,
  isInstalling,
  downloadProgress,
  onInstall,
  onLaunch
}) => {
  const getButtonContent = () => {
    if (isInstalling) {
      return (
        <div className="flex items-center gap-2 sm:gap-3">
          <Loader className="animate-spin" size={16} />
          <span className="font-medium text-sm sm:text-base">Installation...</span>
        </div>
      );
    }

    if (!gameInstalled) {
      return (
        <div className="flex items-center gap-2 sm:gap-3">
          <Download size={16} />
          <span className="font-medium text-sm sm:text-base">Installer</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Play size={16} />
        <span className="font-medium text-sm sm:text-base">Jouer</span>
      </div>
    );
  };

  const handleClick = () => {
    if (isInstalling) return;
    
    if (!gameInstalled) {
      onInstall();
    } else {
      onLaunch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Bouton principal */}
        <motion.button
          onClick={handleClick}
          disabled={isInstalling}
          className={`
            px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium text-white transition-all duration-300 backdrop-blur-md
            ${isInstalling 
              ? 'bg-gray-500/80 cursor-not-allowed' 
              : gameInstalled 
                ? 'bg-green-500/90 hover:bg-green-600/90 shadow-lg shadow-green-500/25' 
                : 'bg-orange-500/90 hover:bg-orange-600/90 shadow-lg shadow-orange-500/25'
            }
          `}
          whileHover={!isInstalling ? { scale: 1.02 } : {}}
          whileTap={!isInstalling ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {getButtonContent()}
        </motion.button>

        {/* Bouton paramètres */}
        <motion.button
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          title="Paramètres de lancement"
        >
          <Settings size={16} className="sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      {/* Barre de progression */}
      {isInstalling && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          className="w-full sm:w-48 lg:w-64"
        >
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-md">
            <div 
              className="progress-bar h-full transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
          <div className="text-white/90 text-xs sm:text-sm mt-1 backdrop-blur-sm">
            {downloadProgress}% - Téléchargement en cours...
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PlayButton;