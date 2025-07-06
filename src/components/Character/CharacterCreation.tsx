// src/components/Character/CharacterCreation.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Shield, Sword, Zap, Heart, AlertTriangle } from 'lucide-react';

interface Race {
  id: string;
  name: string;
  description: string;
  image: string;
  traits: string[];
  bonuses: string[];
}

interface Class {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  startingItems: string[];
  playstyle: string;
}

interface CharacterCreationProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const races: Race[] = [
  {
    id: 'human',
    name: 'Humain',
    description: 'Les humains sont polyvalents et adaptables. Excellents commerçants et diplomates, ils prospèrent dans tous les environnements.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    traits: ['Polyvalent', 'Adaptable', 'Diplomate'],
    bonuses: ['+10% XP Commerce', '+5% Relations diplomatiques', 'Accès privilégié aux cités']
  },
  {
    id: 'elf',
    name: 'Elfe',
    description: 'Maîtres de la magie et de la nature, les elfes possèdent une longévité exceptionnelle et une affinité naturelle avec les éléments.',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop&crop=face',
    traits: ['Magique', 'Éternel', 'Sage'],
    bonuses: ['+15% Magie', '+10% Régénération mana', 'Vision nocturne']
  },
  {
    id: 'dwarf',
    name: 'Nain',
    description: 'Forgerons légendaires et guerriers redoutables, les nains excellent dans l\'artisanat et la résistance aux éléments.',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=300&fit=crop&crop=face',
    traits: ['Robuste', 'Artisan', 'Résistant'],
    bonuses: ['+20% Forge', '+15% Résistance', 'Détection de minerais']
  },
  {
    id: 'orc',
    name: 'Orc',
    description: 'Guerriers féroces aux instincts primitifs, les orcs compensent leur brutalité par une force et une endurance exceptionnelles.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
    traits: ['Puissant', 'Féroce', 'Endurant'],
    bonuses: ['+25% Force', '+10% Vitesse course', 'Régénération santé']
  }
];

const classes: Class[] = [
  {
    id: 'warrior',
    name: 'Guerrier',
    description: 'Maître du combat au corps à corps, le guerrier excelle dans l\'art de la guerre et la protection des alliés.',
    icon: <Shield size={24} />,
    startingItems: ['Épée en fer', 'Bouclier en chêne', 'Armure de cuir', '5 Potions de soin'],
    playstyle: 'Combat rapproché, Tank, Protection'
  },
  {
    id: 'mage',
    name: 'Mage',
    description: 'Manipulateur des arcanes, le mage utilise la magie pour infliger des dégâts à distance et contrôler le champ de bataille.',
    icon: <Zap size={24} />,
    startingItems: ['Bâton de novice', 'Robe de mage', 'Livre de sorts', '10 Potions de mana'],
    playstyle: 'Magie, Dégâts à distance, Contrôle'
  },
  {
    id: 'rogue',
    name: 'Voleur',
    description: 'Expert en discrétion et en agilité, le voleur privilégie la vitesse et la ruse à la force brute.',
    icon: <Sword size={24} />,
    startingItems: ['Dagues jumelles', 'Armure de cuir souple', 'Kit de crochetage', '3 Bombes fumigènes'],
    playstyle: 'Furtivité, Agilité, Dégâts critiques'
  },
  {
    id: 'healer',
    name: 'Soigneur',
    description: 'Gardien de la vie, le soigneur se consacre au soutien et à la guérison de ses compagnons d\'aventure.',
    icon: <Heart size={24} />,
    startingItems: ['Bâton de soin', 'Robe blanche', 'Herbes médicinales', '15 Potions de soin'],
    playstyle: 'Soutien, Guérison, Magie divine'
  }
];

const CharacterCreation: React.FC<CharacterCreationProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState<'race' | 'class'>('race');
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const handleRaceSelect = (race: Race) => {
    setSelectedRace(race);
    setStep('class');
  };

  const handleClassSelect = (characterClass: Class) => {
    setSelectedClass(characterClass);
  };

  const handleComplete = () => {
    if (selectedRace && selectedClass) {
      console.log('Personnage créé:', { race: selectedRace, class: selectedClass });
      onComplete();
      onClose();
    }
  };

  const handleClose = () => {
    setStep('race');
    setSelectedRace(null);
    setSelectedClass(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        <div className="glass-card-dark p-8 rounded-2xl border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {step === 'race' ? 'Choisissez votre race' : 'Choisissez votre classe'}
              </h2>
              <p className="text-white/60">
                {step === 'race' 
                  ? 'La race détermine vos capacités innées et ne peut être changée qu\'en supprimant votre personnage'
                  : 'La classe influence votre style de jeu initial et l\'équipement de départ'
                }
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Étapes */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              step === 'race' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/60'
            }`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">1</span>
              Race
            </div>
            <ChevronRight size={20} className="text-white/40" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              step === 'class' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/60'
            }`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">2</span>
              Classe
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'race' && (
              <motion.div
                key="race"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Avertissement */}
                <div className="warning-zone p-4 rounded-lg flex items-start gap-3">
                  <AlertTriangle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-300 font-medium mb-1">Choix permanent</p>
                    <p className="text-white/70 text-sm">
                      La race ne peut être modifiée qu'en supprimant votre personnage. Cette action effacera votre XP, 
                      réputation et habiletés, mais conservera votre inventaire.
                    </p>
                  </div>
                </div>

                {/* Grille des races */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {races.map((race) => (
                    <motion.div
                      key={race.id}
                      onClick={() => handleRaceSelect(race)}
                      className="glass-card-dark p-6 rounded-xl cursor-pointer hover-lift interactive-card"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={race.image} alt={race.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{race.name}</h3>
                          <p className="text-white/70 text-sm mb-4 leading-relaxed">{race.description}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-white/60 text-xs font-medium mb-2">TRAITS</p>
                              <div className="flex flex-wrap gap-2">
                                {race.traits.map((trait) => (
                                  <span key={trait} className="px-2 py-1 bg-white/10 rounded-lg text-white/80 text-xs">
                                    {trait}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-white/60 text-xs font-medium mb-2">BONUS</p>
                              <div className="space-y-1">
                                {race.bonuses.map((bonus) => (
                                  <p key={bonus} className="text-white/70 text-xs">• {bonus}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'class' && (
              <motion.div
                key="class"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Race sélectionnée */}
                {selectedRace && (
                  <div className="glass-card-dark p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img src={selectedRace.image} alt={selectedRace.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Race sélectionnée</p>
                        <h3 className="text-white font-semibold">{selectedRace.name}</h3>
                      </div>
                      <button
                        onClick={() => setStep('race')}
                        className="ml-auto text-white/60 hover:text-white text-sm underline"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                )}

                {/* Info classe */}
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    ℹ️ La classe dépend de votre style de jeu et ne définit que l'équipement de départ. 
                    Vous pourrez développer votre personnage dans toutes les directions par la suite.
                  </p>
                </div>

                {/* Grille des classes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classes.map((characterClass) => (
                    <motion.div
                      key={characterClass.id}
                      onClick={() => handleClassSelect(characterClass)}
                      className={`glass-card-dark p-6 rounded-xl cursor-pointer hover-lift interactive-card ${
                        selectedClass?.id === characterClass.id ? 'ring-2 ring-white/20' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                          {characterClass.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{characterClass.name}</h3>
                          <p className="text-white/70 text-sm mb-4 leading-relaxed">{characterClass.description}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-white/60 text-xs font-medium mb-2">STYLE DE JEU</p>
                              <p className="text-white/80 text-sm">{characterClass.playstyle}</p>
                            </div>
                            
                            <div>
                              <p className="text-white/60 text-xs font-medium mb-2">ÉQUIPEMENT DE DÉPART</p>
                              <div className="space-y-1">
                                {characterClass.startingItems.map((item) => (
                                  <p key={item} className="text-white/70 text-xs">• {item}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setStep('race')}
                    className="btn-secondary"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={!selectedClass}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Créer le personnage
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterCreation;