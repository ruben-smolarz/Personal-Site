import { X } from 'lucide-react';
import { useEffect } from 'react';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicyModal = ({ isOpen, onClose }: CookiePolicyModalProps) => {
  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Add class to body to fix position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      // Restore scroll when modal is closed
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // Reset scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup function to ensure scroll reset
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  // Prevent click propagation within modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 flex items-end justify-center p-4 bg-black/80 z- sm:items-center"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl bg-gray-900 rounded-t-lg shadow-xl sm:rounded-lg animate-slide-up"
        onClick={handleModalClick}
        style={{
          maxHeight: 'calc(100vh - 2rem)'
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Cookie Policy</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-white"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto text-sm text-gray-300" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
          <h3 className="mb-2 text-lg font-semibold text-white">Cookie Information</h3>
          
          <p>
          Last modified: {new Date().toLocaleDateString('en-US')}
          </p>
          
          <h4 className="mt-4 font-medium text-white">1. What are cookies?</h4>
          <p>
          Cookies are small text files that visited sites send to the user's device (computer, tablet, smartphone, notebook), where they are stored, to be retransmitted to the same sites on subsequent visits. They are used to perform computer authentication, session tracking, and storage of information about user activities.
          </p>
          
          <h4 className="mt-4 font-medium text-white">2. Types of cookies used</h4>
          
          <h5 className="mt-2 text-white">2.1 Technical cookies</h5>
          <p>
          These are used solely for the purpose of transmitting communication over an electronic communications network, or to the extent strictly necessary for the provider of a service explicitly requested by the user, in order to provide that service. They are not used for other purposes and are typically installed directly by the website owner. They can be divided into:
          </p>
          <ul className="pl-5 space-y-1 list-disc">
            <li>Navigation or session cookies, which ensure normal website navigation and use;</li>
            <li>Functional cookies, which allow the user to navigate according to selected criteria to improve the service provided.</li>
          </ul>
          
          <h5 className="mt-2 text-white">2.2 Analytical cookies</h5>
          <p>
            These are similar to technical cookies when used directly by the site owner to collect aggregated information about the number of users and how they visit the site.
          </p>
          
          <h5 className="mt-2 text-white">2.3 Profiling cookies</h5>
          <p>
            These aim to create user profiles and are used to send advertising messages in line with preferences expressed during web browsing.
          </p>
          
          <h4 className="mt-4 font-medium text-white">3. How to manage cookies</h4>
          <p>
            Users can choose whether to accept cookies through their browser settings. Disabling technical cookies may affect website functionality.
          </p>
          <p>
            Most browsers allow you to:
          </p>
          <ul className="pl-5 space-y-1 list-disc">
            <li>View existing cookies and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all cookies installation</li>
            <li>Delete all cookies when closing the browser</li>
          </ul>
          
          <h4 className="mt-4 font-medium text-white">4. Cookies used by this site</h4>
          <p>
            This site uses only essential technical cookies for proper functioning and to enhance user experience. We do not use profiling cookies.
          </p>
          
          <h4 className="mt-4 font-medium text-white">5. Cookie duration</h4>
          <p>
            Cookies have a duration determined by the expiration date set at creation. Some cookies are automatically deleted when closing the browser, others remain stored on devices until expiration or manual deletion.
          </p>
          
          <h4 className="mt-4 font-medium text-white">6. Cookie Policy updates</h4>
          <p>
            This Cookie Policy may be periodically updated to reflect changes in cookie usage or other operational, legal, or regulatory reasons. We recommend checking this page regularly for any updates.
          </p>
        </div>
        
        <div className="sticky bottom-0 z-10 flex justify-end p-4 bg-gray-900 border-t border-gray-800">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyModal;