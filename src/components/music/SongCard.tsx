import { useState } from 'react';
import { Play, Pause, MoreHorizontal, Plus } from 'lucide-react';
import { useMusicStore } from '../../store/musicStore';
import { SongType } from '../../types';
import { motion } from 'framer-motion';
import AddToPlaylistMenu from './AddToPlaylistMenu';

interface SongCardProps {
  song: SongType;
  index: number;
  inPlaylist?: boolean;
  playlistId?: string;
}

const SongCard = ({ song, index, inPlaylist, playlistId }: SongCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  
  const { 
    currentSong, 
    isPlaying, 
    setCurrentSong, 
    togglePlay,
    removeSongFromPlaylist 
  } = useMusicStore();
  
  const isCurrentSong = currentSong?.id === song.id;
  
  const handlePlayPause = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };
  
  const handleRemoveFromPlaylist = () => {
    if (playlistId) {
      removeSongFromPlaylist(playlistId, song.id);
    }
  };
  
  return (
    <motion.div 
      className="group p-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div 
        className={`flex items-center p-3 rounded-lg transition-all ${
          isCurrentSong 
            ? 'bg-primary-900/40 border border-primary-700/50' 
            : 'hover:bg-surface-800/70'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden mr-3 relative">
          <img 
            src={song.coverUrl}
            alt={song.title}
            className="w-full h-full object-cover"
          />
          {(isHovered || isCurrentSong) && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white"
              aria-label={isPlaying && isCurrentSong ? 'Pause' : 'Play'}
            >
              {isPlaying && isCurrentSong ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium truncate ${isCurrentSong ? 'text-primary-400' : ''}`}>
            {song.title}
          </h4>
          <p className="text-sm text-surface-400 truncate">{song.artist}</p>
        </div>
        
        <div className="ml-2 flex items-center space-x-1">
          <span className="text-xs text-surface-500">{song.duration}</span>
          
          <div className="relative">
            <button
              onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
              className="p-2 text-surface-500 hover:text-surface-300 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Add to playlist"
            >
              <Plus size={18} />
            </button>
            
            {showPlaylistMenu && (
              <AddToPlaylistMenu 
                songId={song.id} 
                onClose={() => setShowPlaylistMenu(false)} 
              />
            )}
          </div>
          
          {inPlaylist && (
            <button
              onClick={handleRemoveFromPlaylist}
              className="p-2 text-surface-500 hover:text-error-500 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove from playlist"
            >
              <MoreHorizontal size={18} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SongCard;