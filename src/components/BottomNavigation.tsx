'use client';
import { Home, Calendar, Users, ArrowLeftRight, User, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRoleStore } from '@/lib/roleStore';

const getNavItems = (currentRole: string) => {
  const baseItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/schedule', icon: Calendar, label: 'Schedule' },
    { href: '/hub', icon: Users, label: 'Hub' },
    { href: '/swap', icon: ArrowLeftRight, label: 'Swap' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  // Add admin panel for admins
  if (currentRole === 'ADMIN') {
    return [
      ...baseItems.slice(0, -1), // All except Profile
      { href: '/admin', icon: Shield, label: 'Admin' },
      { href: '/profile', icon: User, label: 'Profile' },
    ];
  }

  return baseItems;
};

export default function BottomNavigation() {
  const pathname = usePathname();
  const { currentRole } = useRoleStore();
  const navItems = getNavItems(currentRole);

  console.log('🧭 Navigation rendered with role:', currentRole);

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
          
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 relative
                  ${isActive 
                    ? isAdmin 
                      ? 'bg-yellow-500/20 border border-yellow-400/30 shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                      : 'bg-white/10 border border-white/15 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    : 'hover:bg-white/5'
                  }
                `}
                style={{ 
                  backdropFilter: isActive ? 'blur(20px)' : 'none',
                  border: isActive 
                    ? isAdmin 
                      ? '2px solid rgba(255, 215, 0, 0.3)' 
                      : '0.5px solid rgba(255,255,255,0.15)'
                    : 'none'
                }}
              >
                <Icon 
                  className={`w-5 h-5 mb-1 transition-colors duration-300 ${
                    isActive 
                      ? isAdmin 
                        ? 'text-yellow-400' 
                        : 'text-cyan-400'
                      : 'text-white/70 hover:text-white'
                  }`} 
                />
                <span 
                  className={`text-xs font-medium transition-colors duration-300 ${
                    isActive 
                      ? isAdmin 
                        ? 'text-yellow-400' 
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
                      isAdmin ? 'bg-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.8)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                    }`}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}