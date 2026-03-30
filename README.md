# Project Management App

A full-stack project management application that allows users to create projects and manage tasks within them.

This project demonstrates clean architecture, full-stack integration, authentication, and scalable design.

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- NestJS
- TypeScript

### Database & Auth
- Supabase (PostgreSQL + Authentication)

### Monorepo
- Turborepo
- PNPM

---

## Features

### Authentication
- User signup
- User login
- JWT-based authentication
- Protected backend routes

### Project Management
- Create project
- View all projects
- Update project
- Delete project

### Task Management
- Create tasks inside projects
- Update task status (todo, in-progress, done)
- Delete tasks

### UI
- Clean and responsive design
- Dashboard with project cards
- Task page with status indicators

---

## Project Structure

project-management-app/
│
├── apps/
│   ├── frontend/   # Next.js application
│   ├── backend/    # NestJS API
│   └── docs/       # Documentation (optional)
│
├── packages/       # Shared configs
├── turbo.json
└── pnpm-workspace.yaml

---

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/Gaurav-n-code/project-management.git
cd project-management-app

---

### 2. Install dependencies

pnpm install

---

### 3. Setup environment variables

### Backend (apps/backend/.env)

NOTE: It is totally optional as I had hardcoded it.
SUPABASE_URL=your_supabase_url  
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  

---

### Frontend (apps/frontend/.env.local)

NOTE: It is totally optional as I had hardcoded it.
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key  

---

### 4. Run the application

pnpm dev

---

### 5. Access the app

Frontend → http://localhost:3000  
Backend → http://localhost:3002  

---

### 6. Login
Email: test@gmail.com
Password: Test123!@#

## Architecture Overview

- Frontend communicates with backend via REST APIs
- Backend handles business logic and authentication
- Supabase provides:
  - Database (PostgreSQL)
  - Authentication (JWT)

---

## Tradeoffs & Decisions

- Used Supabase to speed up development and focus on core logic
- Chose monorepo for better scalability and code organization
- Prioritized functionality over heavy UI libraries

---

## Status

 Authentication implemented  
 Full CRUD (Projects & Tasks)  
 Clean UI  
 Backend integration complete  
 Ready for scaling and improvements  