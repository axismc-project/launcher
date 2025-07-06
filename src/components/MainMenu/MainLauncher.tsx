/* src/components/MainMenu/MainLauncher.tsx */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Settings from '../Settings/Settings';
import Sidebar from './Sidebar';
import NewsSection from './NewsSection';
import VideoBackground from './VideoBackground';
import PlayButton from './PlayButton';
import CharacterCreation from '../Character/CharacterCreation';

const MainLauncher: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'settings' | 'news' | 'map'>('home');
  const [gameInstalled, setGameInstalled] = useState(false);
  const [hasCharacter, setHasCharacter] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState('0 MB/s');
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);

  const handleInstallGame = async () => {
    setIsInstalling(true);
    const speeds = ['12.3 MB/s', '15.7 MB/s', '18.2 MB/s', '14.5 MB/s', '16.8 MB/s'];
    
    for (let i = 0; i <= 100; i += 5) {
      setDownloadProgress(i);
      setDownloadSpeed(speeds[Math.floor(Math.random() * speeds.length)]);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setGameInstalled(true);
    setIsInstalling(false);
  };

  const handleCreateCharacter = () => {
    setShowCharacterCreation(true);
  };

  const handleCharacterCreated = () => {
    setHasCharacter(true);
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
                gameInstalled={gameInstalled}
                hasCharacter={hasCharacter}
                isInstalling={isInstalling}
                downloadProgress={downloadProgress}
                downloadSpeed={downloadSpeed}
                onInstall={handleInstallGame}
                onCreateCharacter={handleCreateCharacter}
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

          {currentView === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Carte du monde</h2>
                <p className="text-white/60">Fonctionnalité en cours de développement</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de création de personnage */}
      <CharacterCreation
        isOpen={showCharacterCreation}
        onClose={() => setShowCharacterCreation(false)}
        onComplete={handleCharacterCreated}
      />
    </div>
  );
};

const HomeView: React.FC<{
  gameInstalled: boolean;
  hasCharacter: boolean;
  isInstalling: boolean;
  downloadProgress: number;
  downloadSpeed: string;
  onInstall: () => void;
  onCreateCharacter: () => void;
  onLaunch: () => void;
}> = ({ 
  gameInstalled, 
  hasCharacter, 
  isInstalling, 
  downloadProgress, 
  downloadSpeed, 
  onInstall, 
  onCreateCharacter, 
  onLaunch 
}) => {
  return (
    <div className="h-full flex flex-col relative z-10">
      {/* Header en haut à gauche - Style glass blur */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-8 z-20"
      >
        <div className="glass-card-dark p-4 rounded-xl backdrop-blur-md border border-white/10">
          <div className="text-xs text-green-400 font-medium mb-1 tracking-wide">
            Alpha 0.0.1 - Version de développement
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold text-white">AXIS</h1>
            <span className="text-green-400 text-lg font-semibold">ONLINE</span>
          </div>
        </div>
      </motion.div>

      {/* Zone du bas avec infos et bouton */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
        {/* Infos de localisation à gauche - Style glass blur */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 max-w-md"
        >
          {/* Résidence principale */}
          <div className="glass-card-dark p-4 rounded-xl backdrop-blur-md border border-white/10">
            <div className="text-xs text-white/60 font-medium mb-2 uppercase tracking-wide">
              Résidence principale
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cité d'Émeraude</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              La capitale prospère du royaume d'Axis, connue pour ses tours de cristal 
              et ses jardins flottants. Centre névralgique du commerce et de la magie, 
              elle accueille les aventuriers du monde entier dans ses murs protecteurs.
            </p>
          </div>

          {/* Localisation actuelle */}
          <div className="glass-card-dark p-4 rounded-xl backdrop-blur-md border border-white/10">
            <div className="text-xs text-white/60 font-medium mb-2 uppercase tracking-wide">
              Localisation actuelle
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Taverne du Dragon d'Or</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Un lieu de rencontre chaleureux au cœur de la cité. Les aventuriers 
              s'y retrouvent pour partager leurs histoires, former des groupes 
              et planifier leurs prochaines quêtes autour d'une bonne bière.
            </p>
          </div>
        </motion.div>

        {/* Bouton Play à droite */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-end"
        >
          <PlayButton
            gameInstalled={gameInstalled}
            hasCharacter={hasCharacter}
            isInstalling={isInstalling}
            downloadProgress={downloadProgress}
            downloadSpeed={downloadSpeed}
            onInstall={onInstall}
            onCreateCharacter={onCreateCharacter}
            onLaunch={onLaunch}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MainLauncher;