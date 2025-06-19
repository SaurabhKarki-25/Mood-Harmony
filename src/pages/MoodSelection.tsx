import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMusicStore } from '../store/musicStore';
import MoodCard from '../components/music/MoodCard';
import SongCard from '../components/music/SongCard';

const MoodSelection = () => {
  const { moods, filterSongsByMood, filteredSongs } = useMusicStore();
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  
  useEffect(() => {
    // Update the document title
    document.title = 'Mood Selection - MoodHarmony';
  }, []);
  
  const handleMoodSelect = (moodId: string) => {
    if (selectedMoodId === moodId) {
      setSelectedMoodId(null);
      filterSongsByMood(null);
    } else {
      setSelectedMoodId(moodId);
      filterSongsByMood(moodId);
    }
  };
  
  return (
    <div className="pt-20 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Mood</h1>
          <p className="text-surface-300">
            Select a mood to discover music that matches how you feel.
          </p>
        </div>
        
        {/* Moods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {moods.map((mood, index) => (
            <MoodCard
              key={mood.id}
              mood={mood}
              isActive={selectedMoodId === mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              index={index}
            />
          ))}
        </div>
        
        {/* Songs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedMoodId 
              ? `Songs for ${moods.find(m => m.id === selectedMoodId)?.name}` 
              : 'All Songs'}
          </h2>
          
          <div className="glass-card p-4">
            {filteredSongs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-surface-400">
                  No songs found for this mood. Try selecting a different mood.
                </p>
              </div>
            ) : (
              <div>
                {filteredSongs.map((song, index) => (
                  <SongCard key={song.id} song={song} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MoodSelection;