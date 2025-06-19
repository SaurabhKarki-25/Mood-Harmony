import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, Edit2, Trash2, MoreHorizontal, Plus, ArrowLeft } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';
import SongCard from '../components/music/SongCard';
import { motion } from 'framer-motion';

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    playlists, 
    songs, 
    currentPlaylist,
    currentSong,
    isPlaying,
    setCurrentPlaylist,
    setCurrentSong,
    togglePlay,
    deletePlaylist,
  } = useMusicStore();
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  
  // Find the current playlist
  const playlist = playlists.find(p => p.id === id);
  
  useEffect(() => {
    if (playlist) {
      setPlaylistName(playlist.name);
      setPlaylistDescription(playlist.description || '');
      
      // Update the document title
      document.title = `${playlist.name} - MoodHarmony`;
    }
  }, [playlist]);
  
  // If playlist not found, redirect to playlists page
  useEffect(() => {
    if (!playlist && !isEditing) {
      navigate('/playlists');
    }
  }, [playlist, navigate, isEditing]);
  
  if (!playlist) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  // Get songs in this playlist
  const playlistSongs = songs.filter(song => playlist.songIds.includes(song.id));
  
  // Handle play/pause of the entire playlist
  const handlePlayPause = () => {
    if (currentPlaylist?.id === playlist.id && isPlaying) {
      togglePlay();
    } else {
      setCurrentPlaylist(playlist);
      setCurrentSong(playlistSongs[0]);
    }
  };
  
  // Handle playlist deletion
  const handleDelete = () => {
    deletePlaylist(playlist.id);
    navigate('/playlists');
  };
  
  // Handle playlist edit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd update the playlist in the backend
    setIsEditing(false);
  };
  
  return (
    <div className="pt-20 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button 
          onClick={() => navigate('/playlists')}
          className="flex items-center text-surface-400 hover:text-surface-200 mb-4"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to playlists
        </button>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Playlist Cover */}
          <div className="md:w-64 flex-shrink-0">
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
              <img 
                src={playlist.coverUrl}
                alt={playlist.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Playlist Info */}
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-surface-300 mb-1">
                    Playlist Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-surface-300 mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    id="description"
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                    className="input min-h-[80px]"
                  />
                </div>
                
                <div className="pt-2 flex space-x-3">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="btn-ghost"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-surface-400 mb-1">PLAYLIST</p>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{playlist.name}</h1>
                    {playlist.description && (
                      <p className="text-surface-300 mb-4">{playlist.description}</p>
                    )}
                    <p className="text-sm text-surface-400 mb-6">
                      {playlistSongs.length} songs • Created on {new Date(playlist.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="relative group">
                    <button className="p-2 text-surface-400 hover:text-surface-200">
                      <MoreHorizontal size={20} />
                    </button>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-surface-800 rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-10">
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-surface-700"
                      >
                        <Edit2 size={16} className="mr-2" />
                        Edit playlist
                      </button>
                      <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-error-500 hover:bg-surface-700"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Delete playlist
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mb-6">
                  <button 
                    onClick={handlePlayPause}
                    className="btn-primary flex items-center space-x-2"
                  >
                    {currentPlaylist?.id === playlist.id && isPlaying ? (
                      <>
                        <Pause size={18} />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Songs List */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold px-2">Songs</h2>
            <button className="btn-ghost flex items-center space-x-2">
              <Plus size={18} />
              <span>Add Songs</span>
            </button>
          </div>
          
          {playlistSongs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-surface-400 mb-4">This playlist is empty</p>
              <button className="btn-primary flex items-center space-x-2 mx-auto">
                <Plus size={18} />
                <span>Add Songs</span>
              </button>
            </div>
          ) : (
            <div>
              {playlistSongs.map((song, index) => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  index={index}
                  inPlaylist={true}
                  playlistId={playlist.id}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-surface-950/80 flex items-center justify-center z-50">
            <div className="glass-card p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Delete Playlist</h3>
              <p className="text-surface-300 mb-6">
                Are you sure you want to delete "{playlist.name}"? This action cannot be undone.
              </p>
              <div className="flex space-x-3 justify-end">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="btn-primary bg-error-600 hover:bg-error-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PlaylistDetail;