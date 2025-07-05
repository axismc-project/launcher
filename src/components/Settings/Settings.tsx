import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  HardDrive, 
  Monitor, 
  Volume2, 
  Trash2, 
  Save,
  Settings as SettingsIcon,
  AlertTriangle
} from 'lucide-react';

interface GameSettings {
  allocatedRam: number;
  javaPath: string;
  resolutionWidth: number;
  resolutionHeight: number;
  fullscreen: boolean;
  renderDistance: number;
  masterVolume: number;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<GameSettings>({
    allocatedRam: 4096,
    javaPath: '/usr/bin/java',
    resolutionWidth: 1920,
    resolutionHeight: 1080,
    fullscreen: false,
    renderDistance: 12,
    masterVolume: 0.8
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Paramètres sauvegardés:', settings);
    setIsSaving(false);
  };

  const handleUninstall = async () => {
    if (confirm('Êtes-vous sûr de vouloir désinstaller le client Axis ?')) {
      console.log('Désinstallation du client...');
    }
  };

  const updateSetting = (key: keyof GameSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-full overflow-y-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white modern-font mb-2">Paramètres</h1>
          <p className="text-white/60 modern-font">Configurez votre expérience de jeu</p>
        </div>

        {/* Sections des paramètres */}
        <div className="space-y-6">
          {/* Performance */}
          <SettingsSection 
            icon={<Cpu size={24} />}
            title="Performance"
            description="Optimisez les performances du jeu"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-3 modern-font">
                  RAM allouée
                </label>
                <input
                  type="range"
                  min="1024"
                  max="16384"
                  step="512"
                  value={settings.allocatedRam}
                  onChange={(e) => updateSetting('allocatedRam', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-white/40 mt-2">
                  <span>1 GB</span>
                  <span className="text-green-400 font-semibold">{Math.round(settings.allocatedRam / 1024)} GB</span>
                  <span>16 GB</span>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-3 modern-font">
                  Distance de rendu
                </label>
                <input
                  type="range"
                  min="2"
                  max="32"
                  value={settings.renderDistance}
                  onChange={(e) => updateSetting('renderDistance', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-white/40 mt-2">
                  <span>2 chunks</span>
                  <span className="text-green-400 font-semibold">{settings.renderDistance} chunks</span>
                  <span>32 chunks</span>
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Affichage */}
          <SettingsSection 
            icon={<Monitor size={24} />}
            title="Affichage"
            description="Paramètres de résolution et d'affichage"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2 modern-font">
                  Largeur
                </label>
                <input
                  type="number"
                  value={settings.resolutionWidth}
                  onChange={(e) => updateSetting('resolutionWidth', parseInt(e.target.value))}
                  className="w-full px-4 py-3 modern-input"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2 modern-font">
                  Hauteur
                </label>
                <input
                  type="number"
                  value={settings.resolutionHeight}
                  onChange={(e) => updateSetting('resolutionHeight', parseInt(e.target.value))}
                  className="w-full px-4 py-3 modern-input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.fullscreen}
                    onChange={(e) => updateSetting('fullscreen', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/20 bg-transparent checked:bg-green-500 checked:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  />
                  <span className="text-white/80 modern-font">Mode plein écran</span>
                </label>
              </div>
            </div>
          </SettingsSection>

          {/* Audio */}
          <SettingsSection 
            icon={<Volume2 size={24} />}
            title="Audio"
            description="Paramètres sonores"
          >
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3 modern-font">
                Volume principal
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.masterVolume}
                onChange={(e) => updateSetting('masterVolume', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-white/40 mt-2">
                <span>0%</span>
                <span className="text-green-400 font-semibold">{Math.round(settings.masterVolume * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </SettingsSection>

          {/* Avancé */}
          <SettingsSection 
            icon={<HardDrive size={24} />}
            title="Paramètres avancés"
            description="Configuration système"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2 modern-font">
                  Chemin Java
                </label>
                <input
                  type="text"
                  value={settings.javaPath}
                  onChange={(e) => updateSetting('javaPath', e.target.value)}
                  className="w-full px-4 py-3 modern-input"
                  placeholder="/usr/bin/java"
                />
              </div>

              <div className="glass-card p-6 border-2 border-red-500/20 bg-red-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-red-400" size={24} />
                  <h3 className="text-red-400 font-semibold modern-font">Zone de danger</h3>
                </div>
                <p className="text-white/70 text-sm modern-font mb-4">
                  Cette action supprimera complètement le client et tous les fichiers associés.
                </p>
                <motion.button
                  onClick={handleUninstall}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all modern-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 size={16} className="inline mr-2" />
                  Désinstaller
                </motion.button>
              </div>
            </div>
          </SettingsSection>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end mt-12 mb-8">
<motion.button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-all modern-button disabled:opacity-50 flex items-center gap-2"
            whileHover={!isSaving ? { scale: 1.02 } : {}}
            whileTap={!isSaving ? { scale: 0.98 } : {}}
          >
            <Save size={20} />
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ icon, title, description, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card-dark p-6 rounded-xl"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="text-green-400">{icon}</div>
      <div>
        <h2 className="text-xl font-semibold text-white modern-font">{title}</h2>
        <p className="text-white/60 text-sm modern-font">{description}</p>
      </div>
    </div>
    {children}
  </motion.div>
);

export default Settings;