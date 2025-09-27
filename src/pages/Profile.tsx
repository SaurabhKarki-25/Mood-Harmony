import { useState, useEffect } from 'react';
import { User, CreditCard as Edit2, Camera, LogOut, Upload, Image } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useMusicStore } from '../store/musicStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, updateProfile, logout } = useAuthStore();
  const { playlists } = useMusicStore();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('file');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setAvatarUrl(user.avatar || '');
    }
    
    // Update the document title
    document.title = `${user?.username}'s Profile - MoodHarmony`;
  }, [user]);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAvatarUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
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
  
  const handleAvatarUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user && avatarUrl.trim()) {
      updateProfile({
        avatar: avatarUrl.trim(),
      });
      setShowAvatarModal(false);
      setUploadMethod('file'); // Reset to default
    }
  };
  
  const handleRemoveAvatar = () => {
    if (user) {
      updateProfile({
        avatar: undefined,
      });
      setAvatarUrl('');
      setShowAvatarModal(false);
      setUploadMethod('file'); // Reset to default
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
    <div className="pt-20 pb-8 relative">
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
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-surface-800">
                        <User size={64} className="text-surface-400" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowAvatarModal(true)}
                    className="absolute bottom-2 right-2 p-2 bg-surface-800 rounded-full border border-surface-700 hover:bg-surface-700 transition-colors"
                    aria-label="Change profile picture"
                  >
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
      
      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Upload className="mr-2" size={20} />
              Update Profile Picture
            </h3>
            
            {/* Upload Method Toggle */}
            <div className="flex mb-4 bg-surface-800 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setUploadMethod('file')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  uploadMethod === 'file'
                    ? 'bg-primary-600 text-white'
                    : 'text-surface-300 hover:text-white'
                }`}
              >
                <Image size={16} />
                <span>Upload File</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('url')}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  uploadMethod === 'url'
                    ? 'bg-primary-600 text-white'
                    : 'text-surface-300 hover:text-white'
                }`}
              >
                <Upload size={16} />
                <span>Image URL</span>
              </button>
            </div>
            
            <form onSubmit={handleAvatarUpdate} className="space-y-4">
              {uploadMethod === 'file' ? (
                <div>
                  <label htmlFor="avatarFile" className="block text-sm font-medium text-surface-300 mb-2">
                    Choose Image File
                  </label>
                  <input
                    id="avatarFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-surface-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700 file:cursor-pointer cursor-pointer"
                  />
                  <p className="text-xs text-surface-400 mt-1">
                    Select an image from your device (max 5MB)
                  </p>
                </div>
              ) : (
                <div>
                  <label htmlFor="avatarUrl" className="block text-sm font-medium text-surface-300 mb-2">
                    Image URL
                  </label>
                  <input
                    id="avatarUrl"
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/your-image.jpg"
                    className="input"
                  />
                  <p className="text-xs text-surface-400 mt-1">
                    Enter a direct link to your profile image
                  </p>
                </div>
              )}
              
              {avatarUrl && (
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-600">
                    <img 
                      src={avatarUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button 
                  type="submit" 
                  className="btn-primary flex-1"
                  disabled={!avatarUrl.trim()}
                >
                  Update Avatar
                </button>
                {user.avatar && (
                  <button 
                    type="button" 
                    onClick={handleRemoveAvatar}
                    className="btn-ghost text-error-500 hover:text-error-400"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <button 
                type="button" 
                onClick={() => {
                  setShowAvatarModal(false);
                  setAvatarUrl(user.avatar || '');
                  setUploadMethod('file');
                }}
                className="btn-ghost w-full"
              >
                Cancel
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;