/* src/components/MainMenu/VideoBackground.tsx */
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, VolumeX, Volume2, Eye, EyeOff } from 'lucide-react';

const VideoBackground: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Vidéo d'arrière-plan */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          autoPlay
          playsInline
        >
          {/* Remplacez par votre vidéo */}
          <source src="https://cdn.ogc.nz/Minecraft%20Amazing%20Shaders%20Cinematic%20%20Complementary%20Reimagined%20%2B%20Another%20Vanilla%20PBR%20%204K%2060FPS.mp4 " type="video/mp4" />
        </video>
        
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Contrôles vidéo subtils */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-20 right-6 z-30 flex items-center gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Contrôles à gauche - apparaissent au hover */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isHovered && isVisible ? 1 : 0,
            x: isHovered && isVisible ? 0 : 20,
            pointerEvents: isHovered && isVisible ? 'auto' : 'none'
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2"
        >
          <motion.button
            onClick={togglePlayPause}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </motion.button>

          <motion.button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </motion.button>
        </motion.div>

        {/* Bouton visibilité à droite */}
        <motion.button
          onClick={toggleVisibility}
          className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isVisible ? "Masquer la vidéo" : "Afficher la vidéo"}
        >
          {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
        </motion.button>
      </motion.div>
    </>
  );
};

export default VideoBackground;