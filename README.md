# Smart Study Planner

A modern, full-stack web application built with Next.js, React, Node.js, Express, and PostgreSQL. It helps students organize their study tasks, set priorities, and track their progress effectively.

## 🎯 Features

### Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing using bcrypt
- Protected routes and API endpoints

### Dashboard
- Welcome section with personalized greeting
- Task statistics (Total, Completed, Pending)
- Quick tips and suggestions
- Responsive design

### Task Management
- Create, read, update, and delete tasks
- Set task priority levels (Low, Medium, High)
- Add task descriptions and deadlines
- Mark tasks as completed
- Filter tasks by status (All, Pending, Completed)

### User Interface
- Modern, clean design with Tailwind CSS
- Dark mode support with system preference detection
- Responsive layout for mobile, tablet, and desktop
- Loading states and error handling
- Toast notifications for user feedback
- Reusable component architecture

## 🏗️ Architecture

### MVC Pattern (Backend)
```
server/
├── controllers/     # Business logic
├── models/          # Database queries
├── routes/          # API endpoints
├── middleware/      # Auth, validation, error handling
├── config/          # Configuration files
└── utils/           # Utility functions
```

### Frontend Structure
```
client/
├── components/      # Reusable React components
├── pages/          # Next.js pages
├── services/       # API calls
├── context/        # React context for state management
├── lib/            # Utility functions
└── styles/         # Global styles
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
cd "c:\xampp\htdocs\Smart Study Planner"
```

### 2. Backend Setup

#### Navigate to server directory
```bash
cd server
```

#### Install dependencies
```bash
npm install
```

#### Configure environment variables
Create a `.env` file in the server directory:
```bash
cp .env.example .env
```

Edit `.env` and update these variables:
```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/smart_study_planner"

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### Set up PostgreSQL Database

1. Create a new database in PostgreSQL:
```sql
CREATE DATABASE smart_study_planner;
```

2. Run Prisma migrations to create tables:
```bash
npx prisma migrate dev --name init
```

3. (Optional) Open Prisma Studio to view data:
```bash
npx prisma studio
```

#### Start the backend server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Open a new terminal and navigate to client directory
```bash
cd client
```

#### Install dependencies
```bash
npm install
```

#### Configure environment variables
Create a `.env.local` file:
```bash
cp .env.local.example .env.local
```

File content:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Start the development server
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔐 Default User (For Testing)

You'll need to create a user account through the registration page.

### How to Register
1. Go to `http://localhost:3000/register`
2. Fill in the registration form
3. Click "Register"

### How to Login
1. Go to `http://localhost:3000/login`
2. Enter your credentials
3. Click "Login"

## 📱 Usage

### Creating a Task
1. Navigate to "Tasks" page
2. Click "New Task" button
3. Fill in task details:
   - **Title** (required)
   - **Description** (optional)
   - **Priority** (Low, Medium, High)
   - **Deadline** (optional)
4. Click "Create Task"

### Editing a Task
1. Go to Tasks page
2. Click the edit icon on any task
3. Modify the details
4. Click "Update Task"

### Marking Task as Complete
- Click the circle icon next to the task to mark it complete
- Click the checkmark icon to mark it as pending again

### Deleting a Task
- Click the trash icon on any task
- Confirm the deletion

### Viewing Dashboard
1. Click "Dashboard" in the sidebar
2. View your task statistics
3. See helpful tips and suggestions

### Toggling Dark Mode
- Click the sun/moon icon in the header to toggle between light and dark modes
- Your preference is saved automatically

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50) DEFAULT 'MEDIUM',
  deadline TIMESTAMP,
  completed BOOLEAN DEFAULT false,
  userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 UI Features

### Components
- **Layout** - Main layout with sidebar and header
- **Sidebar** - Navigation menu with logout
- **Header** - User greeting and theme toggle
- **Card** - Generic card container
- **StatCard** - Statistics display cards
- **TaskItem** - Individual task component
- **TaskForm** - Create/edit task form
- **Modal** - Dialog/popup component
- **Button** - Reusable button component
- **Input/Select/Textarea** - Form inputs
- **EmptyState** - Empty state display

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Mobile menu toggle
- Touch-friendly buttons and spacing

### Dark Mode
- System preference detection
- Manual toggle button
- Smooth transitions
- Persistent preference in localStorage

## 🚀 Production Build

### Backend
```bash
cd server
npm run start
```

### Frontend
```bash
cd client
npm run build
npm start
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt password hashing
- **Input Validation** - Server-side validation
- **CORS Protection** - Cross-origin resource sharing
- **Helmet.js** - Security headers
- **Protected Routes** - Client-side route protection
- **Token Expiration** - Auto logout on token expiry

## 📚 Folder Structure

```
Smart Study Planner/
├── client/
│   ├── components/          # React components
│   ├── context/            # React context (Auth)
│   ├── lib/                # Utility functions
│   ├── pages/              # Next.js pages
│   ├── services/           # API services
│   ├── styles/             # Global CSS
│   ├── .env.local.example  # Example env file
│   ├── .gitignore          # Git ignore
│   ├── next.config.js      # Next config
│   ├── package.json        # Dependencies
│   ├── postcss.config.js   # PostCSS config
│   ├── tailwind.config.js  # Tailwind config
│   └── README.md           # Frontend README
│
└── server/
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── middleware/         # Middleware functions
    ├── models/            # Database models (Prisma)
    ├── prisma/            # Prisma schema
    ├── routes/            # API routes
    ├── utils/             # Utility functions
    ├── .env.example       # Example env file
    ├── .gitignore         # Git ignore
    ├── package.json       # Dependencies
    ├── server.js          # Main server file
    └── README.md          # Backend README
```

## 🐛 Troubleshooting

### Database Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists
- Run migrations: `npx prisma migrate dev`

### API Connection Error
- Check backend server is running on port 5000
- Verify NEXT_PUBLIC_API_URL in client/.env.local
- Check CORS configuration in server.js

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET is same in .env
- Verify token format (Bearer token)

### Port Already in Use
Change ports in .env files:
```env
# Backend: Change PORT in server/.env
PORT=5001

# Frontend: Run on different port
npm run dev -- -p 3001
```

## 📝 Development Tips

### Adding a New Task Field
1. Update Prisma schema in `server/prisma/schema.prisma`
2. Run migration: `npx prisma migrate dev --name add_field_name`
3. Update controller to handle new field
4. Update form component to include new field
5. Update task item display if needed

### Creating a New Page
1. Create file in `client/pages/`
2. Wrap with `<ProtectedRoute>` if authentication required
3. Wrap with `<Layout>` if in main app
4. Add to sidebar navigation if needed

### Styling Guidelines
- Use Tailwind CSS classes
- Dark mode: Add `dark:` prefix for dark styles
- Responsive: Mobile-first with `md:`, `lg:` prefixes
- Colors: Use predefined Tailwind colors

## 📄 License

This project is open source and available under the MIT License.

## 👥 Support

For issues or questions, please refer to the documentation or contact the development team.

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express.js Documentation](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

Happy studying! 📚✨
