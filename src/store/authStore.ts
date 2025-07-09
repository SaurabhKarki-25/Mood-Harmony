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
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  updateProfile: (userData: Partial<User>) => void;
};

const MOCK_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo123'
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      const mockUser: User = {
        id: '1',
        username: email.split('@')[0],
        email,
        avatar: `https://source.boringavatars.com/beam/120/${email}?colors=6D28D9,0D9488,EC4899,22c55e,f59e0b`
      };

      localStorage.setItem('mh_user', JSON.stringify(mockUser));
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } else {
      set({ error: 'Invalid email or password!', isAuthenticated: false, isLoading: false });
    }
  },

  signUp: async (username: string, email: string, password: string) => {
    set({ isLoading: true, error: null });

    await new Promise(resolve => setTimeout(resolve, 1000));

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
    set({ user: null, isAuthenticated: false, error: null });
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
    set((state) => {
      if (!state.user) return state;

      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('mh_user', JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  }
}));
