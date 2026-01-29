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
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
            });
            console.log('✅ Login successful:', data.user.role);
            return true;
          } else {
            console.error('❌ Login failed');
            return false;
          }
        } catch (error) {
          console.error('❌ Login error:', error);
          return false;
        }
      },

      signup: async (userData: any) => {
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
            });
            console.log('✅ Signup successful:', data.user.role);
            return true;
          } else {
            console.error('❌ Signup failed');
            return false;
          }
        } catch (error) {
          console.error('❌ Signup error:', error);
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        console.log('👋 Logged out');
      },

      switchRole: (role: UserRole) => {
        const { user } = get();
        if (user) {
          console.log('🔄 Switching role to:', role);
          set({
            user: { ...user, role },
          });
          console.log('✅ Role switched successfully to:', role);
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
  const { user, switchRole } = useAuthStore();
  return {
    currentRole: user?.role || 'STUDENT',
    userName: user?.name || 'Гость',
    userEmail: user?.email || '',
    switchRole,
  };
};