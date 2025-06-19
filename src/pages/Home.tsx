import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Music, Play, Headphones, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  useEffect(() => {
    // Update the document title
    document.title = 'MoodHarmony - Music for Every Mood';
  }, []);
  
  const { isAuthenticated } = useAuthStore();
  
  const moods = [
    {
      name: 'Energetic',
      icon: '🔥',
      description: 'Upbeat tracks to boost your energy',
      color: 'from-yellow-500 to-red-500',
    },
    {
      name: 'Relaxed',
      icon: '🌊',
      description: 'Calm tunes to help you unwind',
      color: 'from-blue-500 to-purple-500',
    },
    {
      name: 'Focused',
      icon: '🧠',
      description: 'Background music for productivity',
      color: 'from-green-500 to-teal-500',
    },
    {
      name: 'Romantic',
      icon: '💖',
      description: 'Love songs for special moments',
      color: 'from-pink-500 to-red-500',
    },
  ];
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 via-surface-950/90 to-surface-950"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Music for <span className="text-primary-400">Every</span> Mood
              </h1>
              <p className="text-xl md:text-2xl text-surface-300 mb-8">
                Discover songs that match exactly how you feel. Your emotions, your playlist, your harmony.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-primary text-center px-8 py-3 text-lg">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="btn-primary text-center px-8 py-3 text-lg">
                      Get Started
                    </Link>
                    <Link to="/login" className="btn-ghost text-center px-8 py-3 text-lg">
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-surface-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Express Yourself Through Music</h2>
            <p className="text-xl text-surface-300">
              MoodHarmony creates personalized playlists based on how you feel, what you need, and who you are.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Headphones size={40} className="text-primary-500" />,
                title: 'Mood-Based Discovery',
                description: 'Find music that resonates with your current emotions and state of mind.',
              },
              {
                icon: <Heart size={40} className="text-accent-500" />,
                title: 'Create Custom Playlists',
                description: 'Build and share your perfect playlists for any moment or feeling.',
              },
              {
                icon: <Play size={40} className="text-secondary-500" />,
                title: 'Seamless Playback',
                description: 'Enjoy uninterrupted music with our intuitive player controls.',
              },
              {
                icon: <Sparkles size={40} className="text-yellow-500" />,
                title: 'Personalized Experience',
                description: 'Get recommendations that evolve with your listening habits and preferences.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 flex flex-col items-center text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-surface-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Moods Section */}
      <section className="py-20 bg-surface-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Find Your Mood</h2>
            <p className="text-xl text-surface-300">
              Explore music curated for different emotional states and environments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moods.map((mood, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="relative overflow-hidden rounded-xl aspect-square"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${mood.color} opacity-80`}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-3">{mood.icon}</span>
                  <h3 className="text-2xl font-bold mb-2">{mood.name}</h3>
                  <p className="text-surface-100 mb-4">{mood.description}</p>
                  <Link
                    to={isAuthenticated ? '/moods' : '/signup'}
                    className="btn-ghost bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  >
                    Explore
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-accent-900/90"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/761543/pexels-photo-761543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4">Ready to Find Your Harmony?</h2>
              <p className="text-xl text-surface-200 mb-8">
                Join thousands of music lovers who have discovered their perfect sound.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-primary text-center px-8 py-3 text-lg">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="btn-primary text-center px-8 py-3 text-lg">
                      Get Started for Free
                    </Link>
                    <Link to="/login" className="btn-ghost border border-white/20 text-center px-8 py-3 text-lg">
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;