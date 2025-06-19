import { Music4, Twitter, Instagram, Youtube, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-900 border-t border-surface-800 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-primary-500 font-display font-bold text-xl mb-4">
              <Music4 size={24} className="text-accent-500" />
              <span>MoodHarmony</span>
            </Link>
            <p className="text-surface-400 text-sm mb-4">
              Discover music that resonates with your emotions. Create playlists, explore new sounds, and let your mood guide your musical journey.
            </p>
            <div className="flex space-x-4 text-surface-500">
              <a href="#" className="hover:text-primary-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="lg:ml-auto">
            <h3 className="font-semibold text-surface-100 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-surface-400 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-surface-400 hover:text-primary-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/moods" className="text-surface-400 hover:text-primary-400 transition-colors">
                  Moods
                </Link>
              </li>
              <li>
                <Link to="/playlists" className="text-surface-400 hover:text-primary-400 transition-colors">
                  Playlists
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-surface-100 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-surface-400 hover:text-primary-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-surface-400 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-surface-400 hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-surface-400 hover:text-primary-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-surface-100 mb-4">Newsletter</h3>
            <p className="text-surface-400 text-sm mb-4">
              Get updates on new features, artist spotlights, and personalized playlists.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-surface-800 text-surface-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-surface-800 mt-8 pt-6 text-center text-surface-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MoodHarmony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;