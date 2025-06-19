import { useState, useEffect } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import PlaylistCard from '../components/music/PlaylistCard';
import { useMusicStore } from '../store/musicStore';
import { motion } from 'framer-motion';

const Playlists = () => {
  const { playlists, createPlaylist } = useMusicStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Update the document title
    document.title = 'Your Playlists - MoodHarmony';
  }, []);
  
  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      createPlaylist(name, description);
      setName('');
      setDescription('');
      setShowCreateForm(false);
    }
  };
  
  // Filter playlists based on search query
  const filteredPlaylists = playlists.filter(playlist => 
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="pt-20 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Your Playlists</h1>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusCircle size={18} />
            <span>Create Playlist</span>
          </button>
        </div>
        
        {/* Create Playlist Form */}
        {showCreateForm && (
          <motion.div 
            className="glass-card p-6 mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4">Create New Playlist</h2>
            <form onSubmit={handleCreatePlaylist} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-surface-300 mb-1">
                  Playlist Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="My Awesome Playlist"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-surface-300 mb-1">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input min-h-[80px]"
                  placeholder="What's this playlist about?"
                />
              </div>
              
              <div className="pt-2 flex space-x-3">
                <button type="submit" className="btn-primary">
                  Create Playlist
                </button>
                <button 
                  type="button" 
                  className="btn-ghost"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
        
        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search your playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
        </div>
        
        {/* Playlists Grid */}
        {filteredPlaylists.length === 0 ? (
          <div className="glass-card p-8 text-center">
            {searchQuery ? (
              <>
                <h3 className="text-xl font-semibold mb-2">No playlists found</h3>
                <p className="text-surface-400">
                  No playlists match your search for "{searchQuery}"
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2">No playlists yet</h3>
                <p className="text-surface-400 mb-4">
                  Create your first playlist to get started
                </p>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary"
                >
                  Create Your First Playlist
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaylists.map((playlist, index) => (
              <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Playlists;