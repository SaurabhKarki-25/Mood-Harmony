import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, Clock, Music, ChevronRight } from 'lucide-react';
import { useMusicStore } from '../store/musicStore';
import { useAuthStore } from '../store/authStore';
import SongCard from '../components/music/SongCard';
import PlaylistCard from '../components/music/PlaylistCard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  
  const { user } = useAuthStore();
  const { songs, playlists, setCurrentSong } = useMusicStore();
  
  // Set the greeting based on the time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
    
    // Update the document title
    document.title = 'Dashboard - MoodHarmony';
  }, []);
  
  // Get a subset of recent songs
  const recentSongs = songs.slice(0, 5);
  
  // Get up to 4 playlists
  const dashboardPlaylists = playlists.slice(0, 4);
  
  // Get song recommendations (for demo, just use a slice of songs)
  const recommendations = songs.slice(5, 11);
  
  return (
    <div className="pt-20 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">{greeting}, {user?.username}</h1>
          <div className="flex items-center text-surface-400 text-sm">
            <Calendar size={16} className="mr-1" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        
        {/* Recently Played */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Recently Played</h2>
            <Link to="/history" className="text-sm text-primary-400 hover:text-primary-300 flex items-center">
              See All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="glass-card p-4">
            {recentSongs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>
        </section>
        
        {/* Your Playlists */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Your Playlists</h2>
            <Link to="/playlists" className="text-sm text-primary-400 hover:text-primary-300 flex items-center">
              See All <ChevronRight size={16} />
            </Link>
          </div>
          
          {playlists.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Music size={48} className="mx-auto text-surface-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No playlists yet</h3>
              <p className="text-surface-400 mb-4">Create your first playlist to get started</p>
              <Link to="/playlists" className="btn-primary">
                Create Playlist
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardPlaylists.map((playlist, index) => (
                <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
              ))}
            </div>
          )}
        </section>
        
        {/* Recommendations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Recommended For You</h2>
            <Link to="/explore" className="text-sm text-primary-400 hover:text-primary-300 flex items-center">
              More <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                onClick={() => setCurrentSong(song)}
              >
                <img 
                  src={song.coverUrl} 
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 to-transparent opacity-80"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-xl font-semibold mb-1 truncate">{song.title}</h3>
                  <p className="text-surface-300 truncate">{song.artist}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center text-sm text-surface-400">
                      <Clock size={14} className="mr-1" />
                      <span>{song.duration}</span>
                    </div>
                    <button className="p-2 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={16} fill="white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Dashboard;