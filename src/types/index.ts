// Song type definition
export interface SongType {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  year: number;
  moodIds: string[];
}

// Playlist type definition
export interface PlaylistType {
  id: string;
  name: string;
  description?: string;
  coverUrl: string;
  songIds: string[];
  createdAt: string;
}

// Mood type definition
export interface MoodType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  color: string;
}