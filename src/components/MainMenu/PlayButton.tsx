import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Loader, Settings } from 'lucide-react';

interface PlayButtonProps {
  gameInstalled: boolean;
  isInstalling: boolean;
  downloadProgress: number;
  downloadSpeed: string;
  onInstall: () => void;
  onLaunch: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  gameInstalled,
  isInstalling,
  downloadProgress,
  downloadSpeed,
  onInstall,
  onLaunch
}) => {
  const getButtonContent = () => {
    if (isInstalling) {
      return (
        <div className="flex items-center gap-3">
          <Loader className="animate-spin" size={20} />
          <span className="font-semibold text-lg">Installation...</span>
        </div>
      );
    }

    if (!gameInstalled) {
      return (
        <div className="flex items-center gap-3">
          <Download size={20} />
          <span className="font-semibold text-lg">Installer Axis</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <Play size={20} />
        <span className="font-semibold text-lg">Lancer le jeu</span>
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
    <div className="flex flex-col items-end gap-3">
      {/* Container boutons */}
      <div className="flex items-center gap-3">
        {/* Bouton principal plus large et moderne */}
        <motion.button
          onClick={handleClick}
          disabled={isInstalling}
          className={`
            px-8 py-4 rounded-2xl font-medium text-white transition-all duration-300 backdrop-blur-md
            text-lg shadow-2xl border border-white/20
            ${isInstalling 
              ? 'bg-gray-500/80 cursor-not-allowed border-gray-500/30' 
              : gameInstalled 
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-500/25 border-green-400/30' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25 border-blue-400/30'
            }
          `}
          whileHover={!isInstalling ? { scale: 1.02, y: -2 } : {}}
          whileTap={!isInstalling ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {getButtonContent()}
        </motion.button>

        {/* Bouton paramètres amélioré */}
        <motion.button
          className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          title="Paramètres de lancement"
        >
          <Settings size={20} />
        </motion.button>
      </div>

      {/* Barre de progression compacte */}
      {isInstalling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-dark p-3 rounded-xl backdrop-blur-md border border-white/20 min-w-[280px]"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/90 text-sm font-medium">Téléchargement en cours</span>
            <span className="text-green-400 text-sm font-semibold">{downloadProgress}%</span>
          </div>
          
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-md mb-2">
            <div 
              className="progress-bar h-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-xs">{downloadSpeed}</span>
            <span className="text-white/60 text-xs">
              {downloadProgress < 100 ? 'Téléchargement...' : 'Installation...'}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PlayButton;