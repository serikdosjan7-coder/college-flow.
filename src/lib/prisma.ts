import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const prismaClientSingleton = () => {
  // Only initialize Prisma if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found, Prisma client will not be initialized')
    return null
  }
  
  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL
    })
    const adapter = new PrismaPg(pool)
    
    return new PrismaClient({ 
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error)
    return null
  }
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export { prisma }

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma