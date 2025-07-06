import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings as SettingsIcon, 
  Gamepad2,
  Camera,
  Monitor,
  HardDrive,
  Cpu,
  AlertTriangle,
  Trash2,
  RefreshCw,
  Lock,
  Eye,
  ExternalLink,
  Folder,
  Save,
  Check
} from 'lucide-react';

interface GameSettings {
  minRam: number;
  maxRam: number;
  gameDirectory: string;
  resolutionWidth: number;
  resolutionHeight: number;
  fullscreen: boolean;
  javaPath: string;
}

interface UserProfile {
  pseudo: string;
  email: string;
  profilePicture: string;
  skinUrl: string;
  microsoftAccount: string;
  accountType: 'premium' | 'demo';
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'minecraft' | 'game'>('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRepairConfirm, setShowRepairConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [repairPassword, setRepairPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [userProfile] = useState<UserProfile>({
    pseudo: 'TestPlayer',
    email: 'test@axis.com',
    profilePicture: 'https://crafatar.com/avatars/steve?size=128&default=MHF_Steve&overlay',
    skinUrl: 'https://crafatar.com/renders/body/steve?size=256&default=MHF_Steve&overlay',
    microsoftAccount: 'test@outlook.com',
    accountType: 'premium'
  });

  const [gameSettings, setGameSettings] = useState<GameSettings>({
    minRam: 2048,
    maxRam: 8192,
    gameDirectory: '/home/user/.axis',
    resolutionWidth: 1920,
    resolutionHeight: 1080,
    fullscreen: false,
    javaPath: '/usr/bin/java'
  });

  const tabs = [
    { id: 'account', label: 'Compte', icon: User },
    { id: 'minecraft', label: 'Minecraft', icon: SettingsIcon },
    { id: 'game', label: 'Jeu', icon: Gamepad2 }
  ] as const;

  const updateGameSetting = (key: keyof GameSettings, value: any) => {
    setGameSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Paramètres sauvegardés:', gameSettings);
    setIsSaving(false);
  };

  const handleDeleteCharacter = async () => {
    if (deletePassword === 'delete') {
      console.log('Suppression du personnage confirmée');
      setShowDeleteConfirm(false);
      setDeletePassword('');
    }
  };

  const handleRepairCharacter = async () => {
    if (repairPassword === 'repair') {
      console.log('Réparation du personnage confirmée');
      setShowRepairConfirm(false);
      setRepairPassword('');
    }
  };

  const selectGameDirectory = () => {
    console.log('Sélection du dossier de jeu');
  };

  return (
    <div className="h-full flex bg-transparent">
      {/* Sidebar navigation */}
      <div className="w-64 modern-sidebar flex-shrink-0">
        <div className="p-6 h-full flex flex-col">
          <h1 className="text-2xl font-bold text-white mb-8 neon-text">Paramètres</h1>
          
          <div className="space-y-2 flex-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'tab-active text-green-400' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 lift-on-hover'
                  }
                `}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal avec scroll fixé */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="settings-scrollable">
          <AnimatePresence mode="wait">
            {activeTab === 'account' && (
              <AccountSettings key="account" userProfile={userProfile} />
            )}
            {activeTab === 'minecraft' && (
              <MinecraftSettings 
                key="minecraft" 
                settings={gameSettings} 
                updateSetting={updateGameSetting}
                onSelectDirectory={selectGameDirectory}
                onSave={handleSaveSettings}
                isSaving={isSaving}
              />
            )}
            {activeTab === 'game' && (
              <GameSettings 
                key="game" 
                userProfile={userProfile}
                showDeleteConfirm={showDeleteConfirm}
                setShowDeleteConfirm={setShowDeleteConfirm}
                showRepairConfirm={showRepairConfirm}
                setShowRepairConfirm={setShowRepairConfirm}
                deletePassword={deletePassword}
                setDeletePassword={setDeletePassword}
                repairPassword={repairPassword}
                setRepairPassword={setRepairPassword}
                onDeleteCharacter={handleDeleteCharacter}
                onRepairCharacter={handleRepairCharacter}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Composant Paramètres Compte
const AccountSettings: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => (
  <motion.div
   initial={{ opacity: 0, x: 20 }}
   animate={{ opacity: 1, x: 0 }}
   exit={{ opacity: 0, x: -20 }}
   className="settings-content"
 >
   <div className="p-8 space-y-8">
     <div>
       <h2 className="text-3xl font-bold text-white mb-2">Informations du compte</h2>
       <p className="text-white/60">Gérez vos informations personnelles et votre profil</p>
     </div>
     
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* Profil principal */}
       <div className="glass-card-dark p-6 rounded-xl">
         <div className="flex items-center gap-4 mb-6">
           <div className="p-2 rounded-lg bg-gray-500/20">
             <Camera className="text-gray-400" size={20} />
           </div>
           <h3 className="text-xl font-semibold text-white">Profil</h3>
         </div>
         
         <div className="flex items-center gap-6 mb-6">
           <div className="relative">
             <img 
               src={userProfile.profilePicture} 
               alt="Avatar" 
               className="w-20 h-20 rounded-xl border-2 border-gray-500/30"
             />
             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
           </div>
           <div>
             <h4 className="text-2xl font-bold text-white">{userProfile.pseudo}</h4>
             <p className="text-white/60">{userProfile.email}</p>
             <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
               userProfile.accountType === 'premium' 
                 ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                 : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
             }`}>
               {userProfile.accountType === 'premium' ? 'Compte Premium' : 'Compte Demo'}
             </span>
           </div>
         </div>

         <div className="space-y-4">
           <div>
             <label className="block text-white/80 text-sm font-medium mb-2">Pseudo</label>
             <input
               type="text"
               value={userProfile.pseudo}
               disabled
               className="modern-input w-full"
             />
           </div>
           
           <div>
             <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
             <input
               type="email"
               value={userProfile.email}
               disabled
               className="modern-input w-full"
             />
           </div>
         </div>
       </div>

       {/* Skin Minecraft */}
       <div className="glass-card-dark p-6 rounded-xl">
         <div className="flex items-center gap-4 mb-6">
           <div className="p-2 rounded-lg bg-gray-500/20">
             <Eye className="text-gray-400" size={20} />
           </div>
           <h3 className="text-xl font-semibold text-white">Skin Minecraft</h3>
         </div>
         
         <div className="text-center">
           <div className="relative inline-block mb-4">
             <img 
               src={userProfile.skinUrl} 
               alt="Skin Minecraft" 
               className="w-32 h-64 rounded-lg border border-white/20 bg-gray-800/50"
             />
           </div>
           <p className="text-white/60 text-sm mb-4">
             Aperçu de votre skin Minecraft actuel
           </p>
           <button className="btn-secondary flex items-center gap-2 mx-auto">
             <ExternalLink size={16} />
             Modifier sur Minecraft.net
           </button>
         </div>
       </div>
     </div>

     {/* Compte Microsoft */}
     <div className="glass-card-dark p-6 rounded-xl">
       <div className="flex items-center gap-4 mb-6">
         <div className="p-2 rounded-lg bg-gray-500/20">
           <Lock className="text-gray-400" size={20} />
         </div>
         <h3 className="text-xl font-semibold text-white">Compte Microsoft</h3>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
           <label className="block text-white/80 text-sm font-medium mb-2">Compte lié</label>
           <input
             type="text"
             value={userProfile.microsoftAccount}
             disabled
             className="modern-input w-full"
           />
         </div>
         
         <div className="flex items-end">
           <button className="btn-primary">
             Reconnecter le compte
           </button>
         </div>
       </div>
       
       <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg backdrop-blur-sm">
         <p className="text-blue-400 text-sm">
           ℹ️ Votre compte Microsoft est nécessaire pour jouer sur Axis. 
           Il permet la vérification de votre licence Minecraft et la synchronisation de votre profil.
         </p>
       </div>
     </div>
   </div>
 </motion.div>
);

// Composant Paramètres Minecraft
const MinecraftSettings: React.FC<{
 settings: GameSettings;
 updateSetting: (key: keyof GameSettings, value: any) => void;
 onSelectDirectory: () => void;
 onSave: () => void;
 isSaving: boolean;
}> = ({ settings, updateSetting, onSelectDirectory, onSave, isSaving }) => (
 <motion.div
   initial={{ opacity: 0, x: 20 }}
   animate={{ opacity: 1, x: 0 }}
   exit={{ opacity: 0, x: -20 }}
   className="h-full flex flex-col"
 >
   <div className="settings-content">
     <div className="p-8 space-y-8">
       <div>
         <h2 className="text-3xl font-bold text-white mb-2">Paramètres Minecraft</h2>
         <p className="text-white/60">Configurez les paramètres de lancement du jeu</p>
       </div>
       
       {/* Mémoire */}
       <div className="glass-card-dark p-6 rounded-xl">
         <div className="flex items-center gap-4 mb-6">
           <div className="p-2 rounded-lg bg-gray-500/20">
             <Cpu className="text-gray-400" size={20} />
           </div>
           <div>
             <h3 className="text-xl font-semibold text-white">Allocation mémoire</h3>
             <p className="text-white/60 text-sm">Gérez l'utilisation de la RAM par Minecraft</p>
           </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
             <label className="block text-white/80 text-sm font-medium mb-3">RAM minimale</label>
             <input
               type="range"
               min="1024"
               max="8192"
               step="512"
               value={settings.minRam}
               onChange={(e) => updateSetting('minRam', parseInt(e.target.value))}
               className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
             />
             <div className="flex justify-between text-sm text-white/40 mt-2">
               <span>1 GB</span>
               <span className="text-white font-semibold">{Math.round(settings.minRam / 1024)} GB</span>
               <span>8 GB</span>
             </div>
           </div>

           <div>
             <label className="block text-white/80 text-sm font-medium mb-3">RAM maximale</label>
             <input
               type="range"
               min="2048"
               max="32768"
               step="1024"
               value={settings.maxRam}
               onChange={(e) => updateSetting('maxRam', parseInt(e.target.value))}
               className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
             />
             <div className="flex justify-between text-sm text-white/40 mt-2">
               <span>2 GB</span>
               <span className="text-white font-semibold">{Math.round(settings.maxRam / 1024)} GB</span>
               <span>32 GB</span>
             </div>
           </div>
         </div>
         
         <div className="mt-4 p-4 warning-zone rounded-lg">
           <p className="text-yellow-400 text-sm">
             ⚠️ Assurez-vous que la RAM maximale ne dépasse pas 80% de votre RAM système totale.
           </p>
         </div>
       </div>

       {/* Dossier de jeu */}
       <div className="glass-card-dark p-6 rounded-xl">
         <div className="flex items-center gap-4 mb-6">
           <div className="p-2 rounded-lg bg-gray-500/20">
             <HardDrive className="text-gray-400" size={20} />
           </div>
           <div>
             <h3 className="text-xl font-semibold text-white">Dossier de jeu</h3>
             <p className="text-white/60 text-sm">Emplacement des fichiers de jeu</p>
           </div>
         </div>
         
         <div className="flex gap-3">
           <input
             type="text"
             value={settings.gameDirectory}
             onChange={(e) => updateSetting('gameDirectory', e.target.value)}
             className="modern-input flex-1"
             placeholder="/path/to/game/directory"
           />
           <button
             onClick={onSelectDirectory}
             className="btn-secondary flex items-center gap-2"
           >
             <Folder size={16} />
             Parcourir
           </button>
         </div>
         
         <p className="text-white/60 text-sm mt-3">
           Emplacement où seront stockés les fichiers du jeu, les mondes et les configurations.
         </p>
       </div>

       {/* Affichage */}
       <div className="glass-card-dark p-6 rounded-xl">
         <div className="flex items-center gap-4 mb-6">
           <div className="p-2 rounded-lg bg-gray-500/20">
             <Monitor className="text-gray-400" size={20} />
           </div>
           <div>
             <h3 className="text-xl font-semibold text-white">Affichage</h3>
             <p className="text-white/60 text-sm">Résolution et mode d'affichage</p>
           </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label className="block text-white/80 text-sm font-medium mb-2">Largeur</label>
             <input
               type="number"
               value={settings.resolutionWidth}
               onChange={(e) => updateSetting('resolutionWidth', parseInt(e.target.value))}
               className="modern-input w-full"
             />
           </div>

           <div>
             <label className="block text-white/80 text-sm font-medium mb-2">Hauteur</label>
             <input
               type="number"
               value={settings.resolutionHeight}
               onChange={(e) => updateSetting('resolutionHeight', parseInt(e.target.value))}
               className="modern-input w-full"
             />
           </div>

           <div className="flex items-end">
             <label className="flex items-center gap-3 cursor-pointer">
               <input
                 type="checkbox"
                 checked={settings.fullscreen}
                 onChange={(e) => updateSetting('fullscreen', e.target.checked)}
                 className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-gray-600 checked:border-gray-600 focus:ring-2 focus:ring-gray-500/20"
               />
               <span className="text-white/80">Plein écran</span>
             </label>
           </div>
         </div>
       </div>

       {/* Java */}
       <div className="glass-card-dark p-6 rounded-xl">
         <div className="flex items-center gap-4 mb-6">
           <div className="p-2 rounded-lg bg-gray-500/20">
             <SettingsIcon className="text-gray-400" size={20} />
           </div>
           <div>
             <h3 className="text-xl font-semibold text-white">Configuration Java</h3>
             <p className="text-white/60 text-sm">Paramètres d'exécution Java</p>
           </div>
         </div>
         
         <div>
           <label className="block text-white/80 text-sm font-medium mb-2">Chemin Java</label>
           <input
             type="text"
             value={settings.javaPath}
             onChange={(e) => updateSetting('javaPath', e.target.value)}
             className="modern-input w-full"
             placeholder="/usr/bin/java"
           />
           <p className="text-white/60 text-sm mt-2">
             Chemin vers l'exécutable Java. Laissez vide pour utiliser la détection automatique.
           </p>
         </div>
       </div>
     </div>
   </div>

   {/* Bouton de sauvegarde fixe */}
   <div className="border-t border-white/10 p-6 bg-black/20 backdrop-blur-sm">
     <div className="flex justify-end">
       <motion.button
         onClick={onSave}
         disabled={isSaving}
         className="btn-primary flex items-center gap-2"
         whileHover={!isSaving ? { scale: 1.02 } : {}}
         whileTap={!isSaving ? { scale: 0.98 } : {}}
       >
         {isSaving ? (
           <>
             <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
             Sauvegarde...
           </>
         ) : (
           <>
             <Save size={20} />
             Sauvegarder
           </>
         )}
       </motion.button>
     </div>
   </div>
 </motion.div>
);

// Composant Paramètres Jeu
const GameSettings: React.FC<{
 userProfile: UserProfile;
 showDeleteConfirm: boolean;
 setShowDeleteConfirm: (show: boolean) => void;
 showRepairConfirm: boolean;
 setShowRepairConfirm: (show: boolean) => void;
 deletePassword: string;
 setDeletePassword: (password: string) => void;
 repairPassword: string;
 setRepairPassword: (password: string) => void;
 onDeleteCharacter: () => void;
 onRepairCharacter: () => void;
}> = ({ 
 userProfile, 
 showDeleteConfirm, 
 setShowDeleteConfirm,
 showRepairConfirm,
 setShowRepairConfirm,
 deletePassword,
 setDeletePassword,
 repairPassword,
 setRepairPassword,
 onDeleteCharacter,
 onRepairCharacter
}) => (
 <motion.div
   initial={{ opacity: 0, x: 20 }}
   animate={{ opacity: 1, x: 0 }}
   exit={{ opacity: 0, x: -20 }}
   className="settings-content"
 >
   <div className="p-8 space-y-8">
     <div>
       <h2 className="text-3xl font-bold text-white mb-2">Gestion du personnage</h2>
       <p className="text-white/60">Gérez votre personnage et ses données</p>
     </div>
     
     {/* Informations du personnage */}
     <div className="glass-card-dark p-6 rounded-xl">
       <div className="flex items-center gap-4 mb-6">
         <div className="p-2 rounded-lg bg-gray-500/20">
           <User className="text-gray-400" size={20} />
         </div>
         <h3 className="text-xl font-semibold text-white">Personnage actuel</h3>
       </div>
       
       <div className="flex items-center gap-6">
         <img 
           src={userProfile.profilePicture} 
           alt="Avatar" 
           className="w-16 h-16 rounded-xl border-2 border-gray-500/30"
         />
         <div>
           <h4 className="text-xl font-bold text-white">{userProfile.pseudo}</h4>
           <p className="text-white/60">Niveau 42 • Guerrier</p>
           <p className="text-green-400 text-sm">Dernière connexion: il y a 2 heures</p>
         </div>
       </div>
     </div>

     {/* Zone de danger */}
     <div className="danger-zone glass-card-dark p-6 rounded-xl">
       <div className="flex items-center gap-3 mb-6">
         <div className="p-2 rounded-lg bg-red-500/20">
           <AlertTriangle className="text-red-400" size={20} />
         </div>
         <h3 className="text-red-400 font-semibold text-xl">Zone de danger</h3>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Réparation de personnage */}
         <div className="warning-zone p-6 rounded-lg">
           <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
             <RefreshCw size={20} />
             Réparation de personnage
           </h4>
           <p className="text-white/70 text-sm mb-4 leading-relaxed">
             Réinitialise votre personnage à son état initial en cas de problème. 
             Cela restaure votre position de spawn, votre inventaire de base et corrige 
             les données corrompues. <strong>Vous perdrez votre inventaire actuel et votre position.</strong>
           </p>
           
           {!showRepairConfirm ? (
             <button
               onClick={() => setShowRepairConfirm(true)}
               className="btn-warning flex items-center gap-2"
             >
               <RefreshCw size={16} />
               Réparer le personnage
             </button>
           ) : (
             <div className="space-y-3">
               <p className="text-yellow-300 text-sm font-medium">
                 Tapez "repair" pour confirmer:
               </p>
               <input
                 type="text"
                 value={repairPassword}
                 onChange={(e) => setRepairPassword(e.target.value)}
                 className="modern-input w-full"
                 placeholder="repair"
               />
               <div className="flex gap-2">
                 <button
                   onClick={onRepairCharacter}
                   disabled={repairPassword !== 'repair'}
                   className="btn-warning disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Confirmer
                 </button>
                 <button
                   onClick={() => {
                     setShowRepairConfirm(false);
                     setRepairPassword('');
                   }}
                   className="btn-secondary"
                 >
                   Annuler
                 </button>
               </div>
             </div>
           )}
         </div>

         {/* Suppression de personnage */}
         <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg backdrop-blur-sm">
           <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
             <Trash2 size={20} />
             Suppression de personnage
           </h4>
           <p className="text-white/70 text-sm mb-4 leading-relaxed">
             Supprime définitivement votre personnage et toutes ses données. 
             Cela inclut votre inventaire, vos constructions, votre progression, 
             vos statistiques et votre historique. <strong>Cette action est irréversible.</strong>
           </p>
           
           {!showDeleteConfirm ? (
             <button
               onClick={() => setShowDeleteConfirm(true)}
               className="btn-danger flex items-center gap-2"
             >
               <Trash2 size={16} />
               Supprimer le personnage
             </button>
           ) : (
             <div className="space-y-3">
               <p className="text-red-300 text-sm font-medium">
                 Tapez "delete" pour confirmer la suppression:
               </p>
               <input
                 type="text"
                 value={deletePassword}
                 onChange={(e) => setDeletePassword(e.target.value)}
                 className="modern-input w-full"
                 placeholder="delete"
               />
               <div className="flex gap-2">
                 <button
                   onClick={onDeleteCharacter}
                   disabled={deletePassword !== 'delete'}
                   className="btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   Supprimer définitivement
                 </button>
                 <button
                   onClick={() => {
                     setShowDeleteConfirm(false);
                     setDeletePassword('');
                   }}
                   className="btn-secondary"
                 >
                   Annuler
                 </button>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   </div>
 </motion.div>
);

export default Settings;