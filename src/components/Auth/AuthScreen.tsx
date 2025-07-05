import React, { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { ExternalLink, User, Lock, Mail } from 'lucide-react';

interface AuthScreenProps {
  supabase: SupabaseClient;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ supabase }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSignUp = () => {
    // Pour l'instant, simuler l'ouverture d'un site
    console.log('Redirection vers la création de compte');
  };

  const handleTestLogin = () => {
    // Mode test - connexion simulée
    setEmail('test@axis.com');
    setPassword('password123');
  };

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Particules animées en arrière-plan */}
      <div className="absolute inset-0 minecraft-particles"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Logo Axis */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 minecraft-font">
            AXIS
          </h1>
          <p className="text-xl text-gray-300 mt-2">Launcher MMO RPG</p>
        </motion.div>

        {/* Formulaire de connexion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/30 backdrop-blur-md rounded-2xl p-8 w-96 border border-purple-500/20"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Lock size={16} />
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm bg-red-900/20 border border-red-500/20 rounded-lg p-3"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed minecraft-button"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </motion.button>

            {/* Mode test */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleTestLogin}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all minecraft-button"
            >
              Mode Test
            </motion.button>

            <div className="text-center">
              <span className="text-gray-400">Pas encore de compte ?</span>
              <button
                type="button"
                onClick={handleSignUp}
                className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1 mx-auto mt-2"
              >
                <User size={16} />
                S'inscrire
                <ExternalLink size={14} />
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;