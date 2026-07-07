# Portfolio Management System — Full Stack MERN Application

A production-ready, full-stack portfolio management system built with the **MERN Stack** (MongoDB, Express.js, React.js with Vite, Node.js). Features JWT authentication, complete CRUD operations for portfolio projects, image uploads, advanced search/filtering/sorting/pagination, interactive dashboard with charts, responsive design, Framer Motion animations, and a premium light-theme SaaS-inspired UI.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Environment Configuration](#-environment-configuration)
- [Local Setup & Installation](#-local-setup--installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Performance Optimizations](#-performance-optimizations)
- [Security Practices](#-security-practices)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌟 Overview

This application is a comprehensive portfolio management dashboard that allows developers and professionals to manage their portfolio projects efficiently. It provides a polished, corporate-grade interface with real-time statistics, interactive charts, and seamless CRUD operations — all secured with JWT-based authentication.

The system is designed with **production readiness** in mind: clean folder architecture, reusable components, centralized API services, input validation, error handling, lazy loading, code splitting, and optimized database queries.

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **Vite 5** | Build tool & dev server |
| **React Router DOM v6** | Client-side routing |
| **Framer Motion** | Animations & transitions |
| **Axios** | HTTP client with interceptors |
| **Tailwind CSS 3** | Utility-first styling |
| **Recharts** | Interactive charts & graphs |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library |
| **React Loader Spinner** | Loading spinners |
| **React Dropzone** | Drag-and-drop file uploads |
| **DOMPurify** | XSS prevention |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js 20+** | Runtime environment |
| **Express.js 4** | Web framework |
| **MongoDB** | NoSQL database (local via Compass) |
| **Mongoose 8** | ODM for MongoDB |
| **JSON Web Token (JWT)** | Authentication |
| **bcryptjs** | Password hashing |
| **Multer** | File upload middleware |
| **Express Validator** | Input validation |
| **CORS** | Cross-origin resource sharing |
| **Helmet** | Security headers |
| **Morgan** | HTTP request logger |
| **Dotenv** | Environment variable management |

### Development & DevOps
| Technology | Purpose |
|---|---|
| **MongoDB Compass** | Local database GUI management |
| **Vercel** | Frontend deployment |
| **Render** | Backend deployment |
| **Git & GitHub** | Version control |
| **Postman** | API testing |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Vite + React)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ Auth     │  │ Dashboard│  │ Projects │  │ Profile    │  │
│  │ Pages    │  │ Pages    │  │ Pages    │  │ Pages      │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       │              │              │               │         │
│  ┌────▼──────────────▼──────────────▼───────────────▼──────┐│
│  │            Shared Components & Custom Hooks              ││
│  │  (Sidebar, Navbar, Cards, Tables, Modals, Skeletons,    ││
│  │   Charts, Toasts, Loaders, Protected Routes)            ││
│  └────────────────────────┬───────────────────────────────┘│
│  ┌────────────────────────▼───────────────────────────────┐│
│  │              Axios API Service (Interceptors)            ││
│  └────────────────────────┬───────────────────────────────┘│
└───────────────────────────┼─────────────────────────────────┘
                            │  HTTPS / REST API
┌───────────────────────────▼─────────────────────────────────┐
│                     SERVER (Express + Node)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ Auth     │  │ Project  │  │ Profile  │  │ Upload     │  │
│  │ Routes   │  │ Routes   │  │ Routes   │  │ Routes     │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └─────┬──────┘  │
│       │              │              │               │         │
│  ┌────▼──────────────▼──────────────▼───────────────▼──────┐│
│  │              Middleware Layer                            ││
│  │  (Auth JWT, Error Handler, Validator, CORS, Helmet,     ││
│  │   Morgan, Multer)                                       ││
│  └────────────────────────┬───────────────────────────────┘│
│  ┌────────────────────────▼───────────────────────────────┐│
│  │              Models (Mongoose Schemas)                   ││
│  │  (User, Project)                                        ││
│  └────────────────────────┬───────────────────────────────┘│
└───────────────────────────┼─────────────────────────────────┘
                            │  Mongoose ODM
┌───────────────────────────▼─────────────────────────────────┐
│               MONGODB (Local — Managed via Compass)          │
│  ┌──────────────┐  ┌────────────────────────────────────┐  │
│  │ users        │  │ projects                            │  │
│  │ (auth data,  │  │ (title, description, technologies,  │  │
│  │  profile)    │  │  category, links, images, status)   │  │
│  └──────────────┘  └────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration with input validation
- Secure login with bcrypt-hashed passwords
- JWT-based authentication with access tokens
- Protected routes with auth middleware
- Secure logout with token cleanup
- Automatic token refresh handling

### 📊 Dashboard
- Real-time statistics cards (total projects, by status, by category, recent activity)
- Interactive charts (project distribution by category, status breakdown, monthly trends)
- Recent projects feed with quick actions
- Animated counters and stat cards
- Responsive grid layout

### 📁 Portfolio CRUD
- **Create** projects with full details (title, description, technologies, category, GitHub link, live demo link, project image, status)
- **Read** projects in a beautiful table/card view with pagination
- **Update** projects with pre-filled forms
- **Delete** projects with confirmation dialogs
- Project image upload via drag-and-drop or file picker
- Project status management (Completed, In Progress, Planned, On Hold)

### 🔍 Search, Filter, Sort & Pagination
- Real-time text search across title and description
- Filter by category (Web App, Mobile App, API, Library, UI/UX, DevOps, Other)
- Filter by status (Completed, In Progress, Planned, On Hold)
- Sort by date, title, status (ascending/descending)
- Server-side pagination with configurable page size

### 👤 User Profile
- View and update profile information (name, email, bio, phone, website, location)
- Profile picture upload and update
- Secure password change (current password verification)
- Profile data persistence

### 🎨 UI/UX
- Premium light-theme SaaS dashboard design
- White background with blue primary color (#2563EB)
- Subtle shadows, rounded cards, elegant typography
- Fully responsive (desktop, tablet, mobile)
- Collapsible sidebar navigation
- Top navigation bar with user menu
- Breadcrumb navigation
- Empty states with illustrations
- Accessible markup (ARIA labels, semantic HTML, keyboard navigation)

### 🎬 Animations (Framer Motion)
- Page transition animations
- Fade-in and slide-up effects on page load
- Hover animations on cards and buttons
- Loading animations and spinners
- Skeleton loaders for content placeholders
- Modal open/close animations
- Sidebar expand/collapse animations
- Staggered list animations
- Chart entrance animations

### 🔔 Notifications & Feedback
- Success, error, warning, and info toast notifications
- Form validation with inline error messages
- Loading spinners during API calls
- Skeleton loaders for initial page loads
- Confirmation dialogs for destructive actions
- Empty state messages

### 📁 File Uploads
- Project image upload with Multer
- Profile picture upload
- Drag-and-drop file upload interface
- File type and size validation
- Image preview before upload
- Stored in local `uploads/` directory

---

## 📁 Project Structure

```
portfolio-management-system/
│
├── 📂 backend/
│   ├── 📂 config/
│   │   └── db.js                      # MongoDB connection
│   ├── 📂 controllers/
│   │   ├── authController.js           # Auth logic (register, login, logout)
│   │   ├── projectController.js        # Project CRUD logic
│   │   └── profileController.js        # Profile & password logic
│   ├── 📂 middleware/
│   │   ├── authMiddleware.js           # JWT verification
│   │   ├── errorHandler.js             # Centralized error handler
│   │   └── validateMiddleware.js       # Express-validator wrapper
│   ├── 📂 models/
│   │   ├── User.js                     # User schema & model
│   │   └── Project.js                  # Project schema & model
│   ├── 📂 routes/
│   │   ├── authRoutes.js               # /api/auth/* endpoints
│   │   ├── projectRoutes.js            # /api/projects/* endpoints
│   │   ├── profileRoutes.js            # /api/profile/* endpoints
│   │   └── uploadRoutes.js             # /api/upload/* endpoints
│   ├── 📂 uploads/                     # Uploaded files (gitignored)
│   │   ├── projects/                   # Project images
│   │   └── profiles/                   # Profile pictures
│   ├── 📂 validators/
│   │   ├── authValidator.js            # Auth input validation rules
│   │   ├── projectValidator.js         # Project input validation rules
│   │   └── profileValidator.js         # Profile input validation rules
│   ├── 📄 .env                         # Environment variables (gitignored)
│   ├── 📄 .env.example                 # Environment variables template
│   ├── 📄 .gitignore
│   ├── 📄 package.json
│   └── 📄 server.js                    # Entry point
│
├── 📂 frontend/
│   ├── 📂 public/
│   │   ├── favicon.ico
│   │   └── assets/                     # Static assets
│   ├── 📂 src/
│   │   ├── 📂 api/
│   │   │   ├── axios.js                # Axios instance with interceptors
│   │   │   ├── authApi.js              # Auth API calls
│   │   │   ├── projectApi.js           # Project API calls
│   │   │   └── profileApi.js           # Profile API calls
│   │   ├── 📂 components/
│   │   │   ├── 📂 common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Textarea.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── SkeletonLoader.jsx
│   │   │   │   ├── ConfirmDialog.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   └── ImageUpload.jsx
│   │   │   ├── 📂 layout/
│   │   │   │   ├── MainLayout.jsx       # Dashboard layout wrapper
│   │   │   │   ├── Sidebar.jsx          # Collapsible sidebar nav
│   │   │   │   ├── TopNav.jsx           # Top navigation bar
│   │   │   │   └── MobileNav.jsx        # Mobile bottom/drawer nav
│   │   │   ├── 📂 dashboard/
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   ├── StatsGrid.jsx
│   │   │   │   ├── ProjectChart.jsx
│   │   │   │   ├── StatusChart.jsx
│   │   │   │   ├── RecentProjects.jsx
│   │   │   │   └── ActivityFeed.jsx
│   │   │   └── 📂 projects/
│   │   │       ├── ProjectCard.jsx
│   │   │       ├── ProjectTable.jsx
│   │   │       ├── ProjectForm.jsx
│   │   │       ├── ProjectFilters.jsx
│   │   │       └── ProjectStatusBadge.jsx
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx           # Auth state management
│   │   ├── 📂 hooks/
│   │   │   ├── useProjects.js           # Projects data fetching hook
│   │   │   ├── useDebounce.js           # Debounce hook for search
│   │   │   ├── useMediaQuery.js         # Responsive breakpoint hook
│   │   │   └── useAuth.js               # Auth context hook
│   │   ├── 📂 pages/
│   │   │   ├── 📂 auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   ├── 📂 dashboard/
│   │   │   │   └── DashboardPage.jsx
│   │   │   ├── 📂 projects/
│   │   │   │   ├── ProjectsListPage.jsx
│   │   │   │   ├── CreateProjectPage.jsx
│   │   │   │   ├── EditProjectPage.jsx
│   │   │   │   └── ProjectDetailPage.jsx
│   │   │   ├── 📂 profile/
│   │   │   │   └── ProfilePage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   └── UnauthorizedPage.jsx
│   │   ├── 📂 routes/
│   │   │   ├── AppRouter.jsx            # Route definitions
│   │   │   └── ProtectedRoute.jsx       # Auth guard component
│   │   ├── 📂 utils/
│   │   │   ├── constants.js             # App constants & enums
│   │   │   ├── helpers.js               # Utility functions
│   │   │   └── validators.js            # Frontend validation helpers
│   │   ├── 📄 App.jsx                   # Root component
│   │   ├── 📄 main.jsx                  # Entry point
│   │   └── 📄 index.css                 # Global styles & Tailwind
│   ├── 📄 .env                          # Environment variables (gitignored)
│   ├── 📄 .env.example                  # Environment variables template
│   ├── 📄 .gitignore
│   ├── 📄 index.html
│   ├── 📄 package.json
│   ├── 📄 tailwind.config.js
│   ├── 📄 postcss.config.js
│   └── 📄 vite.config.js
│
├── 📄 .gitignore                        # Root gitignore
├── 📄 README.md                         # This file
└── 📄 docker-compose.yml                # (Optional) Docker setup
```

---

## ✅ Prerequisites

Ensure the following are installed on your system:

| Requirement | Minimum Version | Check Command |
|---|---|---|
| **Node.js** | v20.0.0+ | `node --version` |
| **npm** (or yarn/pnpm) | v10.0.0+ | `npm --version` |
| **MongoDB Community Server** | v7.0+ | `mongod --version` |
| **MongoDB Compass** | Latest stable | GUI application |
| **Git** | v2.40+ | `git --version` |
| **A code editor** | Any (VS Code recommended) | — |

> **Important:** MongoDB must be running locally. The default connection string is `mongodb://localhost:27017/portfolio_db`. Ensure MongoDB Compass can connect to this URL before proceeding.

---

## ⚙️ Environment Configuration

### Backend `.env` (copy from `.env.example`)

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Connection (Local)
MONGODB_URI=mongodb://localhost:27017/portfolio_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp,image/gif

# CORS Origins (Frontend URL)
CLIENT_URL=http://localhost:5173

# Cookie Settings
COOKIE_HTTP_ONLY=true
COOKIE_SECURE=false
COOKIE_SAME_SITE=Lax
COOKIE_MAX_AGE=604800000
```

### Frontend `.env` (copy from `.env.example`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Portfolio Manager
VITE_APP_VERSION=1.0.0
```

> ⚠️ **Security Warning:** Never commit `.env` files to version control. The `.gitignore` files are configured to exclude them. Use strong, randomly generated secrets for production.

---

## 🚀 Local Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/portfolio-management-system.git
cd portfolio-management-system
```

### 2. Start MongoDB Locally

```bash
# On macOS (Homebrew)
brew services start mongodb-community

# On Linux (systemd)
sudo systemctl start mongod

# On Windows (Command Prompt as Administrator)
net start MongoDB
```

Verify with **MongoDB Compass** — connect to `mongodb://localhost:27017`.

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration (see Environment Configuration above)
# nano .env  or  code .env
```

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# nano .env  or  code .env
```

### 5. Create Upload Directories

```bash
cd ../backend
mkdir -p uploads/projects uploads/profiles
```

---

## ▶️ Running the Application

### Development Mode (Recommended)

Open **two separate terminal windows**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server running at http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App running at http://localhost:5173
```

### Production Build (Local Testing)

```bash
# Build frontend
cd frontend
npm run build

# The build output is in frontend/dist/
# Serve it with the backend or a static file server

# Build & start backend in production mode
cd ../backend
NODE_ENV=production npm start
```

### Available NPM Scripts

#### Backend
| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (hot reload) |
| `npm start` | Start in production mode |
| `npm run lint` | Run ESLint |

#### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 📡 API Documentation

### Base URL
```
Development:  http://localhost:5000/api
Production:   https://your-backend.onrender.com/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `POST` | `/auth/logout` | Logout and clear cookie | ❌ |
| `GET` | `/auth/me` | Get current authenticated user | ✅ |

#### `POST /auth/register`
```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}

// Success Response (201)
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": null,
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

#### `POST /auth/login`
```json
// Request Body
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// Success Response (200)
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": "/uploads/profiles/default.png"
    }
  }
}

