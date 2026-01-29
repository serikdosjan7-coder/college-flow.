'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, BookOpen, Star, TrendingUp, Award, Settings, UserCheck, Crown, LogOut } from 'lucide-react';
import { studentGrades } from '@/lib/mockData';
import { useAuthStore } from '@/lib/roleStore';
import { useRouter } from 'next/navigation';

// Circular Progress Component
const CircularProgress = ({ value, max, size = 120, strokeWidth = 8, label }: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (value / max) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{value.toFixed(1)}</span>
        <span className="text-xs text-white/60">{label}</span>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('🔒 User not authenticated, redirecting to login');
      router.push('/login?redirect=/profile');
    }
  }, [isAuthenticated, router]);

  // Show loading or redirect if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p>Загрузка профиля...</p>
        </div>
      </div>
    );
  }
  
  const totalGPA = studentGrades.reduce((sum, subject) => sum + subject.average * subject.credits, 0) / 
                   studentGrades.reduce((sum, subject) => sum + subject.credits, 0);

  const handleLogout = () => {
    console.log('👋 User logging out');
    logout();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'from-yellow-500 to-orange-500';
      case 'TEACHER': return 'from-purple-500 to-pink-500';
      default: return 'from-cyan-500 to-blue-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN': return Crown;
      case 'TEACHER': return UserCheck;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pb-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-1/5 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Профиль пользователя
          </h1>
          <p className="text-white/70">Ваша информация и настройки</p>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6"
            style={{ backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.15)' }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className={`w-24 h-24 bg-gradient-to-r ${getRoleColor(user.role)} rounded-full flex items-center justify-center`}>
                  <RoleIcon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full px-2 py-1 text-xs text-white font-medium">
                  {user.role === 'ADMIN' ? 'Админ' : user.role === 'TEACHER' ? 'Препод' : 'Студент'}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                <div className="space-y-1 text-white/80">
                  {user.group && user.course && (
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                      <span>Группа {user.group} • {user.course} курс</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>ID: {user.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <CircularProgress value={totalGPA} max={5} label="GPA" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Role Information */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6"
            style={{ backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.15)' }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              Информация о роли
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                user.role === 'STUDENT' 
                  ? 'bg-cyan-500/30 border-cyan-400/70 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.4)]' 
                  : 'bg-white/5 border-white/20 text-white/70'
              }`}>
                <User className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium text-center">Студент</div>
                <div className="text-xs opacity-70 text-center">Базовый доступ</div>
              </div>

              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                user.role === 'TEACHER' 
                  ? 'bg-purple-500/30 border-purple-400/70 text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.4)]' 
                  : 'bg-white/5 border-white/20 text-white/70'
              }`}>
                <UserCheck className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium text-center">Преподаватель</div>
                <div className="text-xs opacity-70 text-center">Редактирование</div>
              </div>

              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                user.role === 'ADMIN' 
                  ? 'bg-yellow-500/30 border-yellow-400/70 text-yellow-300 shadow-[0_0_30px_rgba(255,215,0,0.4)]' 
                  : 'bg-white/5 border-white/20 text-white/70'
              }`}>
                <Crown className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium text-center">Администратор</div>
                <div className="text-xs opacity-70 text-center">Полный доступ</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-blue-400 text-sm font-medium mb-1">Ваша роль: {user.role}</div>
              <div className="text-white/70 text-xs">
                {user.role === 'ADMIN' && 'У вас есть доступ к панели администратора (/admin) и всем функциям системы'}
                {user.role === 'TEACHER' && 'Вы можете редактировать оценки, расписание и управлять материалами'}
                {user.role === 'STUDENT' && 'Вы можете просматривать расписание, материалы и участвовать в обмене навыками'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}