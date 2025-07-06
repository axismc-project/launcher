import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';

interface Race {
  id: string;
  name: string;
  description: string;
  image: string;
  longDescription: string;
}

interface Class {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
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
    description: 'Polyvalent et adaptable',
    longDescription: 'Les humains sont une race équilibrée, excellant dans tous les domaines sans spécialisation particulière. Leur adaptabilité leur permet de prospérer dans n\'importe quel environnement.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face'
  },
  {
    id: 'elf',
    name: 'Elfe',
    description: 'Maître de la magie',
    longDescription: 'Les elfes possèdent une affinité naturelle avec la magie et une longévité exceptionnelle. Leur sagesse ancestrale leur confère une compréhension profonde des arcanes.',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=300&fit=crop&crop=face'
  },
  {
    id: 'dwarf',
    name: 'Nain',
    description: 'Forgeron légendaire',
    longDescription: 'Les nains sont réputés pour leur maîtrise de la forge et leur résistance exceptionnelle. Leur connaissance des métaux et des gemmes est inégalée.',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=300&fit=crop&crop=face'
  },
  {
    id: 'orc',
    name: 'Orc',
    description: 'Guerrier féroce',
    longDescription: 'Les orcs compensent leur brutalité apparente par une force et une endurance exceptionnelles. Leur instinct guerrier en fait des combattants redoutables.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop&crop=face'
  }
];

const classes: Class[] = [
  {
    id: 'warrior',
    name: 'Guerrier',
    description: 'Combat au corps à corps',
    longDescription: 'Maître du combat rapproché, le guerrier excelle dans l\'art de la guerre et la protection des alliés. Sa force et son endurance en font un tank redoutable.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop'
  },
  {
    id: 'mage',
    name: 'Mage',
    description: 'Magie et sorts',
    longDescription: 'Manipulateur des arcanes, le mage utilise la magie pour infliger des dégâts à distance et contrôler le champ de bataille avec ses sorts dévastateurs.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop'
  },
  {
    id: 'rogue',
    name: 'Voleur',
    description: 'Discrétion et agilité',
    longDescription: 'Expert en discrétion et en agilité, le voleur privilégie la vitesse et la ruse à la force brute. Ses attaques critiques sont dévastatrices.',
    image: 'https://images.unsplash.com/photo-1509557965043-3bb4715c7d7c?w=200&h=200&fit=crop'
  },
  {
    id: 'healer',
    name: 'Soigneur',
    description: 'Soutien et guérison',
    longDescription: 'Gardien de la vie, le soigneur se consacre au soutien et à la guérison de ses compagnons. Sa magie divine est essentielle en groupe.',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop'
  },
  {
    id: 'archer',
    name: 'Archer',
    description: 'Combat à distance',
    longDescription: 'Maître de l\'arc et des projectiles, l\'archer excelle dans le combat à distance. Sa précision mortelle permet d\'éliminer les ennemis avant qu\'ils n\'approchent.',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop'
  },
  {
    id: 'paladin',
    name: 'Paladin',
    description: 'Justice divine',
    longDescription: 'Guerrier saint combinant combat et magie divine, le paladin protège les innocents et combat les forces du mal avec sa foi inébranlable.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop'
  },
  {
    id: 'necromancer',
    name: 'Nécromancien',
    description: 'Magie noire',
    longDescription: 'Maître des arts interdits, le nécromancien manipule la mort et les ténèbres. Ses sorts sombres dreinent la vie de ses ennemis.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop'
  },
  {
    id: 'monk',
    name: 'Moine',
    description: 'Arts martiaux',
    longDescription: 'Adepte des arts martiaux, le moine canalise son énergie intérieure pour combattre. Sa vitesse et sa technique compensent sa faible armure.',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop'
  }
];

const CharacterCreation: React.FC<CharacterCreationProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState<'race' | 'class' | 'confirm'>('race');
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const handleRaceSelect = (race: Race) => {
    setSelectedRace(race);
    setStep('class');
  };

  const handleClassSelect = (characterClass: Class) => {
    setSelectedClass(characterClass);
    setStep('confirm');
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
                {step === 'race' && 'Choisissez votre race'}
                {step === 'class' && 'Choisissez votre classe'}
                {step === 'confirm' && 'Confirmation'}
              </h2>
              <p className="text-white/60">
                {step === 'race' && 'La race détermine vos capacités innées'}
                {step === 'class' && 'La classe influence votre style de jeu'}
                {step === 'confirm' && 'Votre personnage est prêt à être créé'}
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
            <ChevronRight size={20} className="text-white/40" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              step === 'confirm' ? 'bg-white/10 text-white' : 'bg-white/5 text-white/60'
            }`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">3</span>
              Confirmer
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
                      La race ne peut être modifiée qu'en supprimant votre personnage.
                    </p>
                  </div>
                </div>

                {/* Grille des races - 4 cartes côte à côte */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {races.map((race) => (
                    <motion.div
                      key={race.id}
                      onClick={() => handleRaceSelect(race)}
                      className="group glass-card-dark rounded-xl cursor-pointer hover-lift interactive-card overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Image */}
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={race.image} 
                          alt={race.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Contenu au hover */}
                      <div className="p-4 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold text-white mb-2">{race.name}</h3>
                        <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                          {race.description}
                        </p>
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white/70 text-xs leading-relaxed">
                            {race.longDescription}
                          </p>
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

                {/* Grille des classes - 2 rangées de 4 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {classes.map((characterClass) => (
                    <motion.div
                      key={characterClass.id}
                      onClick={() => handleClassSelect(characterClass)}
                      className={`group relative glass-card-dark rounded-xl cursor-pointer hover-lift interactive-card overflow-hidden h-48 ${
                        selectedClass?.id === characterClass.id ? 'ring-2 ring-white/20' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Image de fond */}
                      <div className="absolute inset-0">
                        <img 
                          src={characterClass.image} 
                          alt={characterClass.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                      </div>
                      
                      {/* Bannière du haut */}
                      <div className="absolute top-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 transform group-hover:-translate-y-full transition-transform duration-300">
                        <h3 className="text-white font-semibold text-sm">{characterClass.name}</h3>
                        <p className="text-white/70 text-xs">{characterClass.description}</p>
                      </div>
                      
                      {/* Contenu au hover */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">{characterClass.name}</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {characterClass.longDescription}
                        </p>
                      </div>
                      
                      {/* Indicateur de sélection */}
                      {selectedClass?.id === characterClass.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle size={16} className="text-white" />
                        </div>
                      )}
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
                    onClick={() => selectedClass && setStep('confirm')}
                    disabled={!selectedClass}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
                  <CheckCircle size={40} className="text-green-400" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Personnage prêt !</h3>
                  <div className="glass-card-dark p-6 rounded-xl max-w-md mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                      {selectedRace && (
                        <img src={selectedRace.image} alt={selectedRace.name} className="w-16 h-16 rounded-lg object-cover" />
                      )}
                      <div className="text-left">
                        <h4 className="text-white font-semibold">{selectedRace?.name}</h4>
                        <p className="text-white/60 text-sm">{selectedClass?.name}</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm">
                      Votre {selectedRace?.name.toLowerCase()} {selectedClass?.name.toLowerCase()} est prêt à explorer le monde d'Axis !
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setStep('class')}
                    className="btn-secondary"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleComplete}
                    className="btn-primary"
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