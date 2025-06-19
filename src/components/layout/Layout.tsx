import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MusicPlayer from '../music/MusicPlayer';
import { useMusicStore } from '../../store/musicStore';
import { useAuthStore } from '../../store/authStore';

export const Layout = () => {
  const location = useLocation();
  const { currentSong } = useMusicStore();
  const { isAuthenticated } = useAuthStore();
  
  // Don't show sidebar on login and signup pages
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  // Only show player if authenticated and a song is selected
  const showPlayer = isAuthenticated && currentSong;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        {!isAuthPage && isAuthenticated && (
          <Sidebar />
        )}
        
        <main className={`flex-1 px-4 md:px-6 lg:px-8 ${showPlayer ? 'pb-28 md:pb-24' : 'pb-8'} ${!isAuthPage && isAuthenticated ? 'md:ml-64' : ''} pt-20`}>
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
      
      {showPlayer && <MusicPlayer />}
      
      {!isAuthPage && <Footer />}
    </div>
  );
};