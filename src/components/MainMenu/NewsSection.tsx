import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, MessageSquare } from 'lucide-react';

interface NewsSectionProps {
  compact?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ compact = false }) => {
  const news = [
    {
      id: 1,
      title: "Nouvelle mise à jour : Les Guildes",
      excerpt: "Découvrez le nouveau système de guildes avec des territoires à conquérir et des guerres épiques !",
      date: "Il y a 2 jours",
      views: 1250,
      comments: 45,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Event spécial Halloween",
      excerpt: "Participez à l'event Halloween et obtenez des récompenses exclusives !",
      date: "Il y a 5 jours",
      views: 890,
      comments: 23,
      image: "https://images.unsplash.com/photo-1509557965043-3bb4715c7d7c?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Optimisations serveur",
      excerpt: "Amélioration des performances et correction de bugs majeurs.",
      date: "Il y a 1 semaine",
      views: 567,
      comments: 12,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop"
    }
  ];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card-dark p-6 rounded-xl"
      >
        <h3 className="text-white text-xl font-semibold modern-font mb-4">Dernières nouvelles</h3>
        <div className="space-y-4">
          {news.slice(0, 2).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer hover-lift"
            >
              <h4 className="text-white font-medium modern-font mb-2 line-clamp-1">{item.title}</h4>
              <p className="text-white/60 text-sm modern-font line-clamp-2 mb-3">{item.excerpt}</p>
              <div className="flex items-center gap-4 text-white/40 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{item.views}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white modern-font mb-2">Actualités</h1>
        <p className="text-white/60 modern-font">Restez informé des dernières nouveautés d'Axis</p>
      </motion.div>

      <div className="grid gap-6">
        {news.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card-dark p-6 rounded-xl hover-lift cursor-pointer"
          >
            <div className="flex gap-6">
              <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-white text-xl font-semibold modern-font mb-3">{item.title}</h2>
                <p className="text-white/70 modern-font mb-4 line-clamp-2">{item.excerpt}</p>
                <div className="flex items-center gap-6 text-white/40 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{item.views} vues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span>{item.comments} commentaires</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;