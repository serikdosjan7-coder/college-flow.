'use client'

import { Clock, MapPin, User } from 'lucide-react'
import { motion } from 'framer-motion'

interface ScheduleCardProps {
  subject: string | null
  teacher: string | null
  room: string | null
  startTime: Date
  endTime: Date
  isActive: boolean
  isPast: boolean
  index: number
}

export default function ScheduleCard({
  subject,
  teacher,
  room,
  startTime,
  endTime,
  isActive,
  isPast,
  index
}: ScheduleCardProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`
        relative p-6 rounded-2xl backdrop-blur-2xl border transition-all duration-300 hover:scale-105
        ${isActive 
          ? 'bg-white/10 border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.5)] animate-pulse' 
          : isPast 
            ? 'bg-white/5 border-white/10 opacity-50' 
            : 'bg-white/8 border-white/20 hover:bg-white/12'
        }
      `}
    >
      {isActive && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 animate-pulse" />
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">
            {subject || 'Предмет не указан'}
          </h3>
          {isActive && (
            <span className="px-3 py-1 bg-cyan-400/20 text-cyan-300 rounded-full text-sm font-medium">
              Сейчас
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>{formatTime(startTime)} - {formatTime(endTime)}</span>
          </div>

          {teacher && (
            <div className="flex items-center gap-3 text-gray-300">
              <User className="w-5 h-5 text-purple-400" />
              <span>{teacher}</span>
            </div>
          )}

          {room && (
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-green-400" />
              <span>Кабинет {room}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}