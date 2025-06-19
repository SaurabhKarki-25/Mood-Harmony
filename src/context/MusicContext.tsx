import { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';
import { useMusicStore } from '../store/musicStore';

interface MusicContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  progress: number;
  duration: number;
  visualizerValues: number[];
  handleSeek: (value: number) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visualizerValues, setVisualizerValues] = useState<number[]>(Array(12).fill(0));
  
  const { currentSong, isPlaying, volume, nextSong } = useMusicStore();
  
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);
  
  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);
  
  // Handle progress update
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress(current);
    setDuration(duration);
    
    // Update visualizer
    updateVisualizer();
  };
  
  // Handle seek
  const handleSeek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };
  
  // Handle song end
  const handleEnded = () => {
    nextSong();
  };
  
  // Handle duration change
  const handleDurationChange = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };
  
  // Update visualizer (simulated for demo)
  const updateVisualizer = () => {
    // For demonstration, create random bar heights
    // In a real app, you'd use AudioContext and analyser to generate actual sound visualization
    const newValues = visualizerValues.map(() => Math.random() * 100);
    setVisualizerValues(newValues);
  };
  
  // Create an audio element for the music player
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('durationchange', handleDurationChange);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.pause();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Update source when current song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    
    audioRef.current.src = currentSong.audioUrl;
    audioRef.current.load();
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);
  
  return (
    <MusicContext.Provider
      value={{
        audioRef,
        progress,
        duration,
        visualizerValues,
        handleSeek,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};