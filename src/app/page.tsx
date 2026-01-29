'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, User, Calendar, Play, ExternalLink, Phone, Mail, Globe } from 'lucide-react';
import { collegeNews, currentLesson, collegeInfo } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { useRoleStore } from '@/lib/roleStore';

export default function HomePage() {
  const { currentRole } = useRoleStore();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState("31:45");
  const [progress, setProgress] = useState(65);

  console.log('🏠 Home page rendered with role:', currentRole);

  // Auto-scroll news carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % collegeNews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Simulate live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const [minutes, seconds] = timeLeft.split(':').map(Number);
      const totalSeconds = minutes * 60 + seconds;
      
      if (totalSeconds > 0) {
        const newTotalSeconds = totalSeconds - 1;
        const newMinutes = Math.floor(newTotalSeconds / 60);
        const newSeconds = newTotalSeconds % 60;
        setTimeLeft(`${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`);
        
        // Update progress (assuming 90 minutes total)
        const totalLessonTime = 90 * 60; // 90 minutes in seconds
        const elapsed = totalLessonTime - newTotalSeconds;
        setProgress((elapsed / totalLessonTime) * 100);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pb-20"
    >
      {/* Animated Blur Blobs Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            College Flow
          </h1>
          <p className="text-white/70 text-lg">Добро пожаловать в твой студенческий мир</p>
        </motion.div>

        {/* College News Carousel */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Новости колледжа
            {(currentRole === 'ADMIN' || currentRole === 'TEACHER') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm rounded-lg font-medium"
                style={{ 
                  border: '1px solid rgba(255, 215, 0, 0.5)',
                  boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)'
                }}
                onClick={() => console.log('Edit news')}
              >
                Редактировать
              </motion.button>
            )}
          </h2>
          
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNewsIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white/10 backdrop-blur-[20px] border border-white/15 rounded-2xl p-6"
                style={{ backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.15)' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {collegeNews[currentNewsIndex].category}
                  </span>
                  <span className="text-white/60 text-sm">{collegeNews[currentNewsIndex].date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{collegeNews[currentNewsIndex].title}</h3>
                <p className="text-white/80 leading-relaxed">{collegeNews[currentNewsIndex].description}</p>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {collegeNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNewsIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentNewsIndex ? 'bg-cyan-400 w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        {/* Current Lesson Widget */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6 relative overflow-hidden"
            style={{ backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.15)' }}
          >
            {/* Live indicator */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-red-500 rounded-full"
                />
                <span className="text-red-400 font-semibold text-sm">LIVE</span>
              </div>
              <span className="text-white/60">Текущая пара</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">{currentLesson.subject}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <User className="w-4 h-4 text-purple-400" />
                    <span>{currentLesson.teacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-4 h-4 text-pink-400" />
                    <span>{currentLesson.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{currentLesson.startTime} - {currentLesson.endTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                {/* Countdown Timer */}
                <div className="text-center mb-4">
                  <div className="text-4xl font-mono font-bold text-cyan-400 mb-1">
                    {timeLeft}
                  </div>
                  <div className="text-white/60 text-sm">до окончания</div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full relative"
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-0 top-0 w-2 h-full bg-white/30 rounded-full"
                    />
                  </motion.div>
                </div>
                <div className="text-white/60 text-sm text-center">{Math.round(progress)}% завершено</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Info Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* College Info */}
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6"
            style={{ backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.15)' }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Информация о колледже
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-white">{collegeInfo.name}</h4>
                <p className="text-white/70 text-sm">{collegeInfo.address}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>{collegeInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>{collegeInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span>{collegeInfo.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div 
            className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6"
            style={{ backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.15)' }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-cyan-400" />
              Социальные сети
            </h3>
            
            <div className="space-y-3">
              <motion.a
                href={collegeInfo.socialMedia.vk}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-400/30"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VK</span>
                </div>
                <span className="text-white/80">ВКонтакте</span>
              </motion.a>
              
              <motion.a
                href={collegeInfo.socialMedia.telegram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-cyan-400/30"
              >
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TG</span>
                </div>
                <span className="text-white/80">Telegram</span>
              </motion.a>
              
              <motion.a
                href={collegeInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 10 }}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-pink-400/30"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IG</span>
                </div>
                <span className="text-white/80">Instagram</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}