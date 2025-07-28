import { useState, useEffect } from 'react';
import CookiePolicyModal from './CookiePolicyModal';
import CookieSettingsModal, { CookieSettings } from './CookieSettingsModal';

interface CookieConsentProps {
  onAccept: () => void;
}

const CookieConsent = ({ onAccept }: CookieConsentProps) => {
  const [visible, setVisible] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    // Controlla se il consenso ai cookie è già stato dato
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
     // Mostrar ventana emergente solo después de un breve retraso para mejorar la experiencia del usuario
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Guardar el consentimiento en localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
    onAccept();
  };

  const openPolicyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setPolicyModalOpen(false);
  };

  const openSettingsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  const handleSaveSettings = (settings: CookieSettings) => {
    // Guardar la configuración de cookies en localStorage
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    localStorage.setItem('cookieConsent', 'custom');
    setVisible(false);
    onAccept();
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-4 z-[9999] shadow-xl border-t border-indigo-700/50 backdrop-blur-sm transition-all duration-300 ease-in-out animate-fade-in">
        <div className="container flex flex-col items-center justify-center mx-auto sm:flex-row">
          <div className="justify-center mb-4 text-sm text-center sm:mb-0 sm:mr-8">
          📑We use cookies to provide you with an optimal experience and relevant communication.
            <button 
              onClick={openPolicyModal}
              className="mx-1 font-medium text-indigo-300 transition-colors duration-200 hover:text-white hover:underline focus:outline-none"
            >
              Read more
            </button> 
            o 
            <button
              onClick={openSettingsModal}
              className="mx-1 font-medium text-indigo-300 transition-colors duration-200 hover:text-white hover:underline focus:outline-none"
            >
              accept individual cookies
            </button>
          </div>
          <button
            onClick={handleAccept}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            I understand!
          </button>
        </div>
      </div>

      <CookiePolicyModal 
        isOpen={policyModalOpen} 
        onClose={closePolicyModal} 
      />

      <CookieSettingsModal
        isOpen={settingsModalOpen}
        onClose={closeSettingsModal}
        onSave={handleSaveSettings}
      />
    </>
  );
};

export default CookieConsent; 