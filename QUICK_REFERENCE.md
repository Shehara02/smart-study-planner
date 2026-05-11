# Quick Reference Card

## 🚀 Quick Start

### First Time Setup (5 minutes)

#### Create Database
```bash
# Open PostgreSQL
psql -U postgres

# In PostgreSQL
CREATE DATABASE smart_study_planner;
\q
```

#### Backend Setup
```bash
cd server
npm install
copy .env.example .env
# Edit .env with your database password
npx prisma migrate dev --name init
npm run dev
```

#### Frontend Setup (New Terminal)
```bash
cd client
npm install
copy .env.local.example .env.local
npm run dev
```

#### Open Browser
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api/health

### Register & Login
1. Click "Register here" on login page
2. Fill registration form
3. Click "Register" to create account
4. You're logged in!

---

## 📁 Important Folders

```
Smart Study Planner/
├── server/                    # Backend
│   ├── controllers/           # Business logic
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth, validation
│   ├── prisma/schema.prisma  # Database models
│   ├── config/               # Configuration
│   └── .env                  # Database credentials
├── client/                    # Frontend
│   ├── pages/                # Next.js pages
│   ├── components/           # React components
│   ├── context/AuthContext   # Authentication state
│   ├── services/api.js       # API calls
│   └── .env.local            # API URL
└── [Docs]
    ├── README.md             # Main documentation
    ├── INSTALL.md            # Installation guide
    ├── SETUP.md              # Quick setup
    └── API.md                # API documentation
```

---

## ⚡ Common Commands

### Backend Commands
```bash
cd server

npm install              # Install dependencies
npm run dev            # Start development server
npm start              # Start production server
npm run prisma:migrate # Run migrations
npm run prisma:studio  # Open database UI
```

### Frontend Commands
```bash
cd client

npm install            # Install dependencies
npm run dev           # Start development server
npm run build         # Build for production
npm start             # Start production build
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/smart_study_planner"
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🌐 Key URLs

| Page | URL |
|------|-----|
| Login | http://localhost:3000/login |
| Register | http://localhost:3000/register |
| Dashboard | http://localhost:3000/dashboard |
| Tasks | http://localhost:3000/tasks |
| API Health | http://localhost:5000/api/health |
| Prisma Studio | http://localhost:5555 |

---

## 📋 API Endpoints

### Authentication
```
POST /api/auth/register   # Create account
POST /api/auth/login      # Login user
```

### Tasks (Require Token)
```
GET    /api/tasks         # Get all tasks
POST   /api/tasks         # Create task
PUT    /api/tasks/:id     # Update task
DELETE /api/tasks/:id     # Delete task
GET    /api/tasks/stats   # Get statistics
```

---

## 🔥 Quick Fixes

### Database Connection Error
```bash
# Check PostgreSQL is running
# Edit .env and verify DATABASE_URL
# Check password is correct
# Run migrations again:
cd server
npx prisma migrate dev
```

### Port Already in Use
```bash
# Change in server/.env
PORT=5001

# Change in client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Module Not Found
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

### Clear Browser Cache
1. Press F12 to open DevTools
2. Right-click Refresh button
3. Click "Empty cache and hard refresh"

---

## 📱 Features Checklist

- [x] User Registration
- [x] User Login
- [x] Create Tasks
- [x] Edit Tasks
- [x] Delete Tasks
- [x] Mark Tasks Complete
- [x] Task Priorities (Low/Medium/High)
- [x] Task Deadlines
- [x] Dashboard with Stats
- [x] Dark Mode Toggle
- [x] Responsive Design
- [x] Toast Notifications
- [x] Input Validation
- [x] Error Handling

---

## 🧪 Test Flow

1. **Register**: Create new account
2. **Login**: Use created credentials
3. **Dashboard**: View initial statistics (all 0)
4. **Create Task**: Add a task with all fields
5. **View Task**: Check it appears in task list
6. **Complete Task**: Toggle completion status
7. **Edit Task**: Modify task details
8. **Delete Task**: Remove task
9. **Check Stats**: Verify dashboard updated
10. **Logout**: Test logout functionality

---

## 📞 Support

### Check These First
1. Backend running: http://localhost:5000/api/health
2. Frontend running: http://localhost:3000
3. Database connected: Can login to PostgreSQL
4. .env files configured correctly
5. Dependencies installed: node_modules folder exists

### Refer To
- README.md - Full documentation
- INSTALL.md - Step-by-step setup
- API.md - API reference
- Server logs - Check terminal output
- Browser console - Check F12 for errors

---

## 💾 Useful Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F12 | Open DevTools |
| Ctrl+Shift+Delete | Clear Cache |
| Ctrl+C | Stop Server |
| Ctrl+L | Clear Terminal |

---

## ✅ Verification Checklist

Before coding/deploying:

- [ ] Both servers running (5000 and 3000)
- [ ] Can register and login
- [ ] Can create a task
- [ ] Can view tasks in list
- [ ] Can mark task as complete
- [ ] Can edit task
- [ ] Can delete task
- [ ] Dashboard shows updated stats
- [ ] Dark mode works
- [ ] Responsive on mobile (F12 → Device Mode)
- [ ] No console errors (F12 → Console)

---

## 🎓 Learning

### Understand the Flow
1. User types at http://localhost:3000
2. Next.js loads React components
3. User action sends request via axios
4. Express backend processes request
5. Prisma queries PostgreSQL
6. Response sent back to frontend
7. React updates UI

### Key Files to Study
- server/controllers/taskController.js - Business logic
- client/pages/tasks.js - Frontend page
- server/routes/taskRoutes.js - API routes
- client/services/api.js - API calls
- server/prisma/schema.prisma - Database structure

---

**Happy Studying! 📚✨**

Last Updated: May 11, 2024
