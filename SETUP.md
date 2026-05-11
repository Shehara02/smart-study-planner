# Setup Instructions

## Quick Start Guide

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup (Port 5000)

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma migrate dev --name init
npm run dev
```

### Frontend Setup (Port 3000)

Open a new terminal:
```bash
cd client
npm install
cp .env.local.example .env.local
npm run dev
```

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Prisma Studio: npm run prisma:studio (from server directory)

### Create First User

1. Visit http://localhost:3000/register
2. Fill in registration form
3. Click Register
4. You're in!

## Environment Variables

### Server (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/smart_study_planner
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Client (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Features Included

✅ User Authentication (Register & Login)
✅ JWT-based Security
✅ Task Management (CRUD)
✅ Task Priorities (Low, Medium, High)
✅ Task Deadlines
✅ Dashboard with Statistics
✅ Dark Mode Support
✅ Responsive Design
✅ Toast Notifications
✅ Input Validation
✅ Error Handling
✅ Protected Routes

## Common Commands

### Backend
```bash
cd server
npm run dev          # Start development server
npm run start        # Start production server
npm run prisma:migrate  # Run database migrations
npm run prisma:studio   # Open Prisma Studio
```

### Frontend
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
```

## Troubleshooting

### Database Connection Failed
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Verify database exists
- Run: `npx prisma migrate dev`

### Port Already in Use
- Change PORT in .env
- Kill process on that port

### Module Not Found
- Delete node_modules
- Run: `npm install`

## Next Steps

1. Customize the UI colors and styling
2. Add email notifications
3. Add task categories/tags
4. Add collaboration features
5. Deploy to production

Enjoy your Smart Study Planner! 📚✨
