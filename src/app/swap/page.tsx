'use client';
import { motion } from 'framer-motion';
import { ArrowRight, User, Calendar, MessageCircle, Star, Plus } from 'lucide-react';
import { swapPosts, currentUser } from '@/lib/mockData';
import { useRoleStore } from '@/lib/roleStore';

export default function SwapPage() {
  const { currentRole } = useRoleStore();
  
  console.log('🔄 Swap page rendered with role:', currentRole);
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
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/5 left-1/5 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.4, 1, 1.4],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5
          }}
          className="absolute bottom-1/5 right-1/5 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
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
            Skill Swap
          </h1>
          <p className="text-white/70">Обмен навыками между студентами</p>
        </motion.div>

        {/* Swap Posts */}
        <div className="space-y-6">
          {swapPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{post.author}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white/80 text-sm">{post.rating}</span>
                </div>
              </div>

              {/* Skills Exchange */}
              <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-green-400 text-sm font-medium mb-1">ПРЕДЛАГАЮ</div>
                    <div className="text-white font-semibold">{post.skillOffer}</div>
                  </div>
                  
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mx-4"
                  >
                    <ArrowRight className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  
                  <div className="flex-1 text-right">
                    <div className="text-orange-400 text-sm font-medium mb-1">ИЩУ</div>
                    <div className="text-white font-semibold">{post.skillWanted}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/80 mb-4 leading-relaxed">
                {post.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/70">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{post.responses} откликов</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
                >
                  Откликнуться
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
            onClick={() => console.log('Add new swap post')}
          >
            <Plus className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}