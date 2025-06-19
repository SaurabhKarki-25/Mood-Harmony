import { useMusicStore } from '../../store/musicStore';
import { useEffect, useRef } from 'react';

interface AddToPlaylistMenuProps {
  songId: string;
  onClose: () => void;
}

const AddToPlaylistMenu = ({ songId, onClose }: AddToPlaylistMenuProps) => {
  const { playlists, addSongToPlaylist } = useMusicStore();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleAddToPlaylist = (playlistId: string) => {
    addSongToPlaylist(playlistId, songId);
    onClose();
  };
  
  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-full mt-1 w-48 bg-surface-800 border border-surface-700 rounded-lg shadow-lg z-50"
    >
      <div className="py-1 px-2">
        <p className="text-xs font-medium text-surface-400 px-2 py-1">
          Add to playlist
        </p>
        {playlists.length === 0 ? (
          <p className="text-xs text-surface-500 px-2 py-2">No playlists available</p>
        ) : (
          <div className="max-h-48 overflow-y-auto">
            {playlists.map(playlist => (
              <button
                key={playlist.id}
                onClick={() => handleAddToPlaylist(playlist.id)}
                className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-surface-700 transition-colors truncate"
              >
                {playlist.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToPlaylistMenu;