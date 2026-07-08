# 🚀 PortfolioHub — Full Stack MERN Application

<div align="center">

![License](https://img.shields.io/github/license/your-username/portfolio-management-system?style=flat-square)
![Node](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Backend_on-Render-46E3B7?style=flat-square&logo=render)

**A production-grade, enterprise-level Portfolio Management Dashboard built with the MERN stack. Featuring JWT authentication, advanced CRUD operations, interactive analytics, file uploads, and a premium light-themed SaaS UI powered by Framer Motion.**

[Overview](#-overview) • [Tech Stack](#-tech-stack) • [Features](#-features) • [Setup](#-local-setup--installation) • [API Docs](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Prerequisites](#-prerequisites)
- [Local Setup & Installation](#-local-setup--installation)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Security Implementations](#-security-implementations)
- [Performance Optimizations](#-performance-optimizations)
- [Deployment Guide](#-deployment-guide)
- [Troubleshooting & FAQs](#-troubleshooting--faqs)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The Portfolio Management System is more than just a CRUD application; it is a comprehensive full-stack template engineered to demonstrate industry-standard practices. It provides a polished corporate interface for developers, freelancers, and agencies to manage their portfolio projects, track statuses, and visualize project distributions through interactive charts.

The backend is built on a robust Express.js architecture utilizing middleware pipelines for authentication, validation, rate-limiting, and centralized error handling. The frontend leverages React 18 with Vite for lightning-fast HMR and optimized production builds, combined with Framer Motion for a fluid, premium user experience.

---

## 🏗 System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                            CLIENT (React + Vite)                        │
│                                                                         │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │ Auth Pages │  │  Dashboard  │  │ Project CRUD │  │    Profile    │   │
│  └─────┬──────┘  └──────┬──────┘  └──────┬───────┘  └──────┬────────┘   │
│        │                │                │                  │           │
│  ┌─────▼────────────────▼────────────────▼──────────────────▼────────┐  │
│  │                   Shared Component Library                        │  │
│  │  (Layouts, Sidebar, Modals, Tables, Skeletons, Charts, Toasts)    │  │
│  └────────────────────────────┬──────────────────────────────────────┘  │
│  ┌────────────────────────────▼──────────────────────────────────────┐  │
│  │               Axios Instance (Interceptors)                       │  │
│  │  • Attaches Bearer JWT from localStorage                          │  │
│  │  • Handles 401 (Auto-Logout), 429 (Rate Limit), 500 globally      │  │
│  └────────────────────────────┬──────────────────────────────────────┘  │
└───────────────────────────────┼─────────────────────────────────────────┘
                                │ HTTPS / REST
┌───────────────────────────────▼─────────────────────────────────────────┐
│                          SERVER (Express + Node)                        │
│                                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐                │
│  │  Auth Routes  │  │Project Routes │  │Profile Routes │                │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘                │
│          │                  │                  │                        │
│  ┌───────▼──────────────────▼──────────────────▼───────────────────┐    │
│  │                     Middleware Pipeline                         │    │
│  │  1. CORS (Whitelisted Origins)                                  │    │
│  │  2. Helmet (Security Headers)                                   │    │
│  │  3. Morgan (HTTP Logging)                                       │    │
│  │  4. Express JSON Parser (10mb limit)                            │    │
│  │  5. API Rate Limiter (Global)                                   │    │
│  │  6. Auth Route Rate Limiter (Strict: 100/15min in dev)          │    │
│  │  7. `protect` Middleware (JWT Verify via Cookie OR Header)      │    │
│  │  8. express-validator (Input Sanitization)                      │    │
│  └──────────────────────────┬──────────────────────────────────────┘    │
│  ┌──────────────────────────▼──────────────────────────────────────┐    │
│  │                   Mongoose ODM Layer                            │    │
│  │  • User Model (bcrypt hashing, JWT generation)                  │    │
│  │  • Project Model (Virtuals, Indexes, Text Search)               │    │
│  └──────────────────────────┬──────────────────────────────────────┘    │
└─────────────────────────────┼───────────────────────────────────────────┘
                              │ Mongoose Driver
┌─────────────────────────────▼───────────────────────────────────────────┐
│                     MONGODB (Local via Compass)                         │
│                                                                         │
│  ┌─────────────────────────┐       ┌─────────────────────────────────┐  │
│  │ `users` collection      │       │ `projects` collection            │ │
│  │ • email (unique idx)    │       │ • user + createdAt (compound)    │ │
│  │ • password (hashed)     │       │ • category (idx)                 │ │
│  │ • profilePicture        │       │ • status (idx)                   │ │
│  └─────────────────────────┘       │ • title/description (text idx)   │ │
│                                     └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2+ | UI Component Library |
| **Vite** | 5.0+ | Next-gen frontend build tool |
| **React Router DOM** | 6.20+ | Client-side routing & protected routes |
| **Framer Motion** | 10.0+ | Declarative animations & transitions |
| **Tailwind CSS** | 3.4+ | Utility-first CSS framework |
| **Recharts** | 2.10+ | Composable charting library |
| **Axios** | 1.6+ | HTTP client with interceptors |
| **React Hot Toast** | 2.4+ | Elegant toast notifications |
| **React Icons** | 4.12+ | Popular icon sets (Feather, Heroicons) |
| **React Dropzone** | 14.2+ | Drag-and-drop file uploads |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 20 LTS | JavaScript runtime |
| **Express.js** | 4.18+ | Fast, unopinionated web framework |
| **MongoDB** | 7.0+ | Document-oriented NoSQL database |
| **Mongoose** | 8.0+ | Elegant MongoDB object modeling |
| **JSON Web Token (JWT)** | 9.0+ | Stateful authentication tokens |
| **bcryptjs** | 2.4+ | Password hashing (pure JS, no native deps) |
| **Multer** | 1.4+ | Multipart/form-data handling for uploads |
| **express-validator** | 7.0+ | Request validation & sanitization |
| **express-rate-limit** | 7.1+ | Brute-force protection |
| **Helmet** | 7.1+ | Secure HTTP headers |
| **CORS** | 2.8+ | Cross-Origin Resource Sharing |
| **Morgan** | 1.10+ | HTTP request logger |

---

## ✨ Key Features

### 🔐 Authentication & Security
- **Dual-Strategy JWT:** Supports both HTTP-only cookies (most secure) and Bearer tokens (fallback).
- **Password Security:** bcryptjs hashing with 12 salt rounds.
- **Rate Limiting:** Strict limits on auth routes (100/15m in dev, 10/15m in prod), general API limits, and ultra-strict limits on password changes.
- **Protected Routes:** Frontend route guards and backend middleware blocking unauthorized access.

### 📊 Analytics Dashboard
- **Stat Cards:** Total projects, completed count, in-progress count, and total categories with animated counters.
- **Charts:** Pie/Bar charts showing project distribution by category and current status breakdown.
- **Recent Activity:** Feed of the 5 most recently added/updated projects.

### 📁 Advanced Project Management
- **Full CRUD:** Create, read, update, and delete with smooth UI transitions.
- **Rich Data Models:** Title, long description, technology tags, categories, GitHub/Live links, image uploads, and status tracking (Completed, In Progress, Planned, On Hold).
- **Server-Side Pagination:** Configurable page sizes preventing massive payload transfers.
- **Dynamic Filtering & Sorting:** Filter by category/status, sort by date/title/status.
- **Full-Text Search:** MongoDB text indexes for instant searching across titles and descriptions.

### 🎨 UI/UX & Animations
- **Premium Light Theme:** White background, blue (#2563EB) primary palette, soft shadows, and rounded corners.
- **Framer Motion:** Page transitions (`AnimatePresence`), staggered list animations, hover/tap scaling on buttons, and smooth modal entrances.
- **Skeleton Loaders:** Custom shimmer effects matching card/table layouts during data fetching.
- **Empty States:** Illustrated empty states when no projects match filters.
- **Responsive Design:** Collapsible sidebar for desktop, hidden sidebar with top-hamburger for tablets, and full mobile layouts.

### 🔔 UX Polish
- **Centralized Error Handling:** Axios interceptors catch 400, 401, 403, 404, 413, 429, and 500 errors globally.
- **429 Rate Limit Handling:** Login page detects 429s, disables the form, and shows a live MM:SS countdown timer.
- **Form Validation:** Real-time inline errors clearing on user input, combined with server-side validation error mapping.

---

## ✅ Prerequisites

Before starting, ensure you have the following installed and running:

1. **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
2. **MongoDB Community Server** (v7.0+) - [Download](https://www.mongodb.com/try/download/community)
   * *Must be running locally on the default port `27017`.*
3. **MongoDB Compass** (Latest) - [Download](https://www.mongodb.com/products/tools/compass)
   * *Use this to visually verify your local database.*
4. **Git** - [Download](https://git-scm.com/)

---

## 🚀 Local Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/portfolio-management-system.git
cd portfolio-management-system
```

### 2. Start Local MongoDB
Open a terminal and start the MongoDB service:
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Linux (Ubuntu/Debian)
sudo systemctl start mongod

# Windows (Run as Administrator)
net start MongoDB
```
*Open MongoDB Compass and connect to `mongodb://localhost:27017` to verify it's running.*

### 3. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory (see [Environment Variables](#-environment-variables)).

### 4. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend/` directory.

### 5. Create Upload Directories
```bash
cd backend
mkdir -p uploads/projects uploads/profiles
```

### 6. Run the Application
You need **two active terminals**:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# ✅ Server running on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# ✅ Vite running on http://localhost:5173
```

Navigate to `http://localhost:5173` in your browser. Register a new account and start building your portfolio!

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
# Server
NODE_ENV=development
PORT=5000

# Database (Local MongoDB)
MONGODB_URI=mongodb://localhost:27017/portfolio_db

# JWT
JWT_SECRET=change_this_to_a_random_32_character_string
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:5173

# Cookies
COOKIE_HTTP_ONLY=true
COOKIE_SECURE=false        # Must be 'true' in production (HTTPS)
COOKIE_SAME_SITE=Lax       # Must be 'None' in production (Cross-site)
COOKIE_MAX_AGE=604800000   # 7 days in ms

# Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880      # 5MB
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Portfolio Manager
```

---

## 📁 Project Structure

```text
portfolio-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js                    # Mongoose connection logic
│   ├── controllers/
│   │   ├── authController.js         # register, login, logout, getMe
│   │   ├── projectController.js      # CRUD, stats, search/filter
│   │   └── profileController.js      # updateProfile, changePassword
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification (Cookie + Bearer)
│   │   ├── errorHandler.js           # Centralized error formatting
│   │   └── rateLimiter.js            # Rate limit configurations
│   ├── models/
│   │   ├── User.js                   # Schema, bcrypt pre-save, JWT signing
│   │   └── Project.js                # Schema, indexes, text search
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── profileRoutes.js
│   │   └── uploadRoutes.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── projectValidator.js
│   │   └── profileValidator.js
│   ├── uploads/                      # Gitignored - stores local images
│   │   ├── projects/
│   │   └── profiles/
│   ├── .env
│   ├── package.json
│   └── server.js                     # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js              # Axios instance & interceptors
│   │   │   ├── authApi.js
│   │   │   ├── projectApi.js
│   │   │   └── profileApi.js
│   │   ├── components/
│   │   │   ├── common/               # Button, Input, Modal, Skeleton, etc.
│   │   │   ├── layout/               # MainLayout, Sidebar, TopNav
│   │   │   ├── dashboard/            # StatsCard, Charts, RecentList
│   │   │   └── projects/             # ProjectTable, ProjectForm, Filters
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Global auth state & providers
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useDebounce.js        # Delays search API calls
│   │   │   └── useProjects.js        # Fetches & manages project state
│   │   ├── pages/
│   │   │   ├── auth/                 # LoginPage, RegisterPage
│   │   │   ├── dashboard/            # DashboardPage
│   │   │   ├── projects/             # List, Create, Edit, Detail pages
│   │   │   └── profile/              # ProfilePage
│   │   ├── routes/
│   │   │   ├── AppRouter.jsx         # Lazy-loaded routes
│   │   │   └── ProtectedRoute.jsx
│   │   ├── utils/
│   │   │   ├── constants.js          # Categories, Statuses enums
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                 # Tailwind directives
│   ├── .env
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🗄 Database Schema

### User Model
```javascript
{
  name:        { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
  email:       { type: String, required: true, unique: true, lowercase: true, match: [/email-regex/] },
  password:    { type: String, required: true, minlength: 8, select: false }, // Hidden by default
  bio:         { type: String, maxlength: 500, default: "" },
  phone:       { type: String, default: "" },
  website:     { type: String, default: "" },
  location:    { type: String, default: "" },
  profilePicture: { type: String, default: null },
  createdAt:   { type: Date, default: Date.now }
}
// Index: email (Unique)
```

### Project Model
```javascript
{
  title:       { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
  description: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
  technologies:{ type: [String], required: true, validate: [arrayNotEmpty] },
  category:    { type: String, enum: ["Web App", "Mobile App", "API", "Library", "UI/UX", "DevOps", "Other"] },
  githubUrl:   { type: String, default: "" },
  liveUrl:     { type: String, default: "" },
  imageUrl:    { type: String, default: null },
  status:      { type: String, enum: ["Completed", "In Progress", "Planned", "On Hold"], default: "Planned" },
  user:        { type: ObjectId, ref: "User", required: true }, // Creator
  createdAt:   { type: Date, default: Date.now }
}
// Indexes:
// - { user: 1, createdAt: -1 } (Compound: Fetch user projects sorted by date)
// - { category: 1 } (Filter)
// - { status: 1 } (Filter)
// - { title: "text", description: "text" } (Full-text search)
```

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Register new user |
| `POST` | `/auth/login` | Public | Login (sets cookie & returns token) |
| `POST` | `/auth/logout` | Public | Clear auth cookie |
| `GET` | `/auth/me` | Protected | Get current user profile |

<details>
<summary><b>View Auth Payloads</b></summary>

**POST /auth/register**
```json
// Request
{ "name": "John Doe", "email": "john@example.com", "password": "password123", "confirmPassword": "password123" }

// Response 201
{ "success": true, "data": { "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" } } }
```

**POST /auth/login**
```json
// Request
{ "email": "john@example.com", "password": "password123" }

// Response 200 (Sets HTTP-only cookie + returns token for localStorage)
{ "success": true, "data": { "token": "eyJhbG...", "user": { "_id": "...", "name": "John Doe" } } }
```
</details>

### Projects
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects` | Protected | List projects (supports query params) |
| `GET` | `/projects/stats` | Protected | Get dashboard statistics |
| `GET` | `/projects/:id` | Protected | Get single project |
| `POST` | `/projects` | Protected | Create project (`multipart/form-data`) |
| `PUT` | `/projects/:id` | Protected | Update project |
| `DELETE` | `/projects/:id` | Protected | Delete project |

<details>
<summary><b>View Project Query Params & Payloads</b></summary>

**GET /projects?query=params**
`page`, `limit`, `search`, `category`, `status`, `sortBy`, `sortOrder`

**POST /projects**
```json
// Request (multipart/form-data)
"title": "My App",
"description": "A long description...",
"technologies": ["React", "Node"],
"category": "Web App",
"status": "Completed",
"githubUrl": "https://github.com/...",
"liveUrl": "https://...",
"image": [FILE]
```
</details>

### Profile
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/profile` | Protected | Get profile |
| `PUT` | `/profile` | Protected | Update name, bio, links |
| `PUT` | `/profile/password` | Protected | Change password (requires current pass) |
| `POST` | `/profile/picture` | Protected | Upload profile pic (`multipart/form-data`) |

---

## 🔒 Security Implementations

This application implements defense-in-depth strategies:

1. **Password Hashing:** `bcryptjs` with a salt round of 12 prior to database storage.
2. **Dual JWT Strategy:** Tokens are stored in HTTP-only cookies to prevent XSS attacks, but the backend `protect` middleware also checks the `Authorization: Bearer <token>` header as a fallback, allowing the frontend to use `localStorage` if needed for SPA architectures.
3. **Rate Limiting:** 
   - General API: 1000 req/min (dev) / 100 req/min (prod)
   - Auth Routes: 100 req/15min (dev) / 10 req/15min (prod)
   - Password Change: 50 req/hour (dev) / 3 req/hour (prod)
4. **Security Headers:** `Helmet` sets `X-Frame-Options`, `X-XSS-Protection`, and strict Content Security Policies.
5. **CORS Whitelisting:** Only `CLIENT_URL` is allowed to make cross-origin requests.
6. **No Password Leaks:** Mongoose schema uses `select: false` on the password field. It is only included in queries explicitly when verifying credentials.
7. **Input Sanitization:** `express-validator` strips malicious tags and enforces length/format constraints.

---

## ⚡ Performance Optimizations

- **Frontend Code Splitting:** `React.lazy()` and `<Suspense>` wrap all page-level components, ensuring users only download the JS for the route they are viewing.
- **Debounced Search:** The search input uses a custom `useDebounce` hook (300ms) to prevent firing expensive MongoDB text searches on every keystroke.
- **Database Indexing:** Compound and text indexes prevent `COLLSCAN` operations, keeping query times under 5ms for thousands of records.
- **Mongoose `.lean()`:** Used on read-heavy endpoints (like project lists) to return plain JavaScript objects instead of full Mongoose Documents, reducing CPU overhead and memory usage.
- **Axios Cancellation:** (Recommended to implement) Abort controllers can be attached to Axios requests to cancel pending API calls if a user navigates away from a page before it finishes loading.

---

## 🌐 Deployment Guide

### Frontend Deployment (Vercel)
1. Push code to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) -> **Add New Project**.
3. Import repository. Set **Root Directory** to `frontend`.
4. Add Environment Variable:
   * `VITE_API_BASE_URL` = `https://your-backend-name.onrender.com/api`
5. Deploy.

### Backend Deployment (Render)
1. Go to [Render Dashboard](https://dashboard.render.com) -> **New Web Service**.
2. Connect GitHub repo. Set **Root Directory** to `backend`.
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add Environment Variables:
   * `NODE_ENV` = `production`
   * `MONGODB_URI` = *(Your MongoDB Atlas connection string - local DB won't work here)*
   * `CLIENT_URL` = `https://your-vercel-app.vercel.app`
   * `COOKIE_SECURE` = `true` *(Required for HTTPS)*
   * `COOKIE_SAME_SITE` = `None` *(Required for cross-site cookies)*
   * Update `JWT_SECRET` to a new, strong production key.
6. Deploy.

> ⚠️ **Production File Upload Warning:** Render's filesystem is **ephemeral**. If you use `multer` to save to `./uploads`, files will be deleted every time the server restarts or redeploys. For production, you **must** swap `multer` disk storage for **Cloudinary** or **AWS S3**.

---

## 🐛 Troubleshooting & FAQs

<details>
<summary><b>1. Getting `ECONNREFUSED` when starting backend</b></summary>

**Cause:** MongoDB is not running locally.
**Fix:** Start MongoDB via `brew services start mongodb-community` (Mac) or `sudo systemctl start mongod` (Linux). Verify in MongoDB Compass.
</details>

<details>
<summary><b>2. Getting `429 Too Many Requests` on Login</b></summary>

**Cause:** You hit the rate limiter during testing.
**Fix 1:** Simply restart the backend server (`Ctrl+C` then `npm run dev`). The in-memory rate limit counter resets.
**Fix 2:** The frontend Login page automatically detects 429s, disables the form, and shows a 15-minute countdown timer.
</details>

<details>
<summary><b>3. Getting `401 Unauthorized` on protected routes</b></summary>

**Cause:** Mismatch between frontend token sending and backend token reading.
**Fix:** Ensure your Axios interceptor is setting `config.headers.Authorization = Bearer <token>` from `localStorage`, AND your backend `authMiddleware.js` checks `req.headers.authorization` if `req.cookies.token` is missing.
</details>

<details>
<summary><b>4. CORS errors in the browser console</b></summary>

**Cause:** Backend `CLIENT_URL` doesn't match your frontend URL, or `credentials: true` is missing.
**Fix:** Ensure `CLIENT_URL` in `backend/.env` is exactly `http://localhost:5173` (no trailing slash). Ensure Axios has `withCredentials: true`.
</details>

<details>
<summary><b>5. Uploaded images return 404</b></summary>

**Cause:** The `uploads/` directory doesn't exist, or Express isn't serving it statically.
**Fix:** Run `mkdir -p uploads/projects uploads/profiles` in the backend folder. Ensure `app.use('/uploads', express.static(path.join(__dirname, 'uploads')))` is in `server.js`.
</details>

---

## 🗺 Roadmap

- [ ] **Dark Mode Toggle** (System preference detection)
- [ ] **Cloudinary Integration** (Production-ready image hosting)
- [ ] **Markdown Support** (For project descriptions)
- [ ] **Drag & Drop Reordering** (For portfolio display sequence)
- [ ] **Public Portfolio View** (Shareable read-only URL for recruiters)
- [ ] **Jest & Cypress Testing** (Unit, integration, and e2e tests)
- [ ] **Docker Compose Setup** (One-command local environment setup)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
Made with ❤️ by <strong>Afaqahmad</strong>
</div>
