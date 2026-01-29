'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, MapPin, User, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AddSchedule() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    teacher: '',
    room_number: '',
    group_name: '',
    start_time: '',
    end_time: '',
    day_of_week: 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          start_time: new Date(`2026-01-27T${formData.start_time}:00`),
          end_time: new Date(`2026-01-27T${formData.end_time}:00`),
          day_of_week: parseInt(formData.day_of_week.toString())
        }),
      })

      if (response.ok) {
        router.push('/')
      } else {
        alert('Ошибка при добавлении расписания')
      }
    } catch (error) {
      alert('Ошибка при добавлении расписания')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const days = [
    { value: 1, label: 'Понедельник' },
    { value: 2, label: 'Вторник' },
    { value: 3, label: 'Среда' },
    { value: 4, label: 'Четверг' },
    { value: 5, label: 'Пятница' },
    { value: 6, label: 'Суббота' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Добавить пару
          </h1>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-6">
            
            {/* Subject */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Предмет
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Введите название предмета"
              />
            </div>

            {/* Teacher */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Преподаватель
              </label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Введите имя преподавателя"
              />
            </div>

            {/* Room and Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Кабинет
                </label>
                <input
                  type="text"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Номер кабинета"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Группа
                </label>
                <input
                  type="text"
                  name="group_name"
                  value={formData.group_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Название группы"
                />
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Время начала
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Время окончания
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Day of week */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                День недели
              </label>
              <select
                name="day_of_week"
                value={formData.day_of_week}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
              >
                {days.map(day => (
                  <option key={day.value} value={day.value} className="bg-slate-800">
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Добавление...' : 'Добавить пару'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}