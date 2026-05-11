# API Documentation

## Overview

Smart Study Planner API is built with Express.js and provides RESTful endpoints for user authentication and task management. All responses are in JSON format.

## Base URL

```
http://localhost:5000/api
```

## Authentication

### JWT Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Token Format

Tokens are obtained from the login endpoint and expire based on `JWT_EXPIRE` setting (default: 7 days).

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { /* Response data */ },
  "message": "Success message (optional)"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

## Endpoints

### 1. Authentication Endpoints

#### Register User

Create a new user account.

```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Validation Rules:**
- `name` - Required, string
- `email` - Required, valid email format
- `password` - Required, minimum 6 characters

**Error (400):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

#### Login User

Authenticate and get JWT token.

```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 2. Task Endpoints

#### Get All Tasks

Retrieve all tasks for the authenticated user.

```
GET /tasks
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learn React",
      "description": "Study React hooks and state management",
      "priority": "HIGH",
      "deadline": "2024-12-31T23:59:59.000Z",
      "completed": false,
      "userId": 1,
      "createdAt": "2024-05-11T10:00:00.000Z",
      "updatedAt": "2024-05-11T10:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Read Chapter 5",
      "description": null,
      "priority": "MEDIUM",
      "deadline": null,
      "completed": true,
      "userId": 1,
      "createdAt": "2024-05-10T15:30:00.000Z",
      "updatedAt": "2024-05-11T09:00:00.000Z"
    }
  ]
}
```

---

#### Get Task by ID

Retrieve a specific task.

```
GET /tasks/:id
Authorization: Bearer <token>
```

**Parameters:**
- `id` (path) - Task ID (integer)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn React",
    "description": "Study React hooks and state management",
    "priority": "HIGH",
    "deadline": "2024-12-31T23:59:59.000Z",
    "completed": false,
    "userId": 1,
    "createdAt": "2024-05-11T10:00:00.000Z",
    "updatedAt": "2024-05-11T10:00:00.000Z"
  }
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

#### Create Task

Create a new task.

```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Learn React",
  "description": "Study React hooks and state management",
  "priority": "HIGH",
  "deadline": "2024-12-31"
}
```

**Request Body:**
- `title` (string, required) - Task title
- `description` (string, optional) - Task description
- `priority` (string, optional) - LOW, MEDIUM, or HIGH (default: MEDIUM)
- `deadline` (date, optional) - Task deadline (ISO format: YYYY-MM-DD)

**Response (201):**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 3,
    "title": "Learn React",
    "description": "Study React hooks and state management",
    "priority": "HIGH",
    "deadline": "2024-12-31T00:00:00.000Z",
    "completed": false,
    "userId": 1,
    "createdAt": "2024-05-11T10:30:00.000Z",
    "updatedAt": "2024-05-11T10:30:00.000Z"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "msg": "Task title is required",
      "param": "title"
    }
  ]
}
```

---

#### Update Task

Update an existing task.

```
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Learn React Advanced",
  "priority": "MEDIUM",
  "completed": true
}
```

**Parameters:**
- `id` (path) - Task ID (integer)

**Request Body:**
- `title` (string, optional) - Task title
- `description` (string, optional) - Task description
- `priority` (string, optional) - LOW, MEDIUM, or HIGH
- `deadline` (date, optional) - Task deadline (ISO format: YYYY-MM-DD)
- `completed` (boolean, optional) - Task completion status

**Response (200):**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "title": "Learn React Advanced",
    "description": "Study React hooks and state management",
    "priority": "MEDIUM",
    "deadline": "2024-12-31T00:00:00.000Z",
    "completed": true,
    "userId": 1,
    "createdAt": "2024-05-11T10:00:00.000Z",
    "updatedAt": "2024-05-11T10:35:00.000Z"
  }
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

---

#### Delete Task

Delete a task.

```
DELETE /tasks/:id
Authorization: Bearer <token>
```

**Parameters:**
- `id` (path) - Task ID (integer)

**Response (200):**

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

#### Get Task Statistics

Get task statistics for the user.

```
GET /tasks/stats
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "totalTasks": 5,
    "completedTasks": 2,
    "pendingTasks": 3
  }
}
```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - User not authorized |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Error Codes

| Error | Status | Description |
|-------|--------|-------------|
| USER_CREATED | 201 | User registered successfully |
| LOGIN_SUCCESS | 200 | User logged in successfully |
| TASK_CREATED | 201 | Task created successfully |
| TASK_UPDATED | 200 | Task updated successfully |
| TASK_DELETED | 200 | Task deleted successfully |
| INVALID_CREDENTIALS | 401 | Invalid email or password |
| EMAIL_EXISTS | 400 | Email already exists |
| USER_NOT_FOUND | 404 | User not found |
| TASK_NOT_FOUND | 404 | Task not found |
| UNAUTHORIZED | 401/403 | Unauthorized access |
| INVALID_INPUT | 400 | Invalid input data |
| SERVER_ERROR | 500 | Internal server error |

---

## Priority Levels

| Value | Level |
|-------|-------|
| LOW | Low Priority |
| MEDIUM | Medium Priority (default) |
| HIGH | High Priority |

---

## Example Requests using cURL

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Learn React",
    "description": "Study React hooks",
    "priority": "HIGH",
    "deadline": "2024-12-31"
  }'
```

### Get All Tasks

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Task

```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "completed": true
  }'
```

### Delete Task

```bash
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Rate Limiting

Currently, rate limiting is not implemented. For production, consider adding rate limiting middleware.

## CORS

CORS is enabled for the frontend URL specified in `.env`:

```
FRONTEND_URL=http://localhost:3000
```

---

## Testing the API

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new collection
3. Add requests using the endpoints above
4. For protected endpoints, add token to Authorization tab

### Using REST Client (VS Code)

Install the REST Client extension and create a `.rest` file:

```
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Health Check

Check if the API is running:

```
GET /api/health
```

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Future Enhancements

- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Task attachments
- [ ] Notifications/reminders
- [ ] Collaboration features
- [ ] Task notes/comments
- [ ] Filtering and sorting
- [ ] Export tasks

---

For more information, refer to the [main README.md](README.md)
