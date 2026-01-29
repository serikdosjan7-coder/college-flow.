# College Flow - Student Super App 🎓

A modern Progressive Web App (PWA) for college students built with Next.js 16, featuring role-based access control, glassmorphism design, and comprehensive student management tools.

## ✨ Features

- **📱 PWA Ready**: Installable on mobile devices with offline support
- **🔐 Role-Based Access Control**: Student, Teacher, and Admin roles with different permissions
- **📅 Schedule Management**: View and manage class schedules
- **📚 Student Hub**: File sharing and resource management
- **🔄 Skill Swap**: Student skill exchange platform
- **👤 Profile Management**: User profiles with role switching (for testing)
- **🎨 Modern UI**: Glassmorphism design with neon accents and smooth animations
- **🌙 Dark Theme**: Beautiful dark theme optimized for mobile

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Database**: PostgreSQL with Prisma 7
- **Authentication**: JWT with bcrypt
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd college-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database URL and JWT secret.

4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account
- Supabase account (for PostgreSQL database)

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

3. **Set Environment Variables in Vercel**
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add the following variables:
     ```
     DATABASE_URL=your_supabase_connection_string
     JWT_SECRET=your_super_secret_jwt_key
     NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
     ```

4. **Deploy**
   - Vercel will automatically build and deploy your app
   - Your app will be available at `https://your-app.vercel.app`

### Database Setup (Supabase)

1. Create a new project on [Supabase](https://supabase.com)
2. Go to Settings → Database and copy the connection string
3. Update your `DATABASE_URL` in Vercel environment variables
4. Run database migrations:
   ```bash
   npx prisma db push
   ```

## 📱 PWA Installation

Once deployed, users can install the app on their devices:

- **Chrome/Edge**: Click the install button in the address bar
- **Safari**: Share → Add to Home Screen
- **Mobile**: Use "Add to Home Screen" option in browser menu

## 🔑 User Roles

- **Student**: Basic access to schedule, hub, and swap features
- **Teacher**: Can edit content and manage student resources
- **Admin**: Full access including user management and system settings

## 🎨 Design System

- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Neon Accents**: Cyan (#22d3ee) highlights and borders
- **Dark Theme**: Slate background (#0f172a) with proper contrast
- **Animations**: Smooth transitions using Framer Motion

## 📁 Project Structure

```
college-flow/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # Reusable React components
│   └── lib/                 # Utilities and configurations
├── prisma/                  # Database schema and migrations
├── public/                  # Static assets and PWA files
└── ...config files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for students by students
