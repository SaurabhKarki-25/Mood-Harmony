import { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, Volume1, VolumeX, 
  Repeat, Shuffle, Maximize2, Minimize2, Heart 
} from 'lucide-react';
import { useMusicStore } from '../../store/musicStore';
import { useMusicContext } from '../../context/MusicContext';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false); // State to track if user is dragging the progress bar
  
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    nextSong, 
    prevSong, 
    volume, 
    setVolume 
  } = useMusicStore();
  
  const { progress, duration, visualizerValues, handleSeek } = useMusicContext();
  
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === Infinity) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calculate progress percentage
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  
  // Handle seek when clicking or dragging on the progress bar
  const handleProgressClick = (e: React.MouseEvent) => {
    const progressBar = e.currentTarget;
    const offsetX = e.nativeEvent.offsetX;
    const width = progressBar.clientWidth;
    const newProgress = (offsetX / width) * duration;
    handleSeek(newProgress);
  };
  
  // Handle mouse move while dragging the progress bar
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSeeking) {
      const progressBar = e.currentTarget;
      const offsetX = e.nativeEvent.offsetX;
      const width = progressBar.clientWidth;
      const newProgress = (offsetX / width) * duration;
      handleSeek(newProgress);
    }
  };
  
  const handleMouseDown = () => setIsSeeking(true);
  const handleMouseUp = () => setIsSeeking(false);
  
  return (
    <AnimatePresence>
      <motion.div 
        className={`fixed bottom-0 w-full bg-surface-900/95 backdrop-blur-md border-t border-surface-800 z-40 transition-all duration-300 ${expanded ? 'h-[100vh] md:h-[500px]' : 'h-24'}`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex h-full">
          {expanded ? (
            <div className="flex flex-col md:flex-row w-full h-full py-6">
              {/* Album Art */}
              <div className="md:w-1/2 flex items-center justify-center p-4">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-lg relative group">
                  <img
                    src={currentSong?.coverUrl}
                    alt={currentSong?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Player Controls */}
              <div className="md:w-1/2 flex flex-col justify-center p-4">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">{currentSong?.title}</h2>
                  <p className="text-surface-400">{currentSong?.artist}</p>
                  <p className="text-sm text-surface-500 mt-2">{currentSong?.album}</p>
                </div>
                
                {/* Visualizer */}
                <div className="visualizer-container mb-8">
                  {visualizerValues.map((value, index) => (
                    <motion.div
                      key={index}
                      className="visualizer-bar"
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div 
                    className="h-1 bg-surface-700 rounded-full overflow-hidden cursor-pointer"
                    onClick={handleProgressClick} // Handle progress click
                    onMouseMove={handleMouseMove} // Handle mouse move while dragging
                    onMouseDown={handleMouseDown} // Start dragging
                    onMouseUp={handleMouseUp} // Stop dragging
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500" 
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-surface-400 mt-1">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-center space-x-6 md:space-x-8 mb-8">
                  <button className="text-surface-400 hover:text-surface-200">
                    <Shuffle size={18} />
                  </button>
                  <button 
                    onClick={prevSong}
                    className="text-surface-300 hover:text-surface-50"
                  >
                    <SkipBack size={28} />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-white transition-colors"
                  >
                    {isPlaying ? <Pause size={30} /> : <Play size={30} />}
                  </button>
                  <button 
                    onClick={nextSong}
                    className="text-surface-300 hover:text-surface-50"
                  >
                    <SkipForward size={28} />
                  </button>
                  <button className="text-surface-400 hover:text-surface-200">
                    <Repeat size={18} />
                  </button>
                </div>
                
                {/* Volume */}
                <div className="flex items-center space-x-3">
                  <button className="text-surface-400">
                    {volume === 0 ? (
                      <VolumeX size={20} />
                    ) : volume < 0.5 ? (
                      <Volume1 size={20} />
                    ) : (
                      <Volume2 size={20} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-surface-700 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Minimize button */}
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 p-2 text-surface-400 hover:text-surface-200"
                aria-label="Minimize player"
              >
                <Minimize2 size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              {/* Song Info */}
              <div className="flex items-center space-x-3 w-1/3">
                <div className="w-12 h-12 rounded overflow-hidden">
                  <img
                    src={currentSong?.coverUrl}
                    alt={currentSong?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="truncate">
                  <h4 className="font-medium truncate">{currentSong?.title}</h4>
                  <p className="text-sm text-surface-400 truncate">{currentSong?.artist}</p>
                </div>
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`transition-colors ${liked ? 'text-accent-500' : 'text-surface-500 hover:text-surface-300'}`}
                  aria-label={liked ? 'Unlike song' : 'Like song'}
                >
                  <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-4 w-1/3 justify-center">
                <button 
                  onClick={prevSong}
                  className="text-surface-300 hover:text-surface-50"
                  aria-label="Previous song"
                >
                  <SkipBack size={20} />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button 
                  onClick={nextSong}
                  className="text-surface-300 hover:text-surface-50"
                  aria-label="Next song"
                >
                  <SkipForward size={20} />
                </button>
              </div>
              
              {/* Progress and Expand */}
              <div className="flex items-center space-x-3 w-1/3 justify-end">
                <div className="hidden sm:block text-xs text-surface-400">
                  {formatTime(progress)} / {formatTime(duration)}
                </div>
                <div className="hidden md:block w-32 h-1 bg-surface-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => setExpanded(true)}
                  className="p-2 text-surface-400 hover:text-surface-200"
                  aria-label="Expand player"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer;