// Response includes HTTP-only cookie: token=jwt_token_value
```

---

### Project Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/projects` | List projects (with filters, search, sort, pagination) | ✅ |
| `GET` | `/projects/:id` | Get single project by ID | ✅ |
| `POST` | `/projects` | Create a new project | ✅ |
| `PUT` | `/projects/:id` | Update a project | ✅ |
| `DELETE` | `/projects/:id` | Delete a project | ✅ |
| `GET` | `/projects/stats/summary` | Get dashboard statistics | ✅ |

#### `GET /projects` — Query Parameters
```
GET /api/projects?page=1&limit=10&search=react&category=Web App&status=Completed&sortBy=createdAt&sortOrder=desc
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | Number | `1` | Page number |
| `limit` | Number | `10` | Items per page (max: 50) |
| `search` | String | `""` | Search in title & description |
| `category` | String | `""` | Filter by category |
| `status` | String | `""` | Filter by status |
| `sortBy` | String | `"createdAt"` | Field to sort by |
| `sortOrder` | String | `"desc"` | `asc` or `desc` |

#### `POST /projects` — Create Project
```json
// Request Body (multipart/form-data)
{
  "title": "E-Commerce Platform",
  "description": "A full-stack e-commerce application built with modern technologies...",
  "technologies": ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
  "category": "Web App",
  "githubUrl": "https://github.com/user/ecommerce-platform",
  "liveUrl": "https://ecommerce-demo.vercel.app",
  "status": "Completed",
  "image": <File>              // Optional: image file
}

// Success Response (201)
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "project": {
      "_id": "66b2c3d4e5f6g7h8i9j0k1l2",
      "title": "E-Commerce Platform",
      "description": "A full-stack e-commerce application...",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      "category": "Web App",
      "githubUrl": "https://github.com/user/ecommerce-platform",
      "liveUrl": "https://ecommerce-demo.vercel.app",
      "imageUrl": "/uploads/projects/66b2c3d4-image.jpg",
      "status": "Completed",
      "user": "66a1b2c3d4e5f6g7h8i9j0k1",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

#### `DELETE /projects/:id`
```json
// Success Response (200)
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

### Profile Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/profile` | Get current user profile | ✅ |
| `PUT` | `/profile` | Update profile information | ✅ |
| `PUT` | `/profile/password` | Change password | ✅ |
| `POST` | `/profile/picture` | Upload profile picture | ✅ |

#### `PUT /profile` — Update Profile
```json
// Request Body
{
  "name": "John Doe",
  "bio": "Full-stack developer with 5+ years of experience",
  "phone": "+1234567890",
  "website": "https://johndoe.dev",
  "location": "San Francisco, CA"
}

// Success Response (200)
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "bio": "Full-stack developer with 5+ years of experience",
      "phone": "+1234567890",
      "website": "https://johndoe.dev",
      "location": "San Francisco, CA",
      "profilePicture": "/uploads/profiles/66a1b2c3-avatar.jpg"
    }
  }
}
```

#### `PUT /profile/password` — Change Password
```json
// Request Body
{
  "currentPassword": "SecurePass123!",
  "newPassword": "NewSecurePass456!",
  "confirmNewPassword": "NewSecurePass456!"
}

// Success Response (200)
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### Upload Endpoint

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/upload/project-image` | Upload a project image | ✅ |

```json
// Request: multipart/form-data with "image" field
// Success Response (200)
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "imageUrl": "/uploads/projects/66b2c3d4-image-1234567890.jpg"
  }
}
```

---

### Error Response Format

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```

### HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | OK — Request successful |
| `201` | Created — Resource created successfully |
| `400` | Bad Request — Validation error or invalid input |
| `401` | Unauthorized — Missing or invalid token |
| `403` | Forbidden — Insufficient permissions |
| `404` | Not Found — Resource does not exist |
| `409` | Conflict — Duplicate resource (e.g., email exists) |
| `413` | Payload Too Large — File exceeds size limit |
| `415` | Unsupported Media Type — Invalid file type |
| `500` | Internal Server Error — Server-side failure |

---

## 🗄 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,                    // Auto-generated
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false                    // Excluded from queries by default
  },
  bio: {
    type: String,
    maxlength: [500, "Bio cannot exceed 500 characters"],
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  website: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  profilePicture: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes
// email: unique (automatically created by Mongoose)
```

### Projects Collection

```javascript
{
  _id: ObjectId,                    // Auto-generated
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [2000, "Description cannot exceed 2000 characters"]
  },
  technologies: {
    type: [String],
    required: [true, "At least one technology is required"],
    validate: {
      validator: function(arr) {
        return arr.length > 0 && arr.every(t => t.trim().length > 0);
      },
      message: "Technologies must be a non-empty array of non-empty strings"
    }
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Web App", "Mobile App", "API", "Library", "UI/UX", "DevOps", "Other"]
  },
  githubUrl: {
    type: String,
    trim: true,
    default: ""
  },
  liveUrl: {
    type: String,
    trim: true,
    default: ""
  },
  imageUrl: {
    type: String,
    default: null
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: ["Completed", "In Progress", "Planned", "On Hold"],
    default: "Planned"
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes
// user: 1                          — Filter projects by user
// status: 1                        — Filter by status
// category: 1                      — Filter by category
// createdAt: -1                    — Sort by newest
// { title: "text", description: "text" }  — Full-text search
// Compound: { user: 1, createdAt: -1 }    — User's projects sorted by date
```

---

## 🌐 Deployment

### Frontend — Vercel

#### Option A: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# For production
vercel --prod
```

#### Option B: Via Vercel Dashboard (GitHub Integration)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"New Project"** → **"Import Git Repository"**
4. Select your repository
5. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add environment variables:
   ```
   VITE_API_BASE_URL=https://your-backend.onrender.com/api
   VITE_APP_NAME=Portfolio Manager
   VITE_APP_VERSION=1.0.0
   ```
7. Click **"Deploy"**

#### Vercel Configuration (`frontend/vercel.json`)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Backend — Render

#### Option A: Via Render Dashboard

1. Go to [render.com](https://render.com) and sign in
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
   - **Region:** Closest to your users
5. Add environment variables (see [Environment Configuration](#-environment-configuration)):
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_db
   JWT_SECRET=your_production_jwt_secret_minimum_32_characters
   JWT_EXPIRE=7d
   CLIENT_URL=https://your-frontend.vercel.app
   UPLOAD_DIR=./uploads
   MAX_FILE_SIZE=5242880
   ALLOWED_IMAGE_TYPES=image/jpeg,image/png,image/webp,image/gif
   COOKIE_HTTP_ONLY=true
   COOKIE_SECURE=true
   COOKIE_SAME_SITE=None
   COOKIE_MAX_AGE=604800000
   ```
   > ⚠️ **Note:** For production deployment, you must use **MongoDB Atlas** (cloud) instead of local MongoDB. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas), get the connection URI, and set it as `MONGODB_URI`.

