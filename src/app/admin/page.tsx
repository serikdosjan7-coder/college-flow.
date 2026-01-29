'use client';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, Unlock, AlertTriangle, Settings, Search, Crown, UserCheck, UserX, Zap } from 'lucide-react';
import { currentUser, allUsers, systemSettings, UserRole } from '@/lib/mockData';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRoleStore } from '@/lib/roleStore';

export default function AdminDashboard() {
  const router = useRouter();
  const { currentRole } = useRoleStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isDiaryLocked, setIsDiaryLocked] = useState(systemSettings.isDiaryLocked);
  const [isScheduleLocked, setIsScheduleLocked] = useState(systemSettings.isScheduleLocked);

  console.log('👑 Admin dashboard rendered with role:', currentRole);

  // Redirect if not admin
  if (currentRole !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/20 backdrop-blur-[20px] rounded-2xl p-8 text-center border border-red-500/30"
        >
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Доступ запрещен</h1>
          <p className="text-white/70 mb-4">Только администраторы могут получить доступ к этой странице</p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium"
          >
            Вернуться на главную
          </button>
        </motion.div>
      </div>
    );
  }

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId: number, newRole: UserRole) => {
    // In real app, this would make an API call
    console.log(`Changing user ${userId} role to ${newRole}`);
  };

  const handleEmergencyBroadcast = () => {
    if (alertMessage.trim()) {
      // In real app, this would broadcast to all users
      console.log('Broadcasting emergency alert:', alertMessage);
      setAlertMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pb-20"
    >
      {/* Golden Admin Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Admin Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              style={{ border: '2px solid rgba(255, 215, 0, 0.5)' }}
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Mission Control
            </h1>
          </div>
          <p className="text-white/70">Панель администратора системы</p>
        </motion.div>

        {/* Master Controls */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Diary Lock */}
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6"
            style={{ 
              backdropFilter: 'blur(20px)', 
              border: '2px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.1)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {isDiaryLocked ? <Lock className="w-5 h-5 text-red-400" /> : <Unlock className="w-5 h-5 text-green-400" />}
                <h3 className="text-white font-semibold">Дневник</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDiaryLocked(!isDiaryLocked)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isDiaryLocked 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}
              >
                {isDiaryLocked ? 'Заблокирован' : 'Активен'}
              </motion.button>
            </div>
            <p className="text-white/60 text-sm">
              {isDiaryLocked ? 'Оценки заблокированы для редактирования' : 'Преподаватели могут редактировать оценки'}
            </p>
          </div>

          {/* Schedule Lock */}
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6"
            style={{ 
              backdropFilter: 'blur(20px)', 
              border: '2px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.1)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {isScheduleLocked ? <Lock className="w-5 h-5 text-red-400" /> : <Unlock className="w-5 h-5 text-green-400" />}
                <h3 className="text-white font-semibold">Расписание</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsScheduleLocked(!isScheduleLocked)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isScheduleLocked 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}
              >
                {isScheduleLocked ? 'Заморожено' : 'Активно'}
              </motion.button>
            </div>
            <p className="text-white/60 text-sm">
              {isScheduleLocked ? 'Расписание заблокировано для изменений' : 'Преподаватели могут редактировать расписание'}
            </p>
          </div>

          {/* Emergency Broadcast */}
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6"
            style={{ 
              backdropFilter: 'blur(20px)', 
              border: '2px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.1)'
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h3 className="text-white font-semibold">Экстренное оповещение</h3>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-orange-400/50 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmergencyBroadcast}
                disabled={!alertMessage.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 inline mr-2" />
                Отправить всем
              </motion.button>
            </div>
          </div>
        </motion.div>
        {/* User Management */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6"
            style={{ 
              backdropFilter: 'blur(20px)', 
              border: '2px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.1)'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Управление пользователями</h2>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Поиск пользователей..."
                  className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:border-yellow-400/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        user.role === 'ADMIN' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        user.role === 'TEACHER' ? 'bg-gradient-to-r from-purple-500 to-blue-500' :
                        'bg-gradient-to-r from-cyan-500 to-green-500'
                      }`}>
                        {user.role === 'ADMIN' ? <Crown className="w-5 h-5 text-white" /> :
                         user.role === 'TEACHER' ? <UserCheck className="w-5 h-5 text-white" /> :
                         <UserX className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{user.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <span>{user.email}</span>
                          {user.group && (
                            <>
                              <span>•</span>
                              <span>{user.group}</span>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-white/50">Активность: {user.lastActive}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:border-yellow-400/50 focus:outline-none"
                      >
                        <option value="STUDENT" className="bg-slate-800">Студент</option>
                        <option value="TEACHER" className="bg-slate-800">Преподаватель</option>
                        <option value="ADMIN" className="bg-slate-800">Администратор</option>
                      </select>
                      
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'ADMIN' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          user.role === 'TEACHER' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        }`}
                      >
                        {user.role === 'ADMIN' ? 'Админ' : user.role === 'TEACHER' ? 'Препод' : 'Студент'}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}