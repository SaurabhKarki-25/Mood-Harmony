import { Link } from 'react-router-dom';
import { PlayCircle, Music } from 'lucide-react';
import { PlaylistType } from '../../types';
import { useMusicStore } from '../../store/musicStore';
import { motion } from 'framer-motion';

interface PlaylistCardProps {
  playlist: PlaylistType;
  index: number;
}

const PlaylistCard = ({ playlist, index }: PlaylistCardProps) => {
  const { songs, setCurrentPlaylist, setCurrentSong } = useMusicStore();
  
  const playlistSongs = songs.filter(song => playlist.songIds.includes(song.id));
  const songCount = playlistSongs.length;
  
  const handlePlay = () => {
    setCurrentPlaylist(playlist);
    if (playlistSongs.length > 0) {
      setCurrentSong(playlistSongs[0]);
    }
  };
  
  return (
    <motion.div 
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary-900/10 hover:scale-[1.02]">
        <div className="relative aspect-square overflow-hidden">
          {playlist.coverUrl ? (
            <img 
              src={playlist.coverUrl} 
              alt={playlist.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-700">
              <Music size={48} className="text-surface-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <button
            onClick={handlePlay}
            className="absolute bottom-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
            aria-label={`Play ${playlist.name}`}
          >
            <PlayCircle size={42} className="fill-primary-600 text-surface-900" />
          </button>
        </div>
        
        <div className="p-4">
          <Link to={`/playlists/${playlist.id}`} className="block">
            <h3 className="font-semibold text-lg mb-1 truncate hover:text-primary-400 transition-colors">
              {playlist.name}
            </h3>
          </Link>
          <p className="text-surface-400 text-sm truncate">{songCount} songs</p>
          <p className="text-surface-500 text-xs mt-1">
            Created {new Date(playlist.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;