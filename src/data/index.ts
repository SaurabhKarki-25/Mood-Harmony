import { SongType, PlaylistType, MoodType } from '../types';

// Moods data
export const moods: MoodType[] = [
  {
    id: 'mood-energetic',
    name: 'Energetic',
    description: 'Upbeat tracks to boost your energy',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'bg-gradient-to-r from-yellow-500 to-red-500',
  },
  {
    id: 'mood-relaxed',
    name: 'Relaxed',
    description: 'Calm tunes to help you unwind',
    imageUrl: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'bg-gradient-to-r from-blue-500 to-purple-500',
  },
  {
    id: 'mood-focused',
    name: 'Focused',
    description: 'Background music for productivity',
    imageUrl: 'https://images.pexels.com/photos/1486064/pexels-photo-1486064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'bg-gradient-to-r from-green-500 to-teal-500',
  },
  {
    id: 'mood-romantic',
    name: 'Romantic',
    description: 'Love songs for special moments',
    imageUrl: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'bg-gradient-to-r from-pink-500 to-red-500',
  },
  {
    id: 'mood-melancholic',
    name: 'Melancholic',
    description: 'Reflective songs for introspection',
    imageUrl: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'bg-gradient-to-r from-indigo-500 to-blue-500',
  },
  {
    id: 'mood-happy',
    name: 'Happy',
    description: 'Joyful tunes to lift your spirits',
    imageUrl: 'https://images.pexels.com/photos/1405963/pexels-photo-1405963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
  },
  {
    id: 'mood-nostalgic',
    name: 'Nostalgic',
    description: 'Classic hits from the past',
    imageUrl: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'bg-gradient-to-r from-amber-500 to-red-500',
  },
  {
    id: 'mood-workout',
    name: 'Workout',
    description: 'High-energy tracks for exercise',
    imageUrl: 'https://images.pexels.com/photos/28080/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: 'bg-gradient-to-r from-red-500 to-orange-500',
  },
];

// Songs data
export const songs: SongType[] = [
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
    coverUrl: 'https://images.unsplash.com/photo-1554043703-d5f9f935f09f',
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
    coverUrl: 'https://images.unsplash.com/photo-1600150180266-1f7c0cf17736',
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
    coverUrl: 'https://images.unsplash.com/photo-1601220672392-1a3997d404d8',
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
    coverUrl: 'https://images.unsplash.com/photo-1598260212739-7f1a6e0a8a4a',
    audioUrl: 'Her_1.mp3', // Add audio URL here after download
  },
 


];

// Default playlists
export const defaultPlaylists: PlaylistType[] = [
  {
    id: 'playlist-1',
    name: 'My Favorites',
    description: 'A collection of my all-time favorite songs',
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    songIds: ['song-1', 'song-4', 'song-7', 'song-10'],
    createdAt: '2023-01-15T12:00:00Z',
  },
  {
    id: 'playlist-2',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing after a long day',
    coverUrl: 'https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    songIds: ['song-2', 'song-5', 'song-8', 'song-13'],
    createdAt: '2023-02-20T15:30:00Z',
  },
  {
    id: 'playlist-3',
    name: 'Workout Mix',
    description: 'High-energy songs to keep you motivated',
    coverUrl: 'https://images.pexels.com/photos/896059/pexels-photo-896059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    songIds: ['song-3', 'song-6', 'song-9', 'song-12'],
    createdAt: '2023-03-10T09:45:00Z',
  },
];