# Task Management System

A simple Task Management System built using MERN stack.

This project allows users to register, login, create projects and manage tasks under different projects.

I created this project as a machine test to practice complete backend and frontend flow with authentication.

---

## Tech Stack

### Frontend
- React.js
- JavaScript
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt for password hashing

### Tools
- Postman
- Git
- MongoDB Compass

---

## Features

### Authentication
- User Registration
- User Login
- Password hashing using bcrypt
- JWT based authentication
- Protected routes using middleware

### Project Module
- Create Project
- Get Project List
- Update Project
- Delete Project

### Task Module
- Create Task
- Update Task
- Delete Task
- Search Task
- Filter Task by status and priority

---

## Project Structure

```
backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
│
├── middlewares
│   └── authMiddleware.js
│
├── models
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── routes
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── utils
│   └── generateToken.js
│
├── .env
├── server.js
└── package.json


frontend
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── hooks
│   ├── context
│   └── App.jsx
│
└── package.json
```

---

# Backend Setup

Go inside backend folder

```
cd backend
```

Install dependencies

```
npm install
```

Create `.env` file inside backend folder.

Example:

```
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/taskManagementDB

JWT_SECRET=yourSecretKey

JWT_EXPIRE=7d
```

Note:
Do not push `.env` file in github because it contains secret information.

---

## Start Backend Server

Run:

```
npm start
```

or

```
node server.js
```

Server will start on:

```
http://localhost:5000
```

---

# API Endpoints

## Authentication

### Register User

```
POST /api/auth/register
```

Request:

```json
{
    "name":"Pragya",
    "email":"pragya@gmail.com",
    "password":"123456"
}
```

---

### Login User

```
POST /api/auth/login
```

Request:

```json
{
    "email":"pragya@gmail.com",
    "password":"123456"
}
```

Response contains JWT token.

Use this token for protected APIs.

Header format:

```
Authorization: Bearer token
```

---

# Project APIs

## Create Project

```
POST /api/projects
```

Protected API.

Header:

```
Authorization: Bearer token
```

Body:

```json
{
    "name":"Task Management",
    "description":"Project for machine test"
}
```

---

## Get Projects

```
GET /api/projects
```

---

## Update Project

```
PUT /api/projects/:id
```

---

## Delete Project

```
DELETE /api/projects/:id
```

---

# Task APIs

## Create Task

```
POST /api/tasks
```

Body Example:

```json
{
    "title":"Create login API",
    "description":"Complete authentication module",
    "status":"Todo",
    "priority":"High",
    "project":"projectId"
}
```

---

## Search and Filter Tasks

Example:

```
GET /api/tasks?status=Todo&priority=High&search=login
```

---

# Authentication Flow

1. User register with email and password.
2. Password is converted into encrypted hash using bcrypt.
3. User login with valid credentials.
4. Server generates JWT token.
5. Token is verified using auth middleware before accessing protected APIs.

---

# Environment Variables

Following variables are used:

```
PORT
MONGO_URI
JWT_SECRET
JWT_EXPIRE
```

---

# Common Issues

### MongoDB not connecting

Make sure MongoDB service is running.

Check your MongoDB URL in `.env` file.

---

### JWT Error

Make sure Authorization header format is correct.

Correct:

```
Bearer your_token_here
```

---

# Author

Pragya Modi

MERN Stack Developer

---