import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { hashPassword } from '../src/lib/auth'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash passwords
  const hashedPassword = await hashPassword('password123')

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Алексей Петров",
        email: "alex@college.ru",
        password: hashedPassword,
        role: "STUDENT",
        group: "ИС-21",
        course: 2
      }
    }),
    prisma.user.create({
      data: {
        name: "Мария Иванова", 
        email: "maria@college.ru",
        password: hashedPassword,
        role: "STUDENT",
        group: "ИС-21",
        course: 2
      }
    }),
    prisma.user.create({
      data: {
        name: "Профессор Иванов",
        email: "teacher@college.ru", 
        password: hashedPassword,
        role: "TEACHER"
      }
    }),
    prisma.user.create({
      data: {
        name: "Администратор",
        email: "admin@college.ru", 
        password: hashedPassword,
        role: "ADMIN"
      }
    })
  ])

  // Create subjects
  const subjects = await Promise.all([
    prisma.subject.create({
      data: {
        title: "Проектирование интерфейсов",
        credits: 4,
        teacherId: users[2].id
      }
    }),
    prisma.subject.create({
      data: {
        title: "Базы данных",
        credits: 3,
        teacherId: users[2].id
      }
    }),
    prisma.subject.create({
      data: {
        title: "Веб-разработка",
        credits: 5,
        teacherId: users[2].id
      }
    })
  ])

  // Create schedules
  const schedules = await Promise.all([
    prisma.schedule.create({
      data: {
        day: "Понедельник",
        startTime: "08:00",
        endTime: "09:30",
        room: "Лаборатория 101",
        group: "ИС-21",
        subjectId: subjects[0].id
      }
    }),
    prisma.schedule.create({
      data: {
        day: "Понедельник",
        startTime: "10:00",
        endTime: "11:30",
        room: "Аудитория 205",
        group: "ИС-21",
        subjectId: subjects[1].id
      }
    }),
    prisma.schedule.create({
      data: {
        day: "Вторник",
        startTime: "12:00",
        endTime: "13:30",
        room: "Компьютерный класс",
        group: "ИС-21",
        subjectId: subjects[2].id
      }
    })
  ])

  // Create grades
  const grades = await Promise.all([
    prisma.grade.create({
      data: {
        value: 5,
        studentId: users[0].id,
        subjectId: subjects[0].id
      }
    }),
    prisma.grade.create({
      data: {
        value: 4,
        studentId: users[0].id,
        subjectId: subjects[1].id
      }
    }),
    prisma.grade.create({
      data: {
        value: 5,
        studentId: users[1].id,
        subjectId: subjects[0].id
      }
    })
  ])

  // Create files
  const files = await Promise.all([
    prisma.file.create({
      data: {
        name: "Лекция 1 - Основы UI/UX",
        url: "/files/lecture1.pdf",
        size: "2.5 MB",
        type: "PDF",
        category: "Лекции",
        uploaderId: users[2].id,
        downloads: 15,
        likes: 8
      }
    }),
    prisma.file.create({
      data: {
        name: "Практическое задание - React компоненты",
        url: "/files/react-task.zip",
        size: "1.2 MB", 
        type: "ZIP",
        category: "Задания",
        uploaderId: users[2].id,
        downloads: 23,
        likes: 12
      }
    })
  ])

  // Create swap posts
  const swapPosts = await Promise.all([
    prisma.swapPost.create({
      data: {
        skillOffer: "React/Next.js разработка",
        skillWanted: "UI/UX дизайн",
        description: "Могу научить современной веб-разработке, хочу изучить дизайн интерфейсов",
        authorId: users[0].id,
        responses: 5,
        rating: 4.8
      }
    }),
    prisma.swapPost.create({
      data: {
        skillOffer: "Figma и дизайн-системы", 
        skillWanted: "Python и машинное обучение",
        description: "Профессионально работаю в Figma, интересует ML и анализ данных",
        authorId: users[1].id,
        responses: 3,
        rating: 4.9
      }
    })
  ])

  // Create news
  const news = await Promise.all([
    prisma.news.create({
      data: {
        title: "Добро пожаловать в College Flow!",
        description: "Новая платформа для студентов нашего колледжа. Здесь вы можете следить за расписанием, общаться и обмениваться навыками!",
        category: "Общие",
        imageUrl: "/images/welcome.jpg"
      }
    }),
    prisma.news.create({
      data: {
        title: "Хакатон в следующие выходные!",
        description: "Регистрация открыта на студенческий хакатон. Призовой фонд 100к рублей! Тема: ИИ в образовании.",
        category: "События",
        imageUrl: "/images/hackathon.jpg"
      }
    })
  ])

  // Create system settings
  await prisma.systemSettings.create({
    data: {
      isDiaryLocked: false,
      isScheduleLocked: false,
      showAlert: false
    }
  })

  console.log('✅ База данных заполнена тестовыми данными!')
  console.log(`👥 Создано пользователей: ${users.length}`)
  console.log(`📚 Создано предметов: ${subjects.length}`)
  console.log(`📅 Создано занятий: ${schedules.length}`)
  console.log(`📊 Создано оценок: ${grades.length}`)
  console.log(`📁 Создано файлов: ${files.length}`)
  console.log(`🔄 Создано обменов навыками: ${swapPosts.length}`)
  console.log(`📰 Создано новостей: ${news.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении базы:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })