# 🚀 Installation & Getting Started Guide

## Overview

This guide will walk you through the complete setup process for the Smart Study Planner application. It covers everything from database setup to running both the frontend and backend servers.

## 📋 Prerequisites Checklist

Before starting, ensure you have installed:

- [ ] **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- [ ] **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- [ ] **Git** (optional) - [Download](https://git-scm.com/)
- [ ] **A Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation

Open Command Prompt and run:

```bash
node --version    # Should show v16+
npm --version     # Should show 8+
psql --version    # Should show PostgreSQL 12+
```

## 🗂️ Project Structure

```
Smart Study Planner/
├── server/        # Backend (Express + Node.js)
├── client/        # Frontend (Next.js + React)
├── README.md      # Main documentation
├── SETUP.md       # Setup instructions
└── INSTALL.md     # This file
```

## 🔧 Step-by-Step Installation

### Step 1: Open Project Directory

```bash
cd "c:\xampp\htdocs\Smart Study Planner"
```

### Step 2: Setup PostgreSQL Database

#### 2.1 Open PostgreSQL

1. Open pgAdmin (comes with PostgreSQL) or use Command Prompt:

```bash
psql -U postgres
```

#### 2.2 Create Database

In the PostgreSQL prompt, run:

```sql
CREATE DATABASE smart_study_planner;
```

To verify:

```sql
\l  # Lists all databases
```

Exit with `\q`

### Step 3: Backend Setup (Terminal 1)

#### 3.1 Navigate to server directory

```bash
cd server
```

#### 3.2 Install dependencies

```bash
npm install
```

This will install all required packages (Express, Prisma, bcrypt, JWT, etc.)

#### 3.3 Setup environment variables

Create `.env` file:

```bash
# Windows Command Prompt
copy .env.example .env

# Or manually create and edit the file
```

Edit `.env` file with your database credentials:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:your_postgres_password@localhost:5432/smart_study_planner"

# Server Configuration  
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace `your_postgres_password` with your PostgreSQL password.

#### 3.4 Run database migrations

```bash
npx prisma migrate dev --name init
```

This will:
- Create database tables
- Create Prisma client

If prompted for migration name, just press Enter or type "init"

#### 3.5 Start backend server

```bash
npm run dev
```

You should see:
```
🚀 Server is running on http://localhost:5000
Environment: development
```

**Keep this terminal open!**

### Step 4: Frontend Setup (Terminal 2)

#### 4.1 Open a new Command Prompt/PowerShell

Navigate to project and go to client:

```bash
cd "c:\xampp\htdocs\Smart Study Planner\client"
```

#### 4.2 Install dependencies

```bash
npm install
```

#### 4.3 Setup environment variables

Create `.env.local` file:

```bash
# Windows Command Prompt
copy .env.local.example .env.local
```

Or manually create `.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 4.4 Start frontend server

```bash
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## 🌐 Access the Application

### Open in Browser

Now you can access the application at:

**Frontend:** http://localhost:3000
**Backend API:** http://localhost:5000/api
**Health Check:** http://localhost:5000/api/health

## 👤 Create Your First Account

### Registration

1. Go to http://localhost:3000
2. You'll be redirected to login page
3. Click "Register here" link
4. Fill in the form:
   - **Full Name:** Your name
   - **Email:** your@email.com
   - **Password:** At least 6 characters
   - **Confirm Password:** Same as above
5. Click "Register"
6. You'll be logged in and redirected to dashboard

### Login

1. Go to http://localhost:3000/login
2. Enter your email and password
3. Click "Login"

## 📝 Test the Features

### Create a Task

1. Click "Tasks" in the sidebar
2. Click "New Task" button
3. Fill in:
   - **Title:** "Learn React" (required)
   - **Description:** "Study React hooks and state management"
   - **Priority:** High
   - **Deadline:** Select a date
4. Click "Create Task"

### Manage Tasks

- **Mark Complete:** Click the circle icon
- **Edit:** Click the pencil icon
- **Delete:** Click the trash icon

### View Dashboard

Click "Dashboard" to see:
- Total tasks created
- Completed tasks count
- Pending tasks count
- Quick tips

### Toggle Dark Mode

Click the sun/moon icon in the top-right corner

## 📊 View Database (Optional)

Open Prisma Studio to see your data:

```bash
# In the server directory
npx prisma studio
```

This opens a web interface at http://localhost:5555

## 🛑 Stop Servers

To stop the servers:
1. In each terminal, press `Ctrl + C`

## 🔄 Restart Servers

To restart:

### Terminal 1 (Backend)
```bash
cd "c:\xampp\htdocs\Smart Study Planner\server"
npm run dev
```

### Terminal 2 (Frontend)
```bash
cd "c:\xampp\htdocs\Smart Study Planner\client"
npm run dev
```

## 🚨 Troubleshooting

### Issue: Database connection error

**Error:** `Error connecting to database`

**Solution:**
1. Check PostgreSQL is running
2. Verify DATABASE_URL in .env
3. Confirm password is correct
4. Test connection:

```bash
psql -U postgres -d smart_study_planner
```

### Issue: Port 5000 already in use

**Solution:**
1. Change PORT in server/.env to 5001:
```env
PORT=5001
```

2. Update frontend .env.local:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

3. Restart servers

### Issue: Module not found error

**Solution:**
```bash
# Delete node_modules and reinstall
rm -r node_modules
npm install
```

### Issue: Prisma migration failed

**Solution:**
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Or create new migration
npx prisma migrate dev --name fix_issue
```

### Issue: Can't login after registration

**Solution:**
1. Clear browser cookies:
   - Open DevTools (F12)
   - Application → Cookies → Clear
2. Clear localStorage:
   - Console → `localStorage.clear()`
3. Restart browser
4. Try login again

## 📈 Verify Everything Works

Checklist:

- [ ] PostgreSQL running
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can register new account
- [ ] Can login
- [ ] Can see dashboard
- [ ] Can create a task
- [ ] Can see tasks in task list
- [ ] Dark mode toggle works

## 🔐 Security Notes

### Development Only

The `.env` files with secrets are for development only. For production:

1. Use environment variables from hosting service
2. Use strong JWT_SECRET
3. Use strong database password
4. Enable HTTPS
5. Set proper CORS origins

### Never Commit Secrets

The `.gitignore` already ignores:
- `.env` files
- `node_modules`
- `.next` build folder

## 📚 Next Steps

1. **Explore the Code:**
   - Check `server/controllers/` for business logic
   - Check `client/components/` for UI components
   - Check `server/prisma/schema.prisma` for database structure

2. **Customize:**
   - Change colors in `client/tailwind.config.js`
   - Add more task fields in Prisma schema
   - Modify validation rules

3. **Deploy:**
   - Backend: Deploy to Heroku, AWS, or similar
   - Frontend: Deploy to Vercel, Netlify, or similar

## 🆘 Getting Help

1. **Check Logs:**
   - Browser console (F12)
   - Terminal output

2. **Check Files:**
   - `README.md` - General documentation
   - `SETUP.md` - Quick setup guide
   - `server/` - Backend code
   - `client/` - Frontend code

3. **Common Issues:**
   - Clear browser cache (Ctrl + Shift + Delete)
   - Restart both servers
   - Check .env files

## ✅ You're All Set!

Congratulations! Your Smart Study Planner is now running. Start creating tasks and organizing your studies! 📚✨

---

**Questions?** Refer to the main README.md for more detailed documentation.
