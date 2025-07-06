// src/components/MainMenu/PlayButton.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Loader, Settings, UserPlus } from 'lucide-react';

interface PlayButtonProps {
  gameInstalled: boolean;
  hasCharacter: boolean;
  isInstalling: boolean;
  downloadProgress: number;
  downloadSpeed: string;
  onInstall: () => void;
  onCreateCharacter: () => void;
  onLaunch: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  gameInstalled,
  hasCharacter,
  isInstalling,
  downloadProgress,
  downloadSpeed,
  onInstall,
  onCreateCharacter,
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

    if (!hasCharacter) {
      return (
        <div className="flex items-center gap-3">
          <UserPlus size={20} />
          <span className="font-semibold text-lg">Créer son personnage</span>
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
    } else if (!hasCharacter) {
      onCreateCharacter();
    } else {
      onLaunch();
    }
  };

  const getButtonStyle = () => {
    if (isInstalling) {
      return 'bg-gray-500/80 cursor-not-allowed border-gray-500/30';
    }
    if (!gameInstalled) {
      return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25 border-blue-400/30';
    }
    if (!hasCharacter) {
      return 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/25 border-purple-400/30';
    }
    return 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-500/25 border-green-400/30';
  };

  return (
    <div className="flex flex-col items-end gap-3">
      {/* Container boutons */}
      <div className="flex items-center gap-3">
        {/* Bouton principal */}
        <motion.button
          onClick={handleClick}
          disabled={isInstalling}
          className={`
            px-8 py-4 rounded-2xl font-medium text-white transition-all duration-300 backdrop-blur-md
            text-lg shadow-2xl border border-white/20 ${getButtonStyle()}
          `}
          whileHover={!isInstalling ? { scale: 1.02, y: -2 } : {}}
          whileTap={!isInstalling ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {getButtonContent()}
        </motion.button>

        {/* Bouton paramètres (seulement si le jeu est installé) */}
        {gameInstalled && (
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
        )}
      </div>

      {/* Barre de progression (une seule) */}
      {isInstalling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-blur p-3 rounded-xl backdrop-blur-md border border-white/20 min-w-[280px]"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/90 text-sm font-medium">Téléchargement en cours</span>
            <span className="text-blue-400 text-sm font-semibold">{downloadProgress}%</span>
          </div>
          
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-md mb-2">
            <div 
              className="h-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
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