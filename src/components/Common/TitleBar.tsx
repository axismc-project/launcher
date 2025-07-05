import React from 'react';
import { X, Minus, Square } from 'lucide-react';

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
    <div className="h-8 bg-black/40 backdrop-blur-sm flex items-center justify-between px-4 border-b border-white/10" data-tauri-drag-region>
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-white text-sm font-medium modern-font">Axis Launcher</span>
      </div>
      <div className="flex space-x-1">
        <button
          onClick={handleMinimize}
          className="w-6 h-6 rounded flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <Minus size={12} />
        </button>
        <button
          onClick={handleMaximize}
          className="w-6 h-6 rounded flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <Square size={12} />
        </button>
        <button
          onClick={handleClose}
          className="w-6 h-6 rounded flex items-center justify-center text-white/60 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-all"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;