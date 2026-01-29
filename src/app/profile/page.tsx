'use client';
import { motion } from 'framer-motion';
import { User, Mail, Phone, GraduationCap, BookOpen, Star, TrendingUp, Award, Settings, UserCheck, Crown } from 'lucide-react';
import { studentGrades } from '@/lib/mockData';
import { useRoleStore } from '@/lib/roleStore';

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
  const { currentRole, userName, userEmail, switchRole } = useRoleStore();
  
  const totalGPA = studentGrades.reduce((sum, subject) => sum + subject.average * subject.credits, 0) / 
                   studentGrades.reduce((sum, subject) => sum + subject.credits, 0);

  const handleRoleSwitch = (newRole: 'STUDENT' | 'TEACHER' | 'ADMIN') => {
    console.log('🎭 User clicked role:', newRole);
    switchRole(newRole);
  };

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
            Профиль студента
          </h1>
          <p className="text-white/70">Твоя академическая информация</p>
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
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">{userName}</h2>
                <div className="space-y-1 text-white/80">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span>Группа ИС-21 • 3 курс</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>{userEmail}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <CircularProgress value={totalGPA} max={5} label="GPA" />
              </div>
            </div>
          </div>
        </motion.div>
        {/* Role Switcher (Testing) */}
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
              Переключатель ролей (Тестирование)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSwitch('STUDENT')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  currentRole === 'STUDENT' 
                    ? 'bg-cyan-500/30 border-cyan-400/70 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.4)]' 
                    : 'bg-white/5 border-white/20 text-white/70 hover:border-cyan-400/30'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Студент</div>
                <div className="text-xs opacity-70">Базовый доступ</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSwitch('TEACHER')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  currentRole === 'TEACHER' 
                    ? 'bg-purple-500/30 border-purple-400/70 text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.4)]' 
                    : 'bg-white/5 border-white/20 text-white/70 hover:border-purple-400/30'
                }`}
              >
                <UserCheck className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Преподаватель</div>
                <div className="text-xs opacity-70">Редактирование</div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSwitch('ADMIN')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  currentRole === 'ADMIN' 
                    ? 'bg-yellow-500/30 border-yellow-400/70 text-yellow-300 shadow-[0_0_30px_rgba(255,215,0,0.4)]' 
                    : 'bg-white/5 border-white/20 text-white/70 hover:border-yellow-400/30'
                }`}
              >
                <Crown className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Администратор</div>
                <div className="text-xs opacity-70">Полный доступ</div>
              </motion.button>
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-blue-400 text-sm font-medium mb-1">Текущая роль: {currentRole}</div>
              <div className="text-white/70 text-xs">
                {currentRole === 'ADMIN' && 'Доступ к панели администратора (/admin)'}
                {currentRole === 'TEACHER' && 'Возможность редактировать оценки и расписание'}
                {currentRole === 'STUDENT' && 'Просмотр расписания и материалов'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}