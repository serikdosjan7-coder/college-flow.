'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, BookOpen, Star, TrendingUp, Award, Settings, UserCheck, Crown, LogOut, LogIn, UserPlus } from 'lucide-react';
import { studentGrades } from '@/lib/mockData';
import { useAuthStore } from '@/lib/roleStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Social Login Icons (using Lucide icons as placeholders)
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

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

// Guest Profile Component
const GuestProfile = () => {
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
            Добро пожаловать
          </h1>
          <p className="text-white/70">Войдите или зарегистрируйтесь в College Flow</p>
        </motion.div>

        {/* Guest Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-8"
            style={{ backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.15)' }}
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Гость</h2>
              <p className="text-white/60 mb-8">Для доступа к функциям приложения необходимо войти в систему</p>

              {/* Login and Register Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-5 h-5" />
                    Войти
                  </motion.button>
                </Link>

                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Регистрация
                  </motion.button>
                </Link>
              </div>

              {/* Social Login Options */}
              <div className="border-t border-white/20 pt-6">
                <p className="text-white/60 text-sm mb-4">Или войдите через:</p>
                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                    onClick={() => alert('Google login coming soon!')}
                  >
                    <GoogleIcon />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-white"
                    onClick={() => alert('GitHub login coming soon!')}
                  >
                    <GitHubIcon />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-white"
                    onClick={() => alert('Apple ID login coming soon!')}
                  >
                    <AppleIcon />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Authenticated Profile Component
const AuthenticatedProfile = ({ user, totalGPA, handleLogout }: {
  user: any;
  totalGPA: number;
  handleLogout: () => void;
}) => {
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
};

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  
  const totalGPA = studentGrades.reduce((sum, subject) => sum + subject.average * subject.credits, 0) / 
                   studentGrades.reduce((sum, subject) => sum + subject.credits, 0);

  const handleLogout = () => {
    console.log('👋 User logging out');
    logout();
  };

  // Show guest profile if not authenticated
  if (!isAuthenticated || !user) {
    return <GuestProfile />;
  }

  // Show authenticated profile
  return <AuthenticatedProfile user={user} totalGPA={totalGPA} handleLogout={handleLogout} />;
}