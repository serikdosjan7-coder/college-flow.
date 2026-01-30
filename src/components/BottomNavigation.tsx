'use client';
import { Home, Calendar, Users, ArrowLeftRight, User, Shield, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRoleStore, useAuthStore } from '@/lib/roleStore';

const getNavItems = (currentRole: string, isAuthenticated: boolean, userName: string) => {
  if (!isAuthenticated) {
    // Guest navigation - show login/register buttons
    return [
      { href: '/', icon: Home, label: 'Home' },
      { href: '/schedule', icon: Calendar, label: 'Schedule' },
      { href: '/hub', icon: Users, label: 'Hub' },
      { href: '/swap', icon: ArrowLeftRight, label: 'Swap' },
      { href: '/login', icon: LogIn, label: 'Войти', isAuth: true },
    ];
  }

  // Authenticated navigation
  const baseItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/schedule', icon: Calendar, label: 'Schedule' },
    { href: '/hub', icon: Users, label: 'Hub' },
    { href: '/swap', icon: ArrowLeftRight, label: 'Swap' },
    { href: '/profile', icon: User, label: userName.split(' ')[0] || 'Profile' },
  ];

  // Add admin panel for admins
  if (currentRole === 'ADMIN') {
    return [
      ...baseItems.slice(0, -1), // All except Profile
      { href: '/admin', icon: Shield, label: 'Admin' },
      { href: '/profile', icon: User, label: userName.split(' ')[0] || 'Profile' },
    ];
  }

  return baseItems;
};

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole } = useRoleStore();
  const { isAuthenticated, user } = useAuthStore();
  const userName = user?.name || 'Гость';
  
  const navItems = getNavItems(currentRole, isAuthenticated, userName);

  console.log('🧭 Navigation rendered with role:', currentRole, 'authenticated:', isAuthenticated, 'user:', userName);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    // Profile page now handles guest users internally, no need to redirect here
    // Middleware will handle other protected routes
  };

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-[20px] border-t border-white/15"
      style={{ backdropFilter: 'blur(20px)' }}
    >
      <div className="flex justify-around items-center py-2 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isAdmin = item.href === '/admin';
          const isAuth = item.isAuth || false;
          
          return (
            <Link key={item.href} href={item.href} onClick={(e) => handleNavClick(item.href, e)}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 relative min-w-[60px]
                  ${isActive 
                    ? isAdmin 
                      ? 'bg-yellow-500/20 border border-yellow-400/30 shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                      : isAuth
                        ? 'bg-green-500/20 border border-green-400/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                        : 'bg-white/10 border border-white/15 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    : 'hover:bg-white/5'
                  }
                `}
                style={{ 
                  backdropFilter: isActive ? 'blur(20px)' : 'none',
                  border: isActive 
                    ? isAdmin 
                      ? '2px solid rgba(255, 215, 0, 0.3)' 
                      : isAuth
                        ? '2px solid rgba(34, 197, 94, 0.3)'
                        : '0.5px solid rgba(255,255,255,0.15)'
                    : 'none'
                }}
              >
                <Icon 
                  className={`w-5 h-5 mb-1 transition-colors duration-300 ${
                    isActive 
                      ? isAdmin 
                        ? 'text-yellow-400' 
                        : isAuth
                          ? 'text-green-400'
                          : 'text-cyan-400'
                      : 'text-white/70 hover:text-white'
                  }`} 
                />
                <span 
                  className={`text-xs font-medium transition-colors duration-300 ${
                    isActive 
                      ? isAdmin 
                        ? 'text-yellow-400' 
                        : isAuth
                          ? 'text-green-400'
                          : 'text-cyan-400'
                      : 'text-white/70'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      isAdmin 
                        ? 'bg-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.8)]' 
                        : isAuth
                          ? 'bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]'
                          : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                    }`}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Register button for guests (top right) */}
      {!isAuthenticated && (
        <Link href="/signup">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-12 right-4 bg-purple-500/20 backdrop-blur-[20px] border border-purple-400/30 rounded-full p-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="w-5 h-5 text-purple-400" />
          </motion.div>
        </Link>
      )}
    </motion.nav>
  );
}