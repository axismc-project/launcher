/* src/components/Common/TitleBar.tsx */
import React from 'react';
import { X, Minus, Square, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const TitleBar: React.FC = () => {
  const handleMinimize = () => {
    console.log('Minimize window');
  };

  const handleMaximize = () => {
    console.log('Maximize window');
  };

  const handleClose = () => {
    console.log('Close window');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-8 sm:h-10 lg:h-11 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 border-b border-white/5 flex-shrink-0"
      data-tauri-drag-region
    >
      {/* Gauche - Traffic lights macOS style */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleClose}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors group"
          >
            <X size={6} className="opacity-0 group-hover:opacity-100 transition-opacity mx-auto text-white" />
          </button>
          <button
            onClick={handleMinimize}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors group"
          >
            <Minus size={6} className="opacity-0 group-hover:opacity-100 transition-opacity mx-auto text-white" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors group"
          >
            <Square size={4} className="opacity-0 group-hover:opacity-100 transition-opacity mx-auto text-white" />
          </button>
        </div>
      </div>

      {/* Centre - Titre */}
      <div className="flex items-center gap-2 sm:gap-3 absolute left-1/2 transform -translate-x-1/2">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <Circle size={10} className="sm:w-3 sm:h-3 text-white fill-current" />
        </div>
        <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-wide">
          Axis Launcher
        </span>
      </div>

      {/* Droite - Vide pour équilibrer */}
      <div className="w-16 sm:w-20"></div>
    </motion.div>
  );
};

export default TitleBar;