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
        className="glass-card-dark p-6 rounded-xl"
      >
        <div className="flex items-center justify-center gap-3 text-white/60">
          <Server size={20} />
          <span className="modern-font">Connexion au serveur...</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card-dark p-6 rounded-xl"
    >
      <div className="grid grid-cols-3 gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Users className="text-green-400" size={20} />
          </div>
          <div>
            <p className="text-white/60 text-sm modern-font">Joueurs en ligne</p>
            <p className="text-white text-xl font-semibold modern-font">{serverInfo.online_players}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Clock className="text-blue-400" size={20} />
          </div>
          <div>
            <p className="text-white/60 text-sm modern-font">Heure serveur</p>
            <p className="text-white text-xl font-semibold modern-font">{serverInfo.server_time}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            serverInfo.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <Wifi className={serverInfo.status === 'online' ? 'text-green-400' : 'text-red-400'} size={20} />
          </div>
          <div>
            <p className="text-white/60 text-sm modern-font">Statut</p>
            <p className={`text-xl font-semibold modern-font ${
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