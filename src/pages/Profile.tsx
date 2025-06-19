import { useState, useEffect } from 'react';
import { User, Edit2, Camera, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useMusicStore } from '../store/musicStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, updateProfile, logout } = useAuthStore();
  const { playlists } = useMusicStore();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
    
    // Update the document title
    document.title = `${user?.username}'s Profile - MoodHarmony`;
  }, [user]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      updateProfile({
        username,
        email,
      });
      setIsEditing(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary-600">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.username} 
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-800">
                        <User size={64} className="text-surface-400" />
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-surface-800 rounded-full border border-surface-700 hover:bg-surface-700 transition-colors">
                    <Camera size={20} />
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 btn-ghost text-error-500 hover:text-error-400 mt-4"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
              
              {/* Profile Details */}
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-surface-300 mb-1">
                        Username
                      </label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-surface-300 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                      />
                    </div>
                    
                    <div className="pt-4 flex space-x-3">
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                      <button 
                        type="button" 
                        className="btn-ghost"
                        onClick={() => {
                          setIsEditing(false);
                          setUsername(user.username);
                          setEmail(user.email);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <h1 className="text-3xl font-bold mb-4">{user.username}</h1>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-surface-400 hover:text-surface-200"
                        aria-label="Edit profile"
                      >
                        <Edit2 size={20} />
                      </button>
                    </div>
                    
                    <p className="text-surface-400 mb-6">{user.email}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="glass-card p-4 text-center">
                        <h3 className="text-3xl font-bold text-primary-400 mb-1">{playlists.length}</h3>
                        <p className="text-surface-400">Playlists</p>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <h3 className="text-3xl font-bold text-secondary-400 mb-1">0</h3>
                        <p className="text-surface-400">Followers</p>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <h3 className="text-3xl font-bold text-accent-400 mb-1">0</h3>
                        <p className="text-surface-400">Following</p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Listening Stats</h2>
                      <div className="glass-card p-4">
                        <p className="text-center text-surface-400 py-4">
                          Start listening to see your music stats!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;