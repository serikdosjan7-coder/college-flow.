// College News
export const collegeNews = [
  {
    id: 1,
    title: "Новый компьютерный класс открыт!",
    description: "Современное оборудование для изучения программирования",
    image: "/news1.jpg",
    date: "27 января 2026",
    category: "Новости"
  },
  {
    id: 2,
    title: "Хакатон по ИИ - регистрация открыта",
    description: "Призовой фонд 100,000 рублей для лучших проектов",
    image: "/news2.jpg",
    date: "26 января 2026",
    category: "События"
  },
  {
    id: 3,
    title: "Стипендиальная программа 2026",
    description: "Повышенные стипендии для отличников",
    image: "/news3.jpg",
    date: "25 января 2026",
    category: "Стипендии"
  }
];

// Current Lesson
export const currentLesson = {
  subject: "Проектирование интерфейсов",
  teacher: "Нейро-Ассистент",
  room: "Лаборатория 101",
  startTime: "14:00",
  endTime: "15:30",
  progress: 65, // процент прошедшего времени
  timeLeft: "31:45" // MM:SS
};

// Schedule Data
export const weekSchedule = [
  {
    day: "Понедельник",
    date: "27 января",
    classes: [
      { time: "08:00-09:30", subject: "Математика", teacher: "Иванов И.И.", room: "101", group: "ИС-21" },
      { time: "10:00-11:30", subject: "Физика", teacher: "Петров П.П.", room: "205", group: "ИС-21" },
      { time: "12:00-13:30", subject: "Программирование", teacher: "Сидоров С.С.", room: "Комп. класс", group: "ИС-21" }
    ]
  },
  {
    day: "Вторник",
    date: "28 января",
    classes: [
      { time: "08:00-09:30", subject: "Проектирование интерфейсов", teacher: "Нейро-Ассистент", room: "101", group: "ИС-21" },
      { time: "10:00-11:30", subject: "Базы данных", teacher: "Профессор Иванов", room: "205", group: "ИС-21" },
      { time: "12:00-13:30", subject: "Веб-разработка", teacher: "Доцент Петрова", room: "Комп. класс", group: "ИС-21" }
    ]
  },
  {
    day: "Среда",
    date: "29 января",
    classes: [
      { time: "09:00-10:30", subject: "Алгоритмы", teacher: "Сидоров С.С.", room: "301", group: "ИС-21" },
      { time: "11:00-12:30", subject: "Сети", teacher: "Козлов К.К.", room: "102", group: "ИС-21" }
    ]
  }
];

// Hub Files
export const hubFiles = [
  {
    id: 1,
    title: "Конспект лекций по Базам данных",
    author: "Алексей Иванов",
    date: "25 января 2026",
    downloads: 42,
    likes: 15,
    comments: 8,
    type: "PDF",
    size: "2.4 MB",
    category: "Конспекты"
  },
  {
    id: 2,
    title: "Шпаргалка по SQL запросам",
    author: "Мария Петрова",
    date: "24 января 2026",
    downloads: 67,
    likes: 23,
    comments: 12,
    type: "PDF",
    size: "1.1 MB",
    category: "Шпаргалки"
  },
  {
    id: 3,
    title: "Примеры кода React Hooks",
    author: "Дмитрий Сидоров",
    date: "23 января 2026",
    downloads: 89,
    likes: 34,
    comments: 19,
    type: "ZIP",
    size: "5.7 MB",
    category: "Код"
  }
];

// Skill Swap Posts
export const swapPosts = [
  {
    id: 1,
    author: "Алексей Иванов",
    avatar: "/avatar1.jpg",
    date: "2 часа назад",
    skillOffer: "React/Next.js разработка",
    skillWanted: "Дизайн в Figma",
    description: "Могу помочь с фронтенд разработкой, знаю React, Next.js, TypeScript. Хочу научиться создавать красивые дизайны в Figma.",
    rating: 4.8,
    responses: 12,
    tags: ["Frontend", "React", "TypeScript"]
  },
  {
    id: 2,
    author: "Мария Петрова",
    avatar: "/avatar2.jpg",
    date: "5 часов назад",
    skillOffer: "Математика и статистика",
    skillWanted: "Английский язык",
    description: "Отлично разбираюсь в высшей математике и статистике. Нужна помощь с английским для технических текстов.",
    rating: 4.9,
    responses: 8,
    tags: ["Математика", "Статистика", "Аналитика"]
  }
];

