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
  signUp: (username: string, email: string, password: string, avatar?: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  updateProfile: (userData: Partial<User>) => void;
};

// Helper functions to manage stored credentials
const getStoredCredentials = () => {
  const stored = localStorage.getItem('mh_credentials');
  return stored ? JSON.parse(stored) : {};
};

const storeCredentials = (email: string, password: string) => {
  const credentials = getStoredCredentials();
  credentials[email] = password;
  localStorage.setItem('mh_credentials', JSON.stringify(credentials));
};

const validateCredentials = (email: string, password: string) => {
  const credentials = getStoredCredentials();
  return credentials[email] === password;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    await new Promise(resolve => setTimeout(resolve, 800));

    if (validateCredentials(email, password)) {
      const mockUser: User = {
        id: 'mh' + Date.now().toString().slice(-6),
        username: email.split('@')[0],
        email,
        avatar: undefined
      };

      localStorage.setItem('mh_user', JSON.stringify(mockUser));
      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } else {
      set({ error: '🎧 Incorrect credentials. Please try again or sign up first.', isAuthenticated: false, isLoading: false });
    }
  },

  signUp: async (username, email, password, avatar) => {
    set({ isLoading: true, error: null });

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if email already exists
    const credentials = getStoredCredentials();
    if (credentials[email]) {
      set({ error: '🎧 Email already exists. Please use a different email or login instead.', isLoading: false });
      return;
    }

    // Store the new credentials
    storeCredentials(email, password);

    const mockUser: User = {
      id: 'mh' + Date.now().toString().slice(-6),
      username,
      email,
      avatar: avatar || undefined
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