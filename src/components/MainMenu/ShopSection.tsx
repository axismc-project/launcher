import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Zap, Crown, Shield } from 'lucide-react';

interface ShopSectionProps {
  compact?: boolean;
}

const ShopSection: React.FC<ShopSectionProps> = ({ compact = false }) => {
  const shopItems = [
    {
      id: 1,
      name: "Grade Titan",
      price: "20.00€",
      icon: Crown,
      color: "from-yellow-500 to-orange-500",
      features: ["Kit Titan", "Accès VIP", "Commandes spéciales"],
      popular: true
    },
    {
      id: 2,
      name: "Épée Légendaire",
      price: "15.00€",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      features: ["Dégâts +50%", "Effet foudre", "Enchantements max"],
      popular: false
    },
    {
      id: 3,
      name: "Armure Divine",
      price: "25.00€",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
      features: ["Protection ultime", "Résistance magique", "Auto-réparation"],
      popular: false
    }
  ];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card-dark p-6 rounded-xl"
      >
        <h3 className="text-white text-xl font-semibold modern-font mb-4">La boutique</h3>
        <div className="space-y-4">
          {shopItems.slice(0, 2).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="relative"
            >
              {item.popular && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center z-10">
                  <Star size={12} className="text-white" />
                </div>
              )}
              <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                    <item.icon size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium modern-font">{item.name}</h4>
                    <p className="text-green-400 font-semibold">{item.price}</p>
                  </div>
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
        <h1 className="text-4xl font-bold text-white modern-font mb-2">Boutique</h1>
        <p className="text-white/60 modern-font">Découvrez nos objets et grades exclusifs</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card-dark p-6 rounded-xl hover-lift cursor-pointer relative overflow-hidden"
          >
            {item.popular && (
              <div className="absolute top-4 right-4 px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                <Star size={12} />
                Populaire
              </div>
            )}

            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}>
              <item.icon size={24} className="text-white" />
            </div>

            <h3 className="text-white text-xl font-semibold modern-font mb-2">{item.name}</h3>
            <p className="text-green-400 text-2xl font-bold modern-font mb-4">{item.price}</p>

            <div className="space-y-2 mb-6">
              {item.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <motion.button
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-300 modern-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag size={16} className="inline mr-2" />
              Acheter
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShopSection;