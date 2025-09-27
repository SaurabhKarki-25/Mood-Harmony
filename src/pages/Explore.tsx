import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SongCard from '../components/music/SongCard'; // Update the import path as needed
import { SongType } from '../types'; // Ensure this matches your project's structure

const Explore = () => {
  const [songs, setSongs] = useState<SongType[]>([]);

  useEffect(() => {
    // Set the page title
    document.title = 'Explore Music';

    // Simulate fetching songs (replace with real API call)
    setSongs([
       {
    id: 'song-1',
    title: 'Kesariya',
    artist: 'Arijit Singh',
    album: 'Brahmastra',
    duration: '5:04',
    year: 2022,
    moodIds: ['mood-romantic', 'mood-emotional'],
    coverUrl: 'Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg',
    audioUrl: 'kesariya.mp3', // Add audio URL here after download
  },
  {
    id: 'song-2',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    album: 'Aashiqui 2',
    duration: '4:22',
    year: 2013,
    moodIds: ['mood-romantic', 'mood-emotional'],
    coverUrl: 'maxresdefault.jpg',
    audioUrl: 'Tumhiho.mp3', // Add audio URL here after download
  },
  {
    id: 'song-3',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: 'Divide',
    duration: '3:53',
    year: 2017,
    moodIds: ['mood-happy', 'mood-dance'],
    coverUrl: 'Shape_Of_You_(Official_Single_Cover)_by_Ed_Sheeran.png',
    audioUrl: 'Shapeofyou.mp3', // Add audio URL here after download
  },
  {
    id: 'song-4',
    title: 'Stay',
    artist: 'The Kid LAROI, Justin Bieber',
    album: 'Stay',
    duration: '2:21',
    year: 2021,
    moodIds: ['mood-energetic', 'mood-romantic'],
    coverUrl: 'maxresdefault (1).jpg',
    audioUrl: 'Stay.mp3', // Add audio URL here after download
  },
  {
    id: 'song-5',
    title: 'Wavy',
    artist: 'Karan Aujla',
    album: 'Single',
    duration: '2:41',
    year: 2024,
    moodIds: ['mood-energetic', 'mood-confident'],
    coverUrl: 'artworks-7yyaboUmV7fdwXOL-yApK0g-t500x500.jpeg',
    audioUrl: 'Wavy.mp3',
  },
 
 {
    id: 'song-6',
    title: 'Taki Taki',
    artist: 'DJ Snake, Selena Gomez, Ozuna, Cardi B',
    album: 'Taki Taki',
    duration: '3:32',
    year: 2018,
    moodIds: ['mood-dance', 'mood-party'],
    coverUrl: 'Taki-Taki-Rumba.jpeg',
    audioUrl: 'Taki-Taki-Rumba.mp3', // Add audio URL here after download
  },
  {
    id: 'song-7',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:23',
    year: 2020,
    moodIds: ['mood-dance', 'mood-happy'],
    coverUrl: 'levitating.jpg',
    audioUrl: 'Levitating (PenduJatt.Com.Se).mp3', // Add audio URL here after download
  },
 {
    id: 'song-8',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    duration: '3:30',
    year: 2019,
    moodIds: ['mood-dance', 'mood-happy'],
    coverUrl: 'dancemonkey.jpeg',
    audioUrl: 'Dance Monkey Remix 2020 (PenduJatt.Com.Se).mp3', // Add audio URL here after download
  },
  {
    id: 'song-9',
    title: 'Her',
    artist: 'Subh',
    album: 'Her',
    duration: '4:05',
    year: 2020,
    moodIds: ['mood-romantic', 'mood-soft'],
    coverUrl: 'her.jpeg',
    audioUrl: 'Her_1.mp3', // Add audio URL here after download
  },
 

  
  
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-surface-900 text-surface-100 px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-8">Explore Music</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Explore;