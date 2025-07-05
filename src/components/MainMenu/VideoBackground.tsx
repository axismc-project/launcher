/* src/components/MainMenu/VideoBackground.tsx */
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react';

const VideoBackground: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
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
          <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
          {/* Fallback pour navigateurs qui ne supportent pas la vidéo */}
        </video>
        
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Contrôles vidéo en haut à droite - responsive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2"
      >
        {/* Bouton visibilité vidéo */}
        <motion.button
          onClick={toggleVisibility}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={isVisible ? "Masquer la vidéo" : "Afficher la vidéo"}
        >
          {isVisible ? (
            <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          ) : (
            <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.733 5.076a10.744 10.744 0 0 1 1.267-.074c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639a11.7 11.7 0 0 1-.885 1.343m-3.296 3.296A6.47 6.47 0 0 1 12 19.5c-4.638 0-8.573-3.007-9.963-7.178a1.012 1.012 0 0 1 0-.639 9.632 9.632 0 0 1 3.963-5.543m3.296-1.064 6.124 6.124m0 0L21.75 2.25M3 21.75l18-18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </motion.button>

        {/* Contrôles vidéo (seulement si vidéo visible) */}
        {isVisible && (
          <>
            <motion.button
              onClick={togglePlayPause}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} className="sm:w-4 sm:h-4" /> : <Play size={14} className="sm:w-4 sm:h-4" />}
            </motion.button>

            <motion.button
              onClick={toggleMute}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <VolumeX size={14} className="sm:w-4 sm:h-4" /> : <Volume2 size={14} className="sm:w-4 sm:h-4" />}
            </motion.button>
          </>
        )}
      </motion.div>
    </>
  );
};

export default VideoBackground;