6. Click **"Create Web Service"**

#### Option B: Via Render CLI

```bash
# Install Render CLI
npm install -g @render/cli

# Login
render login

# Create and deploy
cd backend
render deploy --env production
```

#### Important Render Notes

- **Free tier** services spin down after 15 minutes of inactivity (cold starts ~30-50 seconds)
- **File uploads** on Render's free tier are **ephemeral** — files are lost on redeploy. Use Cloudinary or AWS S3 for persistent file storage in production.
- Set `COOKIE_SECURE=true` and `COOKIE_SAME_SITE=None` when using HTTPS
- Update `CLIENT_URL` to your Vercel URL for CORS to work correctly

---

### Production File Upload Recommendation

For production, replace local Multer storage with **Cloudinary**:

```bash
npm install cloudinary multer-storage-cloudinary
```

```javascript
// backend/config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

Add to backend `.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ⚡ Performance Optimizations

### Frontend
- **Code Splitting:** `React.lazy()` + `Suspense` for route-level splitting
- **Lazy Loading:** Images loaded with `loading="lazy"` attribute
- **Debounced Search:** 300ms debounce on search input to reduce API calls
- **Memoization:** `React.memo`, `useMemo`, `useCallback` where appropriate
- **Virtual Scrolling:** Consider for large project lists (50+ items)
- **Image Optimization:** Compressed uploads, WebP format support, responsive images
- **Bundle Analysis:** `vite-plugin-visualizer` for bundle size monitoring
- **Tree Shaking:** Vite handles this automatically for ESM imports
- **Prefetching:** Link prefetching for likely next navigation targets

### Backend
- **MongoDB Indexes:** Compound indexes on frequently queried fields
- **Lean Queries:** `.lean()` on Mongoose queries to return plain JS objects
- **Select Fields:** `.select()` to exclude unnecessary fields from responses
- **Pagination:** Server-side cursor or skip-based pagination (never load all records)
- **Compression:** `compression` middleware for gzip responses
- **Rate Limiting:** `express-rate-limit` to prevent abuse
- **Connection Pooling:** Mongoose default connection pool (5 connections)

### Database
```javascript
// Example indexes in Project model
projectSchema.index({ user: 1, createdAt: -1 });           // User's projects by date
projectSchema.index({ status: 1 });                         // Filter by status
projectSchema.index({ category: 1 });                       // Filter by category
projectSchema.index({ title: "text", description: "text" }); // Full-text search
```

---

## 🔒 Security Practices

| Practice | Implementation |
|---|---|
| **Password Hashing** | bcryptjs with salt rounds of 12 |
| **JWT Authentication** | HTTP-only cookies, secure flag in production |
| **Input Validation** | express-validator on all endpoints |
| **XSS Prevention** | DOMPurify on frontend, proper escaping |
| **CSRF Protection** | SameSite cookie attribute |
| **Security Headers** | Helmet.js (CSP, X-Frame-Options, etc.) |
| **CORS** | Restricted to allowed origins only |
| **File Upload Security** | Type validation, size limits, sanitized filenames |
| **No Sensitive Data in Responses** | Password excluded with `select: false` |
| **Rate Limiting** | express-rate-limit on auth routes |
| **Environment Variables** | All secrets in `.env` (gitignored) |
| **Error Messages** | Generic errors in production, no stack traces leaked |
| **MongoDB Injection Prevention** | Mongoose ODM parameterizes queries |
| **Dependency Auditing** | `npm audit` in CI/CD pipeline |

### Example: Rate Limiting Configuration
```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,    // 15 minutes
  max: 10,                      // 10 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  }
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration with valid data
- [ ] Registration with duplicate email (should fail)
- [ ] Registration with weak password (should fail)
- [ ] User login with correct credentials
- [ ] Login with incorrect password (should fail)
- [ ] Accessing protected route without token (should redirect to login)
- [ ] Creating a project with all fields
- [ ] Creating a project without required fields (should fail)
- [ ] Uploading project image (valid and invalid types)
- [ ] Editing an existing project
- [ ] Deleting a project with confirmation
- [ ] Searching projects by text
- [ ] Filtering by category and status
- [ ] Sorting projects
- [ ] Paginating through projects
- [ ] Updating profile information
- [ ] Uploading profile picture
- [ ] Changing password (correct and incorrect current password)
- [ ] Logout functionality
- [ ] Responsive design on mobile, tablet, desktop
- [ ] All animations render smoothly
- [ ] Toast notifications appear and dismiss correctly
- [ ] Skeleton loaders show during data fetching

### API Testing with Postman

Import the provided Postman collection (`postman_collection.json` if included) or manually create requests based on the [API Documentation](#-api-documentation) section.

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|---|---|---|
| `MongoNetworkError: connect ECONNREFUSED` | MongoDB not running | Start MongoDB: `brew services start mongodb-community` or `sudo systemctl start mongod` |
| `MongooseError: Can't reach database` | Wrong connection URI | Verify `MONGODB_URI` in backend `.env` |
| `JWT malformed` or `jwt malformed` | Invalid/expired token | Clear cookies and log in again |
| `CORS error` in browser | Frontend URL not in allowed origins | Set `CLIENT_URL` correctly in backend `.env` |
| `404 on image` | Upload directory doesn't exist or path mismatch | Create `uploads/projects/` and `uploads/profiles/` directories |
| `EACCES: permission denied` on uploads | Insufficient directory permissions | `chmod 755 uploads/` |
| Blank page on Vercel | Missing `vercel.json` rewrite rules | Add SPA rewrite config (see Deployment section) |
| Cold start delay on Render | Free tier spin-down | Upgrade to paid tier or use a keep-alive service |
| `Module not found` errors | Dependencies not installed | Run `npm install` in both `backend/` and `frontend/` |
| Port 5000 already in use | Another process using the port | Kill process: `lsof -ti:5000 \| xargs kill -9` or change PORT in `.env` |
| Tailwind classes not working | Tailwind not configured properly | Ensure `tailwind.config.js` content paths include all source files |

### Resetting the Database

```bash
# Connect to MongoDB shell
mongosh

# Switch to the database
use portfolio_db

# Drop all collections
db.users.drop()
db.projects.drop()

# Verify
show collections

# Exit
exit
```

### Clearing Everything and Starting Fresh

```bash
# Delete node_modules and reinstall
cd backend && rm -rf node_modules package-lock.json && npm install
cd ../frontend && rm -rf node_modules package-lock.json && npm install

# Reset database (see above)

# Clear browser cookies and localStorage
# Or use incognito/private window for testing
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create a **feature branch**: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature description"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request** with a clear description

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add dark mode toggle
fix: resolve pagination offset bug
docs: update API documentation
style: format code with prettier
refactor: restructure project API service
perf: add memoization to project list
test: add unit tests for auth controller
chore: update dependencies
```

### Code Style

- **Frontend:** ESLint + Prettier (config included)
- **Backend:** ESLint with Node.js rules
- Run `npm run lint` in both directories before committing

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Portfolio Management System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Portfolio: [your-portfolio.vercel.app](https://your-portfolio.vercel.app)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- Email: [your-email@example.com](mailto:your-email@example.com)

---

## 📊 Project Stats

![Stars](https://img.shields.io/github/stars/your-username/portfolio-management-system?style=social)
![Forks](https://img.shields.io/github/forks/your-username/portfolio-management-system?style=social)
![License](https://img.shields.io/github/license/your-username/portfolio-management-system)
![Node](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

## 🗺 Roadmap

- [ ] **Dark Mode** toggle with system preference detection
- [ ] **Tags System** for more granular project categorization
- [ ] **Markdown Support** for project descriptions
- [ ] **Drag-and-Drop** project reordering
- [ ] **Export** projects as PDF/JSON
- [ ] **Public Portfolio Page** (shareable link)
- [ ] **Team Collaboration** (multiple users per portfolio)
- [ ] **Comments/Notes** on projects
- [ ] **Activity Log** (audit trail of changes)
- [ ] **Analytics** (views, clicks on demo/GitHub links)
- [ ] **PWA Support** (installable, offline capability)
- [ ] **i18n** (internationalization support)
- [ ] **Unit & Integration Tests** (Jest + React Testing Library + Supertest)
- [ ] **CI/CD Pipeline** (GitHub Actions)
- [ ] **Docker Compose** for one-command local setup
- [ ] **Storybook** for component documentation

---

<div align="center">

**Built with ❤️ using the MERN Stack**

⭐ If you found this project helpful, please give it a star on GitHub!

</div>