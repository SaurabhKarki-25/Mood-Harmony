import { NavLink } from 'react-router-dom';
import { Home, Music, Heart, PieChart, Headphones, ListMusic, User, Radio } from 'lucide-react';
import { useMusicStore } from '../../store/musicStore';

const Sidebar = () => {
  const { playlists } = useMusicStore();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Explore', path: '/explore', icon: <Music size={20} /> },
    { name: 'Moods', path: '/moods', icon: <Radio size={20} /> },
    { name: 'Your Library', path: '/playlists', icon: <ListMusic size={20} /> },
    { name: 'Your Profile', path: '/profile', icon: <User size={20} /> },
  ];
  
  // Show only first 3 playlists in sidebar
  const sidebarPlaylists = playlists.slice(0, 3);
  
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface-900/95 backdrop-blur-sm border-r border-surface-800 overflow-y-auto hidden md:block">
      <div className="p-4 flex flex-col h-full">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-600/20 text-primary-400' 
                    : 'text-surface-300 hover:bg-surface-800 hover:text-surface-50'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-8">
          <h3 className="px-4 text-xs uppercase font-semibold text-surface-400 mb-2">
            Your Playlists
          </h3>
          
          <nav className="space-y-1">
            {sidebarPlaylists.map((playlist) => (
              <NavLink
                key={playlist.id}
                to={`/playlists/${playlist.id}`}
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary-600/20 text-primary-400' 
                      : 'text-surface-300 hover:bg-surface-800 hover:text-surface-50'
                  }`
                }
              >
                <Heart size={16} className="text-accent-500" />
                <span className="truncate">{playlist.name}</span>
              </NavLink>
            ))}
            
            <NavLink
              to="/playlists"
              className="flex items-center space-x-3 px-4 py-2 text-surface-400 hover:text-surface-200 transition-colors"
            >
              <span>See all playlists...</span>
            </NavLink>
          </nav>
        </div>
        
        <div className="mt-auto mb-4">
          <div className="p-4 rounded-lg glass-card">
            <h3 className="font-semibold mb-2">Need a break?</h3>
            <p className="text-sm text-surface-300">Try our relaxation mood playlist to unwind and recharge.</p>
            <NavLink
              to="/moods"
              className="mt-3 inline-flex items-center space-x-2 text-sm text-primary-400 hover:text-primary-300"
            >
              <Headphones size={16} />
              <span>Explore moods</span>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;