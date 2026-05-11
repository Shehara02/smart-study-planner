# Full Stack Setup Guide

This guide explains how to run the Smart Study Planner as a complete full-stack application.

## Architecture

The application consists of:
- **Frontend**: Next.js (React) running on port 3000 (development)
- **Backend**: Express.js running on port 5000 (API endpoints)
- **Database**: PostgreSQL

## Development Setup

### 1. Initial Setup

From the root directory, install all dependencies:

```bash
npm run install:all
```

This command will:
- Install root dependencies (concurrently)
- Install server dependencies
- Install client dependencies

### 2. Configure Environment Variables

#### Server (.env in `/server` directory)
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/smart_study_planner
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Client (.env.local in `/client` directory)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Set Up Database

```bash
cd server
npx prisma migrate dev --name init
cd ..
```

### 4. Run Development Servers

From the root directory, run both servers concurrently:

```bash
npm run dev
```

This will start:
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:3000`

**Access the application at: `http://localhost:3000`**

## Production Setup

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Configure Environment Variables

#### Server (.env in `/server` directory)
```
PORT=80
DATABASE_URL=postgresql://user:password@yourhost:5432/smart_study_planner
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=production
FRONTEND_URL=http://yourdomain.com
```

#### Client (.env.local in `/client` directory)
```
NEXT_PUBLIC_API_URL=http://yourdomain.com/api
```

### 3. Build and Start

Build and start the application (both frontend and backend on the same server):

```bash
npm run start:prod
```

Or separately:

```bash
# Build the frontend
npm run build

# Start the backend (which will serve the built frontend)
cd server
npm start
```

**Access the application at: `http://localhost` or your configured domain**

## How It Works

### Development
- Frontend (Next.js) runs on port 3000 and communicates with the backend via API calls to `http://localhost:5000/api`
- Backend serves only API endpoints
- Frontend handles all routing via client-side navigation

### Production
- Frontend is built into static files
- Backend (Express) serves:
  - Static assets (CSS, JS, images)
  - API endpoints at `/api/*`
  - Frontend pages via catch-all route (for client-side routing)
- Everything runs on a single port (80 or 5000)

## Available Scripts

### Root Directory
```bash
npm run install:all     # Install all dependencies
npm run dev             # Run both servers concurrently (development)
npm run build           # Build the frontend
npm run start           # Start backend server
npm run start:prod      # Build frontend + start backend (production)
```

### Server Directory
```bash
cd server
npm run dev             # Start server with nodemon
npm start              # Start server normally
npm run prisma:migrate # Run database migrations
npm run prisma:studio  # Open Prisma Studio
```

### Client Directory
```bash
cd client
npm run dev            # Start Next.js dev server
npm run build          # Build for production
npm start             # Start production server
npm run lint          # Run ESLint
```

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is in use:

#### For development:
Change the port in the dev script or use:
```bash
PORT=3001 npm run dev  # For Next.js
```

#### For production:
Change the PORT in the `.env` file before running `npm run start:prod`

### Frontend Can't Connect to Backend

1. Verify backend is running: `http://localhost:5000/api/health`
2. Check `NEXT_PUBLIC_API_URL` in client/.env.local
3. Ensure CORS is configured correctly in `server/server.js`

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check `DATABASE_URL` in `server/.env`
3. Ensure database exists and user has permissions

## API Endpoints

All API endpoints are prefixed with `/api/`:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks (requires auth)
- `POST /api/tasks` - Create new task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)
- `GET /api/tasks/stats` - Get task statistics (requires auth)

### Health Check
- `GET /api/health` - Server health check

## Next Steps

1. Configure your database URL in `server/.env`
2. Run `npm run dev` from the root directory
3. Access the app at `http://localhost:3000`
4. Start developing!

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [API Documentation](./API.md)
