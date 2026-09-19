# Job Tracker

A two-sided job platform where job seekers can browse and apply to jobs, and companies can post openings and manage applicants. Built with React, Node.js, Express, and MongoDB.

**Live App:** [job-tracker-hireflow.vercel.app](https://job-tracker-hireflow.vercel.app)

> ⚠️ The backend runs on Render's free tier — the first request after inactivity may take 30–50 seconds while the server wakes up. Please be patient on first load.

---

## Demo

<!-- Add your demo video/GIF here once recorded -->
<!-- Example: ![Demo](./demo.gif) or a link to a YouTube/Loom video -->

## Features

**For Job Seekers**
- Browse all job listings with skills, salary, and location
- One-click apply
- Personal dashboard with live stats (total / shortlisted / hired / rejected)
- Visual Job Hunt Board — a 4-column status tracker for applications
- Profile page with resume upload (PDF, via Cloudinary)

**For Companies**
- Post new job openings with required skills
- Company dashboard to manage postings
- View and manage applicants per job
- Shortlist, hire, or reject applicants with confirmation dialogs

**General**
- Role-based authentication (Job Seeker / Company) with JWT
- Protected routes
- Logout confirmation across all pages

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas + Mongoose |
| Auth | JSON Web Tokens (JWT) |
| File Storage | Cloudinary |
| Hosting | Vercel (frontend), Render (backend) |

## Project Structure

```
job-tracker/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/      # Route logic (auth, jobs, applications)
│   ├── middleware/        # JWT auth middleware
│   ├── models/            # Mongoose schemas (User, Job, Application)
│   ├── routes/            # Express route definitions
│   └── server.js          # App entry point
│
└── frontend/
    ├── src/
    │   ├── context/         # Global auth state (AuthContext)
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx          # Job seeker dashboard
    │   │   ├── Jobs.jsx               # Browse & apply
    │   │   ├── JobHuntBoard.jsx       # Visual status board
    │   │   ├── CompanyDashboard.jsx   # Post jobs, view postings
    │   │   ├── Applicants.jsx         # Manage applicants
    │   │   └── Profile.jsx            # Resume upload
    │   ├── api.js            # Axios instance with JWT interceptor
    │   └── App.jsx            # Route definitions
    └── vite.config.js
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user (jobseeker or company) |
| POST | `/api/auth/login` | Log in and receive a JWT |

### Jobs
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/jobs` | Get all job listings | Public |
| POST | `/api/jobs` | Create a new job posting | Company |
| GET | `/api/jobs/:id` | Get a single job by ID | Public |
| DELETE | `/api/jobs/:id` | Delete a job posting | Company |

### Applications
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/applications/:jobId/apply` | Apply to a job | Job Seeker |
| GET | `/api/applications/my` | Get the current user's applications | Job Seeker |
| GET | `/api/applications/:jobId/applicants` | Get applicants for a job | Company |
| PUT | `/api/applications/:id/status` | Update an application's status | Company |

## Getting Started Locally

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas connection string
- A Cloudinary account (for resume uploads)

### 1. Clone the repository

```bash
git clone https://github.com/MushfidaFerdousMaisha/job-tracker.git
cd job-tracker
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run it:

```bash
npm run dev
```

The backend will start on `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run it:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Author

**Mushfida Ferdous Maisha**
[GitHub](https://github.com/MushfidaFerdousMaisha)