// Student Grades & Diary
export const studentGrades = [
  {
    subject: "Проектирование интерфейсов",
    grades: [5, 4, 5, 5, 4],
    average: 4.6,
    credits: 4,
    teacher: "Нейро-Ассистент"
  },
  {
    subject: "Базы данных",
    grades: [4, 5, 4, 5, 5],
    average: 4.6,
    credits: 3,
    teacher: "Профессор Иванов"
  },
  {
    subject: "Веб-разработка",
    grades: [5, 5, 4, 5, 5],
    average: 4.8,
    credits: 4,
    teacher: "Доцент Петрова"
  },
  {
    subject: "Математика",
    grades: [4, 4, 3, 4, 4],
    average: 3.8,
    credits: 5,
    teacher: "Иванов И.И."
  },
  {
    subject: "Алгоритмы",
    grades: [5, 5, 5, 4, 5],
    average: 4.8,
    credits: 4,
    teacher: "Сидоров С.С."
  }
];

// User Roles
export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

// System Settings (Admin Controls)
export const systemSettings = {
  isDiaryLocked: false,
  isScheduleLocked: false,
  emergencyAlert: null as string | null
};

// Current User (for testing - will be switchable)
export let currentUser = {
  id: 1,
  name: "Иван Студентов",
  role: 'STUDENT' as UserRole,
  group: "ИС-21",
  course: 3,
  gpa: 4.32,
  avatar: "/student-avatar.jpg",
  email: "ivan.studentov@college.edu",
  phone: "+7 (999) 123-45-67",
  totalCredits: 120,
  completedCredits: 85
};

// Function to switch roles (for testing)
export const switchUserRole = (newRole: UserRole) => {
  currentUser.role = newRole;
  if (newRole === 'ADMIN') {
    currentUser.name = "Администратор Системы";
    currentUser.email = "admin@college.edu";
  } else if (newRole === 'TEACHER') {
    currentUser.name = "Преподаватель Иванов";
    currentUser.email = "teacher@college.edu";
  } else {
    currentUser.name = "Иван Студентов";
    currentUser.email = "ivan.studentov@college.edu";
  }
};

// All Users (for Admin Management)
export const allUsers = [
  {
    id: 1,
    name: "Иван Студентов",
    role: 'STUDENT' as UserRole,
    group: "ИС-21",
    email: "ivan.studentov@college.edu",
    lastActive: "2 минуты назад"
  },
  {
    id: 2,
    name: "Мария Петрова",
    role: 'STUDENT' as UserRole,
    group: "ИС-21",
    email: "maria.petrova@college.edu",
    lastActive: "15 минут назад"
  },
  {
    id: 3,
    name: "Алексей Сидоров",
    role: 'TEACHER' as UserRole,
    group: null,
    email: "alexey.sidorov@college.edu",
    lastActive: "1 час назад"
  },
  {
    id: 4,
    name: "Анна Козлова",
    role: 'STUDENT' as UserRole,
    group: "ИС-22",
    email: "anna.kozlova@college.edu",
    lastActive: "30 минут назад"
  }
];

// Student Profile (alias for currentUser for backward compatibility)
export const studentProfile = currentUser;
export const collegeInfo = {
  name: " Колледж Narxoz",
  address: "г. Москва, ул. Инновационная, 10",
  phone: "+7 (705)175 3609;",
  email: "info@college.edu",
  website: "www.narxoz.edu",
  socialMedia: {
    vk: "https://vk.com/college",
    telegram: "https://t.me/narxoz-college",
    instagram: "https://instagram.com/narxoz-college",
    geolocation: "https://go.2gis.com/dyaAd"
  }
};