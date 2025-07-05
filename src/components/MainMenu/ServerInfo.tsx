import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Wifi, Server } from 'lucide-react';

interface ServerInfoProps {
  serverInfo: {
    online_players: number;
    server_time: string;
    status: string;
  } | null;
}

const ServerInfo: React.FC<ServerInfoProps> = ({ serverInfo }) => {
  if (!serverInfo) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card-dark p-4 sm:p-6 rounded-xl backdrop-blur-md"
      >
        <div className="flex items-center gap-3 text-white/60">
          <Server size={20} />
          <span className="text-sm sm:text-base">Connexion au serveur...</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-dark p-4 sm:p-6 rounded-xl backdrop-blur-md border border-white/20"
    >
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Informations du serveur</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-500/30 backdrop-blur-sm flex items-center justify-center border border-green-500/30">
            <Users className="text-green-400" size={20} />
          </div>
          <div>
            <p className="text-white/70 text-xs sm:text-sm">Joueurs en ligne</p>
            <p className="text-white text-lg sm:text-2xl font-bold">{serverInfo.online_players}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500/30 backdrop-blur-sm flex items-center justify-center border border-blue-500/30">
            <Clock className="text-blue-400" size={20} />
          </div>
          <div>
            <p className="text-white/70 text-xs sm:text-sm">Heure serveur</p>
            <p className="text-white text-lg sm:text-2xl font-bold">{serverInfo.server_time}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl backdrop-blur-sm flex items-center justify-center border ${
            serverInfo.status === 'online' 
              ? 'bg-green-500/30 border-green-500/30' 
              : 'bg-red-500/30 border-red-500/30'
          }`}>
            <Wifi className={serverInfo.status === 'online' ? 'text-green-400' : 'text-red-400'} size={20} />
          </div>
          <div>
            <p className="text-white/70 text-xs sm:text-sm">Statut</p>
            <p className={`text-lg sm:text-2xl font-bold ${
              serverInfo.status === 'online' ? 'text-green-400' : 'text-red-400'
            }`}>
              {serverInfo.status === 'online' ? 'En ligne' : 'Hors ligne'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServerInfo;