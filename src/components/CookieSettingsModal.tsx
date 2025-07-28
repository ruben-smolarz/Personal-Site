import { useState } from 'react';
import { X } from 'lucide-react';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: CookieSettings) => void;
}

export interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieSettingsModal = ({ isOpen, onClose, onSave }: CookieSettingsModalProps) => {
  // Necessary cookies cannot be disabled
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // always active and not editable
    functional: true,
    analytics: false,
    marketing: false
  });

  if (!isOpen) return null;

  const handleToggle = (type: keyof CookieSettings) => {
    // Necessary cookies cannot be disabled
    if (type === 'necessary') return;
    
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    setSettings(allEnabled);
    onSave(allEnabled);
    onClose();
  };

  // Prevent click propagation within the modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 flex items-end justify-center bg-black/80 z- sm:items-center"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-gray-900 rounded-t-lg shadow-xl sm:rounded-lg animate-slide-up"
        onClick={handleModalClick}
        style={{
          maxHeight: 'calc(100vh - 2rem)'
        }}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Cookie Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-white"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto text-gray-300" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
          <p>
            Customize your cookie preferences. Necessary cookies are always active as they are essential for website functionality.
          </p>
          
          {/* Necessary Cookies */}
          <div className="p-4 rounded-lg bg-gray-800/60">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-white">Necessary Cookies</h4>
                <span className="text-xs text-gray-400">Always active</span>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={settings.necessary} 
                  disabled
                  className="sr-only"
                />
                <div className="block h-8 bg-blue-600 rounded-full w-14"></div>
                <div className="absolute w-6 h-6 transition-transform translate-x-6 bg-white rounded-full dot left-1 top-1"></div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              These cookies are essential for the website to function and cannot be disabled.
            </p>
          </div>
          
          {/* Functional Cookies */}
          <div className="p-4 rounded-lg bg-gray-800/60">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white">Functional Cookies</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.functional} 
                  onChange={() => handleToggle('functional')}
                  className="sr-only peer"
                />
                <div className="h-8 bg-gray-700 rounded-full w-14 peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.functional ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </label>
            </div>
            <p className="text-sm text-gray-400">
              These cookies enable the website to provide advanced functionality and personalization.
            </p>
          </div>
          
          {/* Analytical Cookies */}
          <div className="p-4 rounded-lg bg-gray-800/60">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white">Analytical Cookies</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.analytics} 
                  onChange={() => handleToggle('analytics')}
                  className="sr-only peer"
                />
                <div className="h-8 bg-gray-700 rounded-full w-14 peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.analytics ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </label>
            </div>
            <p className="text-sm text-gray-400">
              These cookies help us understand how visitors interact with the website by collecting and reporting anonymous information.
            </p>
          </div>
          
          {/* Marketing Cookies */}
          <div className="p-4 rounded-lg bg-gray-800/60">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-white">Marketing Cookies</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.marketing} 
                  onChange={() => handleToggle('marketing')}
                  className="sr-only peer"
                />
                <div className="h-8 bg-gray-700 rounded-full w-14 peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.marketing ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </label>
            </div>
            <p className="text-sm text-gray-400">
              These cookies are used to track visitors across websites to display relevant advertising.
            </p>
          </div>
        </div>
        
        <div className="sticky bottom-0 flex flex-col justify-between gap-3 p-4 bg-gray-900 border-t border-gray-800 sm:flex-row">
          <button 
            onClick={handleAcceptAll}
            className="order-2 px-4 py-2 font-medium text-white transition-colors duration-200 bg-green-600 rounded hover:bg-green-700 sm:order-1"
          >
            Accept All
          </button>
          <button
            onClick={handleSave}
            className="order-1 px-4 py-2 font-medium text-white transition-colors duration-200 bg-blue-600 rounded hover:bg-blue-700 sm:order-2"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsModal;