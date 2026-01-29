import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  group?: string;
  course?: number;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            console.log('✅ Login successful:', data.user.role);
            return { success: true };
          } else {
            set({ isLoading: false, error: data.error });
            console.error('❌ Login failed:', data.error);
            return { success: false, error: data.error };
          }
        } catch (error) {
          const errorMessage = 'Ошибка подключения к серверу';
          set({ isLoading: false, error: errorMessage });
          console.error('❌ Login error:', error);
          return { success: false, error: errorMessage };
        }
      },

      signup: async (userData: any) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (response.ok) {
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            console.log('✅ Signup successful:', data.user.role);
            return { success: true };
          } else {
            set({ isLoading: false, error: data.error });
            console.error('❌ Signup failed:', data.error);
            return { success: false, error: data.error };
          }
        } catch (error) {
          const errorMessage = 'Ошибка подключения к серверу';
          set({ isLoading: false, error: errorMessage });
          console.error('❌ Signup error:', error);
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        console.log('👋 Logged out');
        // Redirect to login page
        window.location.href = '/login';
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          return false;
        }

        try {
          const response = await fetch('/api/auth/verify', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              isAuthenticated: true,
            });
            return true;
          } else {
            // Token is invalid, clear auth state
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
            return false;
          }
        } catch (error) {
          console.error('❌ Auth check error:', error);
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// For backward compatibility with existing role store
export const useRoleStore = () => {
  const { user } = useAuthStore();
  return {
    currentRole: user?.role || 'STUDENT',
    userName: user?.name || 'Гость',
    userEmail: user?.email || '',
    isAuthenticated: !!user,
  };
};