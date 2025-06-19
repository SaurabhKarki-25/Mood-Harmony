import { create } from 'zustand';
import { SongType, PlaylistType, MoodType } from '../types';
import { songs, moods, defaultPlaylists } from '../data';

interface MusicState {
  songs: SongType[];
  playlists: PlaylistType[];
  moods: MoodType[];
  currentSong: SongType | null;
  isPlaying: boolean;
  volume: number;
  currentPlaylist: PlaylistType | null;
  filteredSongs: SongType[];
  
  // Actions
  setCurrentSong: (song: SongType | null) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (volume: number) => void;
  createPlaylist: (name: string, description: string, coverUrl?: string) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  setCurrentPlaylist: (playlist: PlaylistType | null) => void;
  filterSongsByMood: (moodId: string | null) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  songs,
  playlists: defaultPlaylists,
  moods,
  currentSong: null,
  isPlaying: false,
  volume: 0.7,
  currentPlaylist: null,
  filteredSongs: songs,
  
  setCurrentSong: (song) => set({ currentSong: song, isPlaying: !!song }),
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  nextSong: () => {
    const { currentSong, songs, currentPlaylist } = get();
    
    if (!currentSong) return;
    
    const songList = currentPlaylist ? 
      songs.filter(song => currentPlaylist.songIds.includes(song.id)) : 
      songs;
    
    const currentIndex = songList.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songList.length;
    
    set({ currentSong: songList[nextIndex] });
  },
  
  prevSong: () => {
    const { currentSong, songs, currentPlaylist } = get();
    
    if (!currentSong) return;
    
    const songList = currentPlaylist ? 
      songs.filter(song => currentPlaylist.songIds.includes(song.id)) : 
      songs;
    
    const currentIndex = songList.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
    
    set({ currentSong: songList[prevIndex] });
  },
  
  setVolume: (volume) => set({ volume }),
  
  createPlaylist: (name, description, coverUrl) => {
    set((state) => {
      const newPlaylist: PlaylistType = {
        id: Date.now().toString(),
        name,
        description,
        coverUrl: coverUrl || `https://source.unsplash.com/random/300x300/?music,abstract&sig=${Date.now()}`,
        songIds: [],
        createdAt: new Date().toISOString(),
      };
      
      return { playlists: [...state.playlists, newPlaylist] };
    });
  },
  
  deletePlaylist: (id) => {
    set((state) => ({
      playlists: state.playlists.filter(playlist => playlist.id !== id),
      currentPlaylist: state.currentPlaylist?.id === id ? null : state.currentPlaylist
    }));
  },
  
  addSongToPlaylist: (playlistId, songId) => {
    set((state) => ({
      playlists: state.playlists.map(playlist => 
        playlist.id === playlistId && !playlist.songIds.includes(songId)
          ? { ...playlist, songIds: [...playlist.songIds, songId] }
          : playlist
      )
    }));
  },
  
  removeSongFromPlaylist: (playlistId, songId) => {
    set((state) => ({
      playlists: state.playlists.map(playlist => 
        playlist.id === playlistId
          ? { ...playlist, songIds: playlist.songIds.filter(id => id !== songId) }
          : playlist
      )
    }));
  },
  
  setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
  
  filterSongsByMood: (moodId) => {
    set((state) => {
      if (!moodId) {
        return { filteredSongs: state.songs };
      }
      
      return { 
        filteredSongs: state.songs.filter(song => 
          song.moodIds.includes(moodId)
        ) 
      };
    });
  },
}));