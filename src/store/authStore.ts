import { create } from 'zustand';

type User = {
  id: string;
  username: string;
  email: string;
  avatar?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  updateProfile: (userData: Partial<User>) => void;
};

// For demo purposes, we'll simulate authentication with local storage
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: async (email: string, password: string) => {
    // Simulating API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo, we'll accept any login
    // In a real app, you'd validate with a backend
    const mockUser: User = {
      id: '1',
      username: email.split('@')[0],
      email,
      avatar: `https://source.boringavatars.com/beam/120/${email}?colors=6D28D9,0D9488,EC4899,22c55e,f59e0b`
    };
    
    localStorage.setItem('mh_user', JSON.stringify(mockUser));
    set({ user: mockUser, isAuthenticated: true, isLoading: false });
  },
  
  signUp: async (username: string, email: string, password: string) => {
    // Simulating API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we'll just create a user locally
    const mockUser: User = {
      id: Date.now().toString(),
      username,
      email,
      avatar: `https://source.boringavatars.com/beam/120/${username}?colors=6D28D9,0D9488,EC4899,22c55e,f59e0b`
    };
    
    localStorage.setItem('mh_user', JSON.stringify(mockUser));
    set({ user: mockUser, isAuthenticated: true, isLoading: false });
  },
  
  logout: () => {
    localStorage.removeItem('mh_user');
    set({ user: null, isAuthenticated: false });
  },
  
  checkAuth: () => {
    const storedUser = localStorage.getItem('mh_user');
    if (storedUser) {
      set({ 
        user: JSON.parse(storedUser), 
        isAuthenticated: true, 
        isLoading: false 
      });
    } else {
      set({ isLoading: false });
    }
  },
  
  updateProfile: (userData) => {
    set(state => {
      if (!state.user) return state;
      
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('mh_user', JSON.stringify(updatedUser));
      
      return { user: updatedUser };
    });
  }
}));