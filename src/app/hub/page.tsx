'use client';
import { motion } from 'framer-motion';
import { FileText, Download, User, Calendar, Heart, MessageCircle, Plus } from 'lucide-react';
import { hubFiles } from '@/lib/mockData';
import { useRoleStore } from '@/lib/roleStore';

export default function HubPage() {
  const { currentRole } = useRoleStore();
  
  console.log('📚 Hub page rendered with role:', currentRole);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pb-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.3, 1, 1.3],
            opacity: [0.25, 0.15, 0.25]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
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
            Студенческий Hub
          </h1>
          <p className="text-white/70">Обмен материалами и конспектами</p>
        </motion.div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer"
            >
              {/* File Type Badge */}
              <div className="flex justify-between items-start mb-4">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold"
                >
                  {file.type}
                </motion.div>
                <span className="text-white/60 text-sm">{file.size}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                {file.title}
              </h3>

              {/* Author */}
              <div className="flex items-center gap-2 mb-2 text-white/70">
                <User className="w-4 h-4 text-purple-400" />
                <span className="text-sm">{file.author}</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mb-4 text-white/70">
                <Calendar className="w-4 h-4 text-pink-400" />
                <span className="text-sm">{file.date}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>{file.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span>{file.comments}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  {file.downloads}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Button for Teachers/Admins */}
        {(currentRole === 'TEACHER' || currentRole === 'ADMIN') && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg z-40"
            style={{ 
              border: '2px solid rgba(255, 215, 0, 0.5)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
            }}
            onClick={() => console.log('Add new file')}
          >
            <Plus className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}