import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Music4, User, Search, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);
  
  // Determine header visibility based on route
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const headerClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-surface-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
  }`;
  
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary-500 font-display font-bold text-xl md:text-2xl"
          >
            <Music4 size={28} className="text-accent-500" />
            <span>MoodHarmony</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className={`font-medium hover:text-primary-400 transition-colors ${
                location.pathname === '/' ? 'text-primary-500' : 'text-surface-200'
              }`}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`font-medium hover:text-primary-400 transition-colors ${
                    location.pathname === '/dashboard' ? 'text-primary-500' : 'text-surface-200'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/moods" 
                  className={`font-medium hover:text-primary-400 transition-colors ${
                    location.pathname === '/moods' ? 'text-primary-500' : 'text-surface-200'
                  }`}
                >
                  Moods
                </Link>
                <Link 
                  to="/playlists" 
                  className={`font-medium hover:text-primary-400 transition-colors ${
                    location.pathname.includes('/playlists') ? 'text-primary-500' : 'text-surface-200'
                  }`}
                >
                  Playlists
                </Link>
                
                <div className="flex items-center space-x-4">
                  <button 
                    className="p-2 rounded-full hover:bg-surface-800 transition-colors"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                  
                  <div className="relative group">
                    <button className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-500">
                        {user?.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.username} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={32} />
                        )}
                      </div>
                    </button>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-surface-800 rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                      <div className="px-4 py-2 border-b border-surface-700">
                        <p className="font-medium text-sm">{user?.username}</p>
                        <p className="text-xs text-surface-400 truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-surface-700">
                        Profile
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          navigate('/');
                        }} 
                        className="block w-full text-left px-4 py-2 text-sm text-error-500 hover:bg-surface-700"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {!isAuthPage && (
                  <>
                    <Link to="/login" className="btn-ghost">Login</Link>
                    <Link to="/signup" className="btn-primary">Sign Up</Link>
                  </>
                )}
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-surface-200 hover:text-surface-50"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            className="fixed inset-0 top-16 bg-surface-900/95 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col p-4 space-y-4">
              <Link 
                to="/" 
                className={`font-medium text-lg py-2 hover:text-primary-400 transition-colors ${
                  location.pathname === '/' ? 'text-primary-500' : 'text-surface-200'
                }`}
              >
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`font-medium text-lg py-2 hover:text-primary-400 transition-colors ${
                      location.pathname === '/dashboard' ? 'text-primary-500' : 'text-surface-200'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/moods" 
                    className={`font-medium text-lg py-2 hover:text-primary-400 transition-colors ${
                      location.pathname === '/moods' ? 'text-primary-500' : 'text-surface-200'
                    }`}
                  >
                    Moods
                  </Link>
                  <Link 
                    to="/playlists" 
                    className={`font-medium text-lg py-2 hover:text-primary-400 transition-colors ${
                      location.pathname.includes('/playlists') ? 'text-primary-500' : 'text-surface-200'
                    }`}
                  >
                    Playlists
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`font-medium text-lg py-2 hover:text-primary-400 transition-colors ${
                      location.pathname === '/profile' ? 'text-primary-500' : 'text-surface-200'
                    }`}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }} 
                    className="text-left font-medium text-lg py-2 text-error-500 hover:text-error-400 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost w-full text-center py-3">Login</Link>
                  <Link to="/signup" className="btn-primary w-full text-center py-3">Sign Up</Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;