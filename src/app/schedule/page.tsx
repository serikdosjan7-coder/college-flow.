'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Users, BookOpen } from 'lucide-react';
import { weekSchedule } from '@/lib/mockData';

export default function SchedulePage() {
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
            x: [0, 120, 0],
            y: [0, -60, 0],
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ 
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -90, 0],
            y: [0, 70, 0],
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ 
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
          className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
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
            Расписание занятий
          </h1>
          <p className="text-white/70">Недельное расписание группы ИС-21</p>
        </motion.div>

        {/* Schedule */}
        <div className="space-y-6">
          {weekSchedule.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: dayIndex * 0.1 }}
              className="bg-white/10 backdrop-blur-[20px] rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              style={{ backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.15)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-semibold text-white">{day.day}</h2>
                <span className="text-white/60">{day.date}</span>
                <div className="ml-auto bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-cyan-400/30">
                  <span className="text-cyan-400 text-sm font-medium">{day.classes.length} пар</span>
                </div>
              </div>
              
              <div className="grid gap-4">
                {day.classes.map((classItem, classIndex) => (
                  <motion.div
                    key={classIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: (dayIndex * 0.1) + (classIndex * 0.05) }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:bg-white/10"
                    style={{ backdropFilter: 'blur(10px)' }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-cyan-400" />
                        <div>
                          <div className="text-white font-semibold">{classItem.time}</div>
                          <div className="text-white/60 text-sm">Время</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-white font-semibold">{classItem.subject}</div>
                          <div className="text-white/60 text-sm">Предмет</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-pink-400" />
                        <div>
                          <div className="text-white font-semibold">{classItem.teacher}</div>
                          <div className="text-white/60 text-sm">Преподаватель</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-white font-semibold">{classItem.room}</div>
                          <div className="text-white/60 text-sm">Аудитория</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}