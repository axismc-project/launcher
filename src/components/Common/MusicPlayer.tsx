import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VolumeX, Volume2, Music, Play, Pause } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-30"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="glass-card-dark rounded-full p-3 transition-all duration-300">
        <motion.div
          initial={false}
          animate={{ 
            width: isExpanded ? 200 : 48,
            height: 48
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <button
            onClick={togglePlayPause}
            className="w-6 h-6 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center flex-shrink-0"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
          
          <motion.div
            initial={false}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              width: isExpanded ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center ml-3 overflow-hidden"
          >
            <button
              onClick={toggleMute}
              className="text-white/60 hover:text-white transition-colors mr-2"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </motion.div>
        </motion.div>
      </div>
      
      <audio ref={audioRef} loop>
        {/* <source src="/assets/music/launcher-theme.mp3" type="audio/mpeg" /> */}
      </audio>
    </motion.div>
  );
};

export default MusicPlayer